import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase clients
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper to verify auth token
async function verifyAuth(authHeader: string | null) {
  if (!authHeader) {
    return { authorized: false, userId: null };
  }
  
  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return { authorized: false, userId: null };
  }
  
  return { authorized: true, userId: user.id };
}

// ============================================
// Health Check
// ============================================
app.get("/make-server-59b4d089/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============================================
// Authentication Routes
// ============================================

// Sign up (create new admin user)
app.post("/make-server-59b4d089/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ success: false, message: 'Email and password are required' }, 400);
    }

    // Create user with admin client
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ success: false, message: error.message }, 400);
    }

    // Store admin user data in kv_store
    await kv.set(`admin_user:${data.user.id}`, {
      id: data.user.id,
      email: data.user.email,
      name: name || '',
      role: 'admin',
      created_at: new Date().toISOString(),
    });

    return c.json({ 
      success: true, 
      data: { 
        user: data.user,
        message: 'Account created successfully. You can now sign in.' 
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ success: false, message: 'Failed to create account' }, 500);
  }
});

// Sign in
app.post("/make-server-59b4d089/auth/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ success: false, message: 'Email and password are required' }, 400);
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      return c.json({ success: false, message: error.message }, 401);
    }

    // Update last login
    await kv.set(`admin_user:${data.user.id}`, {
      ...(await kv.get(`admin_user:${data.user.id}`) || {}),
      last_login: new Date().toISOString(),
    });

    return c.json({ 
      success: true, 
      data: {
        session: data.session,
        user: data.user
      }
    });
  } catch (error) {
    console.error('Sign in error:', error);
    return c.json({ success: false, message: 'Failed to sign in' }, 500);
  }
});

// Verify session
app.get("/make-server-59b4d089/auth/session", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const { authorized, userId } = await verifyAuth(authHeader);

    if (!authorized) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`admin_user:${userId}`);

    return c.json({ 
      success: true, 
      data: { 
        userId,
        user: userData 
      }
    });
  } catch (error) {
    console.error('Session verification error:', error);
    return c.json({ success: false, message: 'Failed to verify session' }, 500);
  }
});

// Sign out
app.post("/make-server-59b4d089/auth/signout", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, message: 'No auth token provided' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Sign out error:', error);
      return c.json({ success: false, message: error.message }, 400);
    }

    return c.json({ success: true, message: 'Signed out successfully' });
  } catch (error) {
    console.error('Sign out error:', error);
    return c.json({ success: false, message: 'Failed to sign out' }, 500);
  }
});

// ============================================
// Properties / Projects Routes
// ============================================

// Get all properties (public - published only)
app.get("/make-server-59b4d089/properties", async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    
    const properties = await kv.getByPrefix('property:');
    const published = properties.filter((p: any) => p.published);
    
    // Sort by created_at descending
    const sorted = published.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    // Paginate
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = sorted.slice(start, end);
    
    return c.json({
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total: published.length,
        totalPages: Math.ceil(published.length / limit),
      }
    });
  } catch (error) {
    console.error('Get properties error:', error);
    return c.json({ success: false, message: 'Failed to fetch properties' }, 500);
  }
});

// Get all properties (admin - all properties)
app.get("/make-server-59b4d089/admin/properties", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const { authorized } = await verifyAuth(authHeader);

    if (!authorized) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    
    const properties = await kv.getByPrefix('property:');
    
    // Sort by created_at descending
    const sorted = properties.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    // Paginate
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = sorted.slice(start, end);
    
    return c.json({
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total: properties.length,
        totalPages: Math.ceil(properties.length / limit),
      }
    });
  } catch (error) {
    console.error('Get admin properties error:', error);
    return c.json({ success: false, message: 'Failed to fetch properties' }, 500);
  }
});

