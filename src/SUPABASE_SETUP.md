# Supabase Setup Guide for Haven Communities

## 🎯 Overview

This guide walks you through setting up Supabase for your Haven Communities application.

---

## 📋 Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. Node.js and npm installed

---

## 🚀 Step 1: Create a Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - **Project Name:** Haven Communities
   - **Database Password:** (Choose a strong password and save it)
   - **Region:** Choose closest to your users
4. Click "Create new project"
5. Wait for setup to complete (~2 minutes)

---

## 🔑 Step 2: Get Your API Keys

1. In your Supabase project dashboard, click **Settings** (⚙️)
2. Click **API** in the sidebar
3. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJh...`)

---

## 📝 Step 3: Create Database Tables

Go to **SQL Editor** in your Supabase dashboard and run these commands:

### Create Properties Table

```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Homes', 'Investment', 'Construction', 'Land')),
  location TEXT NOT NULL,
  price NUMERIC NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  size_sqft NUMERIC,
  status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Sold', 'Pending')),
  cover_image_url TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT true
);

-- Create index for faster queries
CREATE INDEX idx_properties_category ON properties(category);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_published ON properties(published);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published properties
CREATE POLICY "Public can view published properties"
ON properties FOR SELECT
USING (published = true);

-- Policy: Authenticated users (admins) can do everything
CREATE POLICY "Admins can manage properties"
ON properties FOR ALL
USING (auth.role() = 'authenticated');
```

### Create Blog Posts Table

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Homes', 'Investment', 'Construction', 'Land')),
  author TEXT NOT NULL,
  author_avatar_url TEXT,
  cover_image_url TEXT NOT NULL,
  content_images TEXT[] DEFAULT '{}',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT true
);

-- Create indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published blog posts
CREATE POLICY "Public can view published blog posts"
ON blog_posts FOR SELECT
USING (published = true);

-- Policy: Authenticated users (admins) can manage
CREATE POLICY "Admins can manage blog posts"
ON blog_posts FOR ALL
USING (auth.role() = 'authenticated');
```

### Create Newsletter Subscribers Table

```sql
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active BOOLEAN DEFAULT true
);

-- Create index
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can subscribe (INSERT)
CREATE POLICY "Anyone can subscribe to newsletter"
ON newsletter_subscribers FOR INSERT
WITH CHECK (true);

-- Policy: Only authenticated users can view/manage
CREATE POLICY "Admins can view subscribers"
ON newsletter_subscribers FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage subscribers"
ON newsletter_subscribers FOR UPDATE
USING (auth.role() = 'authenticated');
```

### Create Contact Submissions Table

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded'))
);

-- Create index
CREATE INDEX idx_contact_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_status ON contact_submissions(status);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit contact form
CREATE POLICY "Anyone can submit contact form"
ON contact_submissions FOR INSERT
WITH CHECK (true);

