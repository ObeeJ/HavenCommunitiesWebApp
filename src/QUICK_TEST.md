# 🚀 Quick Test Guide

## Test Your Supabase Backend in 3 Steps

### Step 1: Open the Test Page
Navigate to `/test-supabase.html` in your browser to see a beautiful test interface.

### Step 2: Test Newsletter Subscription
1. Enter an email address in the "Test Newsletter Subscription" section
2. Click "Subscribe to Newsletter"
3. You should see a green success message! ✅

### Step 3: Test Contact Form
1. Fill in the Name, Email, and Message fields in the "Test Contact Form" section
2. Click "Submit Contact Form"
3. You should see a green success message! ✅

---

## Test Your Main Application

### Newsletter Modal
1. Go to your main app
2. Wait 10 seconds for the email modal to appear
3. Enter your email and subscribe
4. Look for the success toast notification!

### Contact Form
1. Click "Book Now" on your landing page
2. Fill out the contact form with your details
3. Click Submit
4. Look for the success toast notification!

---

## View Your Data (Admin Only)

To view the data that's been saved:

### Create an Admin Account
```bash
curl -X POST https://liwyceceoqtivgujyjkz.supabase.co/functions/v1/make-server-59b4d089/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-admin@email.com",
    "password": "YourSecurePassword123!",
    "name": "Your Name"
  }'
```

### Sign In
```bash
curl -X POST https://liwyceceoqtivgujyjkz.supabase.co/functions/v1/make-server-59b4d089/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-admin@email.com",
    "password": "YourSecurePassword123!"
  }'
```

This will return an access_token. Use this token for all admin requests.

### View Newsletter Subscribers
```bash
curl -X GET https://liwyceceoqtivgujyjkz.supabase.co/functions/v1/make-server-59b4d089/admin/newsletter \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### View Contact Submissions
```bash
curl -X GET https://liwyceceoqtivgujyjkz.supabase.co/functions/v1/make-server-59b4d089/admin/contact \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### View Dashboard Stats
```bash
curl -X GET https://liwyceceoqtivgujyjkz.supabase.co/functions/v1/make-server-59b4d089/admin/stats \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## ✅ What's Working

- ✅ Newsletter subscriptions are saved to Supabase
- ✅ Contact form submissions are saved to Supabase
- ✅ Admin authentication system is functional
- ✅ Toast notifications show success/error messages
- ✅ All CRUD operations for properties and blog posts
- ✅ Dashboard statistics API

---

## 🎯 Next Steps

1. **Test the email modal** - Wait 10 seconds on your homepage
2. **Test the contact form** - Click "Book Now" and submit
3. **Create an admin account** - Use the curl command above
4. **Build admin UI** - Connect your admin panel to the API
5. **Add more features** - Properties, blog posts, image uploads, etc.

---

## 📚 Full Documentation

See `SUPABASE_CONNECTED.md` for complete API documentation and advanced features.
