# Test Data Creation Guide

This guide explains how to create realistic test data for Haven Communities real estate marketplace.

## Available Cover Images from Project Assets

The following high-quality images are available in `src/assets/` for use as cover photos:

### Suitable for Properties
- **0164ba3b1976ad1ab82d20102d9f32730fc8c6fb.png** (233 KB) - Modern residential architecture
- **05693c11afbf0b379d5b90d3bfa4c05a01ac5baf.png** (210 KB) - Landscape/neighborhood view
- **26d2fceb73e66695fbe106bfc5490e82c6f2f378.png** (416 KB) - Aerial property view
- **6a0f78d573110e8831ecfb44ca95157a1cf2d390.png** (450 KB) - Development site view

### Suitable for Blog Posts
- **0164ba3b1976ad1ab82d20102d9f32730fc8c6fb.png** (233 KB) - Real estate insights
- **d3527a8bfa4f11abe21e46cce52b7399cd665b38.png** (434 KB) - Investment guide
- **57a875cbf43f15352e91851211914a72f3de3820.png** (316 KB) - Market analysis
- **5ff434dbd2b3c4e81ad3e56d77f72e84d934d3b9.png** (22.6 MB) - Comprehensive guide

## Uploading Test Images to Storage

### Via Admin Panel

1. Login to admin panel: `http://localhost:5173/?admin=true`
2. Use Ctrl+Shift+A to toggle admin view
3. Navigate to Properties or Blog section
4. Click "Add New" button
5. For image upload:
   - Click image field
   - Select file from `src/assets/` directory
   - System will upload to "HC storage" bucket
   - Auto-generates CDN URL

### Direct CDN URL Access

Once uploaded, images are accessible at:
```
https://liwyceceoqtivgujyjkz.supabase.co/storage/v1/object/public/HC storage/properties/[timestamp]-[filename]
https://liwyceceoqtivgujyjkz.supabase.co/storage/v1/object/public/HC storage/blog/[timestamp]-[filename]
```

## Sample Test Property Data

Create a property with these realistic details:

```json
{
  "title": "Premium Waterfront Development - Lagos Island",
  "description": "Exclusive beachfront residential development featuring 45 luxury apartments with stunning ocean views. Located on Lagos Island's most prestigious address with direct beach access.",
  "location": "Lagos Island, Lagos State",
  "price": 125000000,
  "currency": "NGN",
  "size": 4500,
  "sizeUnit": "sqm",
  "bedrooms": 4,
  "bathrooms": 3,
  "amenities": [
    "Private beach access",
    "Swimming pool",
    "Gym and spa",
    "24/7 security",
    "Parking garage",
    "Concierge service",
    "Fine dining restaurant"
  ],
  "status": "Pre-launch",
  "developer": "Haven Properties Ltd",
  "completion_year": 2026,
  "image_url": "[upload from assets]",
  "published": true
}
```

## Sample Test Blog Post Data

Create a blog post with these realistic details:

```json
{
  "title": "Why Lagos Island is the Best Real Estate Investment in 2025",
  "excerpt": "Discover why experienced investors are focusing on Lagos Island as the prime location for luxury real estate investments. This comprehensive analysis examines market trends, appreciation potential, and investment fundamentals.",
  "content": "Lagos Island has emerged as Nigeria's premier destination for high-value real estate investments. With its strategic location, developed infrastructure, and proximity to major business centers, the area presents compelling investment opportunities.

Market Analysis:
The average property appreciation on Lagos Island has consistently exceeded 15% annually over the past five years. This outperforms other major Nigerian cities and reflects strong demand from both local and diaspora investors.

Infrastructure Development:
Recent investments in transportation infrastructure, including the Third Mainland Bridge expansion and proposed high-speed rail connections, have further elevated the area's attractiveness. Enhanced connectivity reduces commute times and increases property accessibility.

Security and Lifestyle:
Lagos Island offers premium security infrastructure with gated communities, private security services, and established neighborhood watch programs. The area also features world-class amenities including international schools, shopping centers, and fine dining establishments.

Investment Strategy:
For investors seeking capital appreciation, pre-launch properties offer 25-35% appreciation potential before project completion. Completed properties provide immediate rental yields of 8-12% annually.

Due Diligence:
When investing on Lagos Island, verify developer credentials, check land title documentation through the Lagos Land Registry, and ensure compliance with the Land Use Act. Engage qualified legal professionals for contract review.",
  "category": "Investment Guide",
  "author": "Haven Communities Research Team",
  "featured_image_url": "[upload from assets]",
  "slug": "why-lagos-island-is-the-best-real-estate-investment-in-2025",
  "published": true,
  "published_at": "2025-11-16T10:00:00Z"
}
```

## Step-by-Step Creation Process

### For Properties:

