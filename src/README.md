# Haven Communities - Real Estate Platform

A full-stack real estate platform built with React, TypeScript, Tailwind CSS, and Supabase.

## 🎯 Features

### Public Features
- 🏠 **Property Listings** - Browse available properties with detailed information
- 📝 **Blog** - Read articles about real estate, investment, and construction
- 📧 **Newsletter Signup** - Subscribe to receive updates
- 📞 **Contact Form** - Get in touch with the team
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile

### Admin Features
- 🔐 **Secure Authentication** - Admin login with Supabase Auth
- 🏘️ **Property Management** - Create, edit, and delete properties
- ✍️ **Blog Management** - Create and manage blog posts
- 📊 **Dashboard** - View statistics and metrics
- 📬 **Newsletter Management** - View and manage subscribers
- 💬 **Contact Management** - View and respond to contact submissions
- 🖼️ **Image Upload** - Upload and manage property and blog images

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account ([sign up here](https://supabase.com))
- Git installed

### 1. Clone Repository

```bash
git clone https://github.com/your-username/haven-communities.git
cd haven-communities
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

Follow the detailed guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md):

1. Create a Supabase project
2. Run SQL setup scripts
3. Create storage buckets
4. Create admin user

### 4. Configure Environment Variables

Create `.env` file in project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## 📁 Project Structure

```
haven-communities/
├── admin/                      # Admin panel components
│   ├── AdminApp.tsx           # Main admin app
│   ├── AdminLogin.tsx         # Login page
│   ├── AdminDashboard.tsx     # Dashboard
│   ├── AdminPropertyApp.tsx   # Property management
│   ├── AdminBlogApp.tsx       # Blog management
│   └── supabaseApi.ts         # API service layer
├── components/                 # React components
│   ├── About.tsx
│   ├── Blog.tsx
│   ├── Contact.tsx
│   ├── Projects.tsx
│   └── ui/                    # Shadcn UI components
├── lib/                       # Utilities and config
│   ├── supabase.ts           # Supabase client
│   └── database.types.ts     # TypeScript types
├── imports/                   # Figma imports
├── styles/                    # Global styles
└── types/                     # TypeScript definitions
```

## 🗄️ Database Schema

### Tables

1. **properties** - Real estate property listings
   - id, title, description, category, location, price
   - bedrooms, bathrooms, size_sqft, status
   - cover_image_url, gallery_images, features
   - created_at, updated_at, published

2. **blog_posts** - Blog articles
   - id, title, slug, excerpt, content
   - category, author, cover_image_url
   - published_at, created_at, updated_at, published

3. **newsletter_subscribers** - Email subscribers
   - id, email, subscribed_at, active

4. **contact_submissions** - Contact form submissions
   - id, first_name, last_name, email, phone
   - message, created_at, status

5. **admin_users** - Admin accounts
   - id, email, created_at, last_login

### Storage Buckets

1. **property-images** - Property photos
2. **blog-images** - Blog post images

## 🔐 Authentication

Admin authentication uses Supabase Auth with email/password:

```typescript
// Login
import { signIn } from './admin/supabaseApi';
await signIn('admin@example.com', 'password');

// Logout
import { signOut } from './admin/supabaseApi';
await signOut();
```

## 📚 API Documentation

### Public API

#### Get Published Properties
```typescript
import { getPublishedProperties } from './admin/supabaseApi';
const { data, pagination } = await getPublishedProperties(page, limit);
```

#### Get Published Blog Posts
```typescript
import { getPublishedBlogPosts } from './admin/supabaseApi';
const { data, pagination } = await getPublishedBlogPosts(page, limit);
```

#### Subscribe to Newsletter
```typescript
import { subscribeToNewsletter } from './admin/supabaseApi';
await subscribeToNewsletter('user@example.com');
```

#### Submit Contact Form
```typescript
import { createContactSubmission } from './admin/supabaseApi';
await createContactSubmission({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  phone: '+234...',
  message: 'Hello...'
});
```

### Admin API

All admin operations require authentication.

#### Properties
```typescript
// Get all properties (including unpublished)
const { data, pagination } = await getProperties(page, limit);

// Get single property
const property = await getProperty(id);

// Create property
const newProperty = await createProperty({
  title: 'New Property',
  description: '...',
  category: 'Homes',
  // ... other fields
});

// Update property
const updated = await updateProperty(id, { title: 'Updated' });

// Delete property
await deleteProperty(id);
```

#### Blog Posts
```typescript
// Similar CRUD operations
await getBlogPosts(page, limit);
await getBlogPost(id);
await createBlogPost(data);
await updateBlogPost(id, data);
await deleteBlogPost(id);
```

#### Image Upload
```typescript
// Upload property image
const { url, path } = await uploadPropertyImage(file);

// Upload blog image
const { url, path } = await uploadBlogImage(file);

// Delete image
await deleteImage('property-images', path);
```

## 🎨 Design System

### Colors
- **Primary Blue:** #155eef
- **Text Primary:** #181d27
- **Text Secondary:** #535862
- **Success Green:** #039855
- **Error Red:** #E83D3D

### Typography
- **Headings:** Avenir Heavy
- **Body:** Avenir Regular
- **Labels:** Inter Medium

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🚀 Deployment

### Deploy to Render

Follow the complete guide in [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md).

Quick steps:
1. Push code to GitHub
2. Create Render web service
3. Add environment variables
4. Deploy!

### Environment Variables for Production

```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
NODE_VERSION=18
```

### Build Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

### Manual Testing Checklist

**Public Site:**
- [ ] Homepage loads
- [ ] Properties display
- [ ] Blog posts display
- [ ] Newsletter signup works
- [ ] Contact form submits
- [ ] Responsive on mobile

**Admin Panel:**
- [ ] Can login
- [ ] Dashboard shows stats
- [ ] Can create property
- [ ] Can edit property
- [ ] Can delete property
- [ ] Can manage blog posts
- [ ] Can view submissions

## 📖 Documentation

- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Database setup guide
- [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) - Deployment guide
- [ADMIN_PANEL_OVERVIEW.md](./ADMIN_PANEL_OVERVIEW.md) - Admin features
- [IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md) - Implementation details

## 🤝 Contributing

### Development Workflow

1. Create feature branch
```bash
git checkout -b feature/your-feature
```

2. Make changes and test
```bash
npm run dev
```

3. Type check
```bash
npm run type-check
```

4. Commit and push
```bash
git add .
git commit -m "Add feature"
git push origin feature/your-feature
```

5. Create pull request

### Code Style

- Use TypeScript for all files
- Follow ESLint rules
- Use Tailwind for styling
- Keep components small and focused
- Add types for all functions

## 🐛 Troubleshooting

### Application won't start

**Check Node version:**
```bash
node --version  # Should be 18+
```

**Clear cache:**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Supabase connection issues

**Verify environment variables:**
```bash
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

**Check .env file:**
- Must be in project root
- No spaces around `=`
- No quotes around values

### Build fails

**Type errors:**
```bash
npm run type-check
```

**Clear dist:**
```bash
rm -rf dist
npm run build
```

## 📞 Support

- **Documentation Issues:** Open an issue
- **Supabase Help:** [Discord](https://discord.supabase.com)
- **Render Help:** [Community](https://community.render.com)

## 📄 License

Private project - All rights reserved

## 🎉 Credits

- Design: Figma
- Frontend: React + TypeScript + Tailwind CSS
- Backend: Supabase
- Hosting: Render
- Icons: Lucide React

---

**Built with ❤️ for Haven Communities**
