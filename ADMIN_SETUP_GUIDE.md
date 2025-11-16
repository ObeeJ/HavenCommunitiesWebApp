# Admin Panel Setup and Verification Guide

## 1. Accessing the Admin Panel

The admin panel is accessible via a settings gear icon button at the bottom-right corner of the website.

**URL Pattern:** Your application base URL (when running locally: `http://localhost:5173`)

**Access Method:**
1. Click the indigo-blue "Admin" button at bottom-right of any page
2. You will be presented with the Admin Login form
3. Enter your admin credentials (email and password)
4. Click Login

## 2. Authentication System

### Verification Status: ✅ SECURE

**Authentication Type:** Supabase Auth with JWT

**Security Features:**
- Password-based authentication via Supabase Auth
- JWT tokens stored in browser localStorage
- Session verification on each request
- Token automatically included in Authorization header
- Automatic logout on token expiration

**Login Flow:**
1. Credentials sent to Supabase Auth endpoint
2. Supabase returns JWT access token
3. Token stored in localStorage for persistence
4. Token used for all subsequent admin API calls

**Logout:**
- Click "Logout" button in admin dashboard
- Token removed from localStorage
- Session cleared
- User redirected to website home page

### Current Admin User Creation

To create an admin user, you need to:
1. Go to Supabase Dashboard
2. Navigate to Authentication → Users
3. Click "Create New User" 
4. Enter email and password
5. Confirm email creation
6. User can now login via admin panel

## 3. Storage Bucket Configuration

### Verification Status: ✅ CONFIRMED

**Bucket Name:** `HC storage`

**Location:** Supabase Storage (liwyceceoqtivgujyjkz.supabase.co)

**Purpose:**
- Unified storage for all media files (properties and blog posts)
- Supports image uploads for property listings
- Supports featured images for blog articles

**Folder Structure:**
```
HC storage/
├── properties/          # Property listing images
│   └── [timestamp]-[filename].png
└── blog/               # Blog post featured images
    └── [timestamp]-[filename].png
```

**Access Control:**
- Public read access (files publicly accessible)
- Authenticated write access (only logged-in admins can upload)
- Auto-generated CDN URLs for image display

## 4. Admin Features Available

### Property Management
- Create property listings with images
- Edit property details
- Publish/unpublish properties
- Delete properties
- View all properties (admin view shows all, including drafts)

### Blog Management
- Write blog posts
- Add featured images
- Auto-generate URL slugs from titles
- Publish/unpublish posts
- Delete posts

### Newsletter Management
- View active subscribers
- Monitor subscription growth
- Filter by subscription date

### Contact Submissions
- View all contact form submissions
- Track submission status (new, read, resolved)
- Update status for submissions
- Delete submissions

### Dashboard
- View total statistics
- Monitor platform activity
- Quick overview of content

## 5. API Endpoints

All admin operations use the Supabase Edge Function endpoint:

**Base URL:** `https://liwyceceoqtivgujyjkz.supabase.co/functions/v1/make-server-59b4d089`

**Authentication:** Bearer token in Authorization header

**Example:**
```bash
curl -H "Authorization: Bearer [TOKEN]" \
  "https://liwyceceoqtivgujyjkz.supabase.co/functions/v1/make-server-59b4d089/admin/blog"
```

## 6. Troubleshooting

### Cannot Login
- Verify Supabase credentials in `.env` file
- Check that admin user exists in Supabase Auth
- Check browser console for error messages
- Verify network connection to Supabase

### Image Upload Fails
- Verify "HC storage" bucket exists in Supabase Storage
- Check bucket is not full
- Verify file size is reasonable (< 10MB recommended)
- Check file format (PNG, JPG, JPEG supported)

### API Errors
- Verify VITE_SUPABASE_FUNCTION_NAME=make-server-59b4d089 in .env
- Check that Edge Function is deployed
- Verify authentication token is valid
- Check browser console for full error details

## 7. Testing the Setup

To test the complete setup:

1. **Create Admin User**
   - Go to Supabase Dashboard → Authentication
   - Create test user: `admin@test.com` / `TestPassword123!`

2. **Login to Admin Panel**
   - Click Admin button on website
   - Enter credentials
   - Should see Admin Dashboard

3. **Create Test Property**
   - Click "Properties" in admin menu
   - Click "Add New Property"
   - Fill in details
   - Select image from assets
   - Click "Publish"

4. **Verify on User Site**
   - Return to website (click Home button)
   - Navigate to Properties page
   - Should see newly created property

5. **Create Test Blog Post**
   - Click "Blog" in admin menu
   - Click "Add New Blog"
   - Fill in content
   - Select featured image
   - Click "Publish"

6. **Verify on User Site**
   - Return to website
   - Navigate to Blog page
   - Should see newly published post

## 8. Environment Configuration

**Required in `.env`:**
```
VITE_SUPABASE_URL=https://liwyceceoqtivgujyjkz.supabase.co
VITE_SUPABASE_PROJECT_ID=liwyceceoqtivgujyjkz
VITE_SUPABASE_ANON_KEY=[your-anon-key]
VITE_SUPABASE_FUNCTION_NAME=make-server-59b4d089
```

All credentials are already configured in your project.