// Get single property
app.get("/make-server-59b4d089/properties/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const property = await kv.get(`property:${id}`);
    
    if (!property) {
      return c.json({ success: false, message: 'Property not found' }, 404);
    }
    
    return c.json({ success: true, data: property });
  } catch (error) {
    console.error('Get property error:', error);
    return c.json({ success: false, message: 'Failed to fetch property' }, 500);
  }
});

// Create property (admin only)
app.post("/make-server-59b4d089/admin/properties", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const { authorized, userId } = await verifyAuth(authHeader);

    if (!authorized) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const property = await c.req.json();
    const id = crypto.randomUUID();
    
    const newProperty = {
      id,
      ...property,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: userId,
    };
    
    await kv.set(`property:${id}`, newProperty);
    
    return c.json({ success: true, data: newProperty }, 201);
  } catch (error) {
    console.error('Create property error:', error);
    return c.json({ success: false, message: 'Failed to create property' }, 500);
  }
});

// Update property (admin only)
app.put("/make-server-59b4d089/admin/properties/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const { authorized } = await verifyAuth(authHeader);

    if (!authorized) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const existing = await kv.get(`property:${id}`);
    if (!existing) {
      return c.json({ success: false, message: 'Property not found' }, 404);
    }
    
    const updated = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    
    await kv.set(`property:${id}`, updated);
    
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update property error:', error);
    return c.json({ success: false, message: 'Failed to update property' }, 500);
  }
});

// Delete property (admin only)
app.delete("/make-server-59b4d089/admin/properties/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const { authorized } = await verifyAuth(authHeader);

    if (!authorized) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    await kv.del(`property:${id}`);
    
    return c.json({ success: true, message: 'Property deleted' });
  } catch (error) {
    console.error('Delete property error:', error);
    return c.json({ success: false, message: 'Failed to delete property' }, 500);
  }
});

// ============================================
// Blog Posts Routes
// ============================================

// Get all blog posts (public - published only)
app.get("/make-server-59b4d089/blog", async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    
    const posts = await kv.getByPrefix('blog_post:');
    const published = posts.filter((p: any) => p.published);
    
    // Sort by published_at descending
    const sorted = published.sort((a: any, b: any) => 
      new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime()
    );
    
    // Paginate
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = sorted.slice(start, end);
    
    return c.json({
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total: published.length,
        totalPages: Math.ceil(published.length / limit),
      }
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    return c.json({ success: false, message: 'Failed to fetch blog posts' }, 500);
  }
});

// Get all blog posts (admin - all posts)
app.get("/make-server-59b4d089/admin/blog", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const { authorized } = await verifyAuth(authHeader);

    if (!authorized) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    
    const posts = await kv.getByPrefix('blog_post:');
    
    // Sort by created_at descending
    const sorted = posts.sort((a: any, b: any) => 
      new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime()
    );
    
    // Paginate
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = sorted.slice(start, end);
    
    return c.json({
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total: posts.length,
        totalPages: Math.ceil(posts.length / limit),
      }
    });
  } catch (error) {
    console.error('Get admin blog posts error:', error);
    return c.json({ success: false, message: 'Failed to fetch blog posts' }, 500);
  }
});

// Get single blog post by ID
app.get("/make-server-59b4d089/blog/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const post = await kv.get(`blog_post:${id}`);
    
    if (!post) {
      return c.json({ success: false, message: 'Blog post not found' }, 404);
    }
    
    return c.json({ success: true, data: post });
  } catch (error) {
    console.error('Get blog post error:', error);
    return c.json({ success: false, message: 'Failed to fetch blog post' }, 500);
  }
});

// Get blog post by slug
app.get("/make-server-59b4d089/blog/slug/:slug", async (c) => {
  try {
    const slug = c.req.param('slug');
    const posts = await kv.getByPrefix('blog_post:');
    const post = posts.find((p: any) => p.slug === slug && p.published);
    
    if (!post) {
      return c.json({ success: false, message: 'Blog post not found' }, 404);
    }
    
    return c.json({ success: true, data: post });
  } catch (error) {
    console.error('Get blog post by slug error:', error);
    return c.json({ success: false, message: 'Failed to fetch blog post' }, 500);
  }
});