-- Policy: Only authenticated users can view
CREATE POLICY "Admins can view contact submissions"
ON contact_submissions FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update contact submissions"
ON contact_submissions FOR UPDATE
USING (auth.role() = 'authenticated');
```

### Create Admin Users Table

```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can view
CREATE POLICY "Admins can view admin users"
ON admin_users FOR ALL
USING (auth.uid() = id);
```

### Create Storage Bucket for Images

```sql
-- This is done via the Storage UI, but here's the equivalent:
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- Storage policies
CREATE POLICY "Anyone can view images"
ON storage.objects FOR SELECT
USING (bucket_id IN ('property-images', 'blog-images'));

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id IN ('property-images', 'blog-images') 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
USING (
  bucket_id IN ('property-images', 'blog-images') 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
USING (
  bucket_id IN ('property-images', 'blog-images') 
  AND auth.role() = 'authenticated'
);
```

---

## 🔐 Step 4: Set Up Authentication

### Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure:
   - Enable Email Confirmations: **OFF** (for easier testing)
   - Or leave **ON** for production and configure SMTP

### Create Admin User

1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter:
   - **Email:** `admin@havencommunities.com`
   - **Password:** Choose a strong password
   - **Auto Confirm User:** Check this box
4. Click **Create user**
5. Copy the user UUID

### Add Admin to admin_users Table

```sql
INSERT INTO admin_users (id, email)
VALUES ('your-user-uuid-here', 'admin@havencommunities.com');
```

---

## 🖼️ Step 5: Set Up Storage

1. Go to **Storage** in Supabase dashboard
2. Click **Create bucket**
3. Create two buckets:
   - **property-images** (Public: Yes)
   - **blog-images** (Public: Yes)

---

## 💻 Step 6: Configure Your Application

### Create `.env` file in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: For server-side operations (if needed)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Create `.env.example` (for your repository):

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Update `.gitignore`:

```
.env
.env.local
.env.production
```

---

## 📦 Step 7: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

---

## 🧪 Step 8: Test Connection

Create a test file to verify connection:

```typescript
// test-supabase.ts
import { supabase } from './lib/supabase';

async function testConnection() {
  const { data, error } = await supabase
    .from('properties')
    .select('count');
  
  if (error) {
    console.error('Connection failed:', error);
  } else {
    console.log('Connected successfully!', data);
  }
}

testConnection();
```

---

## 📊 Step 9: Seed Sample Data (Optional)

### Add Sample Properties

```sql
INSERT INTO properties (title, description, category, location, price, bedrooms, bathrooms, size_sqft, cover_image_url, features)
VALUES 
(
  'Modern Family Home',
  'Beautiful 4-bedroom home in prime location with modern amenities and spacious living areas.',
  'Homes',
  'Lekki Phase 1, Lagos',
  45000000,
  4,
  3,
  2500,
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
  ARRAY['Swimming Pool', 'Garden', 'Parking', 'Security']
),
(
  'Luxury Villa',
  'Stunning 5-bedroom villa with pool, garden, and premium finishes throughout.',
  'Homes',
  'Banana Island, Lagos',
  120000000,
  5,
  4,
  4000,
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
  ARRAY['Swimming Pool', 'Garden', 'Gym', 'Cinema', 'Smart Home']
);
```

### Add Sample Blog Posts

```sql
INSERT INTO blog_posts (title, slug, excerpt, content, category, author, cover_image_url)
VALUES 
(
  'Top 10 Tips for First-Time Home Buyers',
  'top-10-tips-first-time-home-buyers',
  'Essential advice for anyone looking to purchase their first home in Nigeria.',
  'Buying your first home is an exciting milestone. Here are 10 essential tips to help you navigate the process...',
  'Homes',
  'Olivia Rhye',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa'
),
(
  'Real Estate Investment Guide 2024',
  'real-estate-investment-guide-2024',
  'Complete guide to investing in Nigerian real estate market.',
  'Real estate remains one of the most stable investment options. This comprehensive guide covers everything you need to know...',
  'Investment',
  'Phoenix Baker',
  'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11'
);
```

---

## 🔒 Security Checklist

- [ ] Row Level Security (RLS) enabled on all tables
- [ ] Policies configured correctly
- [ ] `.env` file in `.gitignore`
- [ ] Using anon key (not service role key) in frontend
- [ ] Email confirmations enabled (production)
- [ ] Strong admin password set
- [ ] Storage buckets properly configured
- [ ] CORS settings correct

---

## 🚀 Deployment to Render

### Environment Variables on Render

When deploying to Render, add these environment variables:

1. Go to your Render dashboard
2. Select your web service
3. Go to **Environment** tab
4. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Build Command

```bash
npm install && npm run build
```

### Start Command

```bash
npm run preview
```

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)

---

## 🐛 Troubleshooting

### "relation does not exist" error
- Make sure all SQL commands ran successfully
- Check table names are correct (lowercase)

### Can't authenticate
- Verify admin user is created
- Check admin_users table has the user
- Ensure email/password are correct

### Images not uploading
- Check storage buckets are created
- Verify storage policies are set
- Check bucket names match code

### Connection timeout
- Verify VITE_SUPABASE_URL is correct
- Check VITE_SUPABASE_ANON_KEY is correct
- Ensure .env file is loaded

---

## ✅ Verification Steps

After setup, test these:

1. **Public Access:**
   - [ ] View properties on public site
   - [ ] View blog posts on public site
   - [ ] Submit newsletter signup
   - [ ] Submit contact form

2. **Admin Access:**
   - [ ] Login to admin panel
   - [ ] Create new property
   - [ ] Edit property
   - [ ] Delete property
   - [ ] Create blog post
   - [ ] View newsletter subscribers
   - [ ] View contact submissions

---

**Setup Complete!** 🎉

Your Haven Communities application is now connected to Supabase and ready for production use.