1. Navigate to `http://localhost:5173/?admin=true`
2. Press `Ctrl+Shift+A` to enter admin mode
3. Login with admin credentials
4. Click "Properties" menu
5. Click "Add New Property"
6. Fill in the property form:
   - Title: "Premium Waterfront Development - Lagos Island"
   - Location: "Lagos Island, Lagos State"
   - Price: 125000000
   - Size: 4500 sqm
   - Bedrooms: 4
   - Bathrooms: 3
   - Status: "Pre-launch"
   - Completion: 2026
7. Upload image:
   - Click image field
   - Select: `0164ba3b1976ad1ab82d20102d9f32730fc8c6fb.png` (Modern residential)
8. Click "Publish"
9. Verify by pressing `Ctrl+Shift+A` again
10. Navigate to "Properties" page to see live listing

### For Blog Posts:

1. Stay in admin panel (or re-enter with `?admin=true`)
2. Click "Blog" menu
3. Click "Add New Blog"
4. Fill in the blog form:
   - Title: "Why Lagos Island is the Best Real Estate Investment in 2025"
   - Category: "Investment Guide"
   - Author: "Haven Communities Research Team"
   - Content: Copy the content from above
   - Excerpt: Copy the excerpt from above
5. Upload featured image:
   - Click featured image field
   - Select: `d3527a8bfa4f11abe21e46cce52b7399cd665b38.png` (Investment guide)
6. System will auto-generate slug: `why-lagos-island-is-the-best-real-estate-investment-in-2025`
7. Click "Publish"
8. Verify by navigating to "Blog" page to see published post

## Verification Checklist

### After Creating Property:
- [ ] Property appears in Admin Dashboard (Property count incremented)
- [ ] Property visible on public Properties page
- [ ] Image displays correctly
- [ ] All details (price, location, specs) display correctly
- [ ] "View Details" button works
- [ ] Newsletter subscription works on property page

### After Creating Blog Post:
- [ ] Blog post appears in Admin Dashboard (Blog count incremented)
- [ ] Post visible on public Blog page
- [ ] Featured image displays correctly
- [ ] Post excerpt displays in blog list
- [ ] "Read More" link works and shows full content
- [ ] Slug URL is correct and accessible
- [ ] Author and publication date display correctly

## Expected Database Values

After successful creation:

**Properties Table:**
```
id: [auto-generated UUID]
title: "Premium Waterfront Development - Lagos Island"
price: 125000000
location: "Lagos Island, Lagos State"
image_url: "https://liwyceceoqtivgujyjkz.supabase.co/storage/v1/object/public/HC storage/properties/[timestamp]-0164ba3b1976ad1ab82d20102d9f32730fc8c6fb.png"
published: true
created_at: [current timestamp]
```

**Blog Posts Table:**
```
id: [auto-generated UUID]
title: "Why Lagos Island is the Best Real Estate Investment in 2025"
slug: "why-lagos-island-is-the-best-real-estate-investment-in-2025"
featured_image_url: "https://liwyceceoqtivgujyjkz.supabase.co/storage/v1/object/public/HC storage/blog/[timestamp]-d3527a8bfa4f11abe21e46cce52b7399cd665b38.png"
published: true
published_at: [current timestamp]
created_at: [current timestamp]
```

## Troubleshooting

### Image Upload Fails:
- Verify "HC storage" bucket exists in Supabase Storage
- Check file size (should be < 50MB for images)
- Ensure file is valid PNG/JPG/JPEG
- Check browser console for specific error messages

### Data Doesn't Appear:
- Verify `published: true` is set on the item
- Check that admin is logged in (JWT token valid)
- Refresh browser page to clear cache
- Check browser console for network errors

### Authentication Issues:
- Verify admin user exists in Supabase Auth
- Check .env file has correct VITE_SUPABASE_ANON_KEY
- Clear localStorage and re-login
- Check Supabase project status and active session

## API Verification

To verify data was created correctly, you can use the API directly:

### Get Properties:
```bash
curl "https://liwyceceoqtivgujyjkz.supabase.co/functions/v1/make-server-59b4d089/properties"
```

### Get Blog Posts:
```bash
curl "https://liwyceceoqtivgujyjkz.supabase.co/functions/v1/make-server-59b4d089/blog"
```

### Get Admin Properties (requires auth):
```bash
curl -H "Authorization: Bearer [TOKEN]" \
  "https://liwyceceoqtivgujyjkz.supabase.co/functions/v1/make-server-59b4d089/admin/properties"
```

Response should show array with created items in `data` field.

## Next Steps After Verification

Once test data is verified on the user-facing pages:

1. **Email Newsletter**
   - Subscribe via newsletter form
   - Verify you receive confirmation email (if configured)

2. **Contact Form**
   - Submit contact inquiry for the property
   - Verify submission appears in Admin Contact submissions

3. **Property Viewing**
   - Test "Request Viewing" functionality
   - Verify contact information displays correctly

4. **Blog Engagement**
   - Share blog post via social media (if implemented)
   - Test blog post social media tags

5. **Performance Testing**
   - Monitor page load times with images
   - Test on mobile devices
   - Verify responsive image display