// Create blog post (admin only)
app.post("/make-server-59b4d089/admin/blog", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const { authorized, userId } = await verifyAuth(authHeader);

    if (!authorized) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const post = await c.req.json();
    const id = crypto.randomUUID();
    
    // Generate slug from title if not provided
    const slug = post.slug || post.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const newPost = {
      id,
      ...post,
      slug,
      author_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    await kv.set(`blog_post:${id}`, newPost);
    
    return c.json({ success: true, data: newPost }, 201);
  } catch (error) {
    console.error('Create blog post error:', error);
    return c.json({ success: false, message: 'Failed to create blog post' }, 500);
  }
});

// Update blog post (admin only)
app.put("/make-server-59b4d089/admin/blog/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const { authorized } = await verifyAuth(authHeader);

    if (!authorized) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const existing = await kv.get(`blog_post:${id}`);
    if (!existing) {
      return c.json({ success: false, message: 'Blog post not found' }, 404);
    }
    
    const updated = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    
    await kv.set(`blog_post:${id}`, updated);
    
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update blog post error:', error);
    return c.json({ success: false, message: 'Failed to update blog post' }, 500);
  }
});

// Delete blog post (admin only)
app.delete("/make-server-59b4d089/admin/blog/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const { authorized } = await verifyAuth(authHeader);

    if (!authorized) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    await kv.del(`blog_post:${id}`);
    
    return c.json({ success: true, message: 'Blog post deleted' });
  } catch (error) {
    console.error('Delete blog post error:', error);
    return c.json({ success: false, message: 'Failed to delete blog post' }, 500);
  }
});

// ============================================
// Newsletter Subscription Routes
// ============================================

// Subscribe to newsletter (public)
app.post("/make-server-59b4d089/newsletter/subscribe", async (c) => {
  try {
    const { email } = await c.req.json();
    
    if (!email || !email.includes('@')) {
      return c.json({ success: false, message: 'Valid email is required' }, 400);
    }

    // Check if already subscribed
    const subscribers = await kv.getByPrefix('newsletter:');
    const existing = subscribers.find((s: any) => s.email === email);
    
    if (existing && existing.active) {
      return c.json({ 
        success: false, 
        message: 'This email is already subscribed to our newsletter' 
      }, 400);
    }

    const id = crypto.randomUUID();
    const subscriber = {
      id,
      email,
      active: true,
      subscribed_at: new Date().toISOString(),
    };
    
    await kv.set(`newsletter:${email}`, subscriber);
    
    return c.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter!',
      data: subscriber 
    }, 201);
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return c.json({ success: false, message: 'Failed to subscribe to newsletter' }, 500);
  }
});

// Get all subscribers (admin only)
app.get("/make-server-59b4d089/admin/newsletter", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const { authorized } = await verifyAuth(authHeader);

    if (!authorized) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    
    const subscribers = await kv.getByPrefix('newsletter:');
    const active = subscribers.filter((s: any) => s.active);
    
    // Sort by subscribed_at descending
    const sorted = active.sort((a: any, b: any) => 
      new Date(b.subscribed_at).getTime() - new Date(a.subscribed_at).getTime()
    );
    
    // Paginate
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = sorted.slice(start, end);
    
    return c.json({
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total: active.length,
        totalPages: Math.ceil(active.length / limit),
      }
    });
  } catch (error) {
    console.error('Get newsletter subscribers error:', error);
    return c.json({ success: false, message: 'Failed to fetch subscribers' }, 500);
  }
});

// Unsubscribe from newsletter
app.post("/make-server-59b4d089/newsletter/unsubscribe", async (c) => {
  try {
    const { email } = await c.req.json();
    
    const subscriber = await kv.get(`newsletter:${email}`);
    if (!subscriber) {
      return c.json({ success: false, message: 'Email not found' }, 404);
    }
    
    await kv.set(`newsletter:${email}`, {
      ...subscriber,
      active: false,
      unsubscribed_at: new Date().toISOString(),
    });
    
    return c.json({ success: true, message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return c.json({ success: false, message: 'Failed to unsubscribe from newsletter' }, 500);
  }
});

// ============================================
// Contact Form Submission Routes
// ============================================

// Submit contact form (public)
app.post("/make-server-59b4d089/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, first_name, last_name, email, phone, message, subject } = body;
    
    // Support both formats: name or first_name + last_name
    const fullName = name || `${first_name || ''} ${last_name || ''}`.trim();
    
    if (!fullName || !email || !message) {
      return c.json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      }, 400);
    }

    const id = crypto.randomUUID();
    const submission = {
      id,
      name: fullName,
      email,
      phone: phone || '',
      message,
      subject: subject || 'General Inquiry',
      status: 'new',
      created_at: new Date().toISOString(),
    };
    
    await kv.set(`contact:${id}`, submission);
    
    return c.json({ 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: submission 
    }, 201);
  } catch (error) {
    console.error('Contact form submission error:', error);
    return c.json({ success: false, message: 'Failed to submit contact form' }, 500);
  }
});

// Get all contact submissions (admin only)
app.get("/make-server-59b4d089/admin/contact", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const { authorized } = await verifyAuth(authHeader);

    if (!authorized) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    
    const submissions = await kv.getByPrefix('contact:');
    
    // Sort by created_at descending
    const sorted = submissions.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    // Paginate
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = sorted.slice(start, end);
    
    return c.json({
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total: submissions.length,
        totalPages: Math.ceil(submissions.length / limit),
      }
    });
  } catch (error) {
    console.error('Get contact submissions error:', error);
    return c.json({ success: false, message: 'Failed to fetch contact submissions' }, 500);
  }
});

// Update contact submission status (admin only)
app.put("/make-server-59b4d089/admin/contact/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const { authorized } = await verifyAuth(authHeader);

    if (!authorized) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const { status } = await c.req.json();
    
    const existing = await kv.get(`contact:${id}`);
    if (!existing) {
      return c.json({ success: false, message: 'Contact submission not found' }, 404);
    }
    
    const updated = {
      ...existing,
      status,
      updated_at: new Date().toISOString(),
    };
    
    await kv.set(`contact:${id}`, updated);
    
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update contact submission error:', error);
    return c.json({ success: false, message: 'Failed to update contact submission' }, 500);
  }
});

// Delete contact submission (admin only)
app.delete("/make-server-59b4d089/admin/contact/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const { authorized } = await verifyAuth(authHeader);

    if (!authorized) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    await kv.del(`contact:${id}`);
    
    return c.json({ success: true, message: 'Contact submission deleted' });
  } catch (error) {
    console.error('Delete contact submission error:', error);
    return c.json({ success: false, message: 'Failed to delete contact submission' }, 500);
  }
});

// ============================================
// Dashboard Stats Route
// ============================================

app.get("/make-server-59b4d089/admin/stats", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const { authorized } = await verifyAuth(authHeader);

    if (!authorized) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const [properties, blogPosts, subscribers, contacts] = await Promise.all([
      kv.getByPrefix('property:'),
      kv.getByPrefix('blog_post:'),
      kv.getByPrefix('newsletter:'),
      kv.getByPrefix('contact:'),
    ]);

    const stats = {
      totalProperties: properties.length,
      totalBlogPosts: blogPosts.length,
      totalSubscribers: subscribers.filter((s: any) => s.active).length,
      totalContacts: contacts.length,
      publishedProperties: properties.filter((p: any) => p.published).length,
      publishedBlogPosts: blogPosts.filter((p: any) => p.published).length,
      newContacts: contacts.filter((c: any) => c.status === 'new').length,
    };
    
    return c.json({ success: true, data: stats });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return c.json({ success: false, message: 'Failed to fetch dashboard stats' }, 500);
  }
});

Deno.serve(app.fetch);