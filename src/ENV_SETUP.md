# 🔧 Environment Setup Guide

## ✅ Errors Fixed!

The following error has been resolved:
```
TypeError: Cannot read properties of undefined (reading 'VITE_SUPABASE_URL')
```

---

## 📋 What Was Done

### ✅ Created Files:
1. **`.env`** - Your environment variables file (needs your credentials)
2. **`.env.example`** - Template for reference
3. **`.gitignore`** - Ensures .env is never committed to git

### ✅ Updated Files:
1. **`/lib/supabase.ts`** - Better error handling with helpful messages
2. **`/components/ProjectsNew.tsx`** - Checks if Supabase configured before loading
3. **`/components/BlogNew.tsx`** - Checks if Supabase configured before loading

---

## 🚀 How to Fix (2 Options)

### **Option 1: Quick Test (Without Supabase)**

The app will now run without crashing even if Supabase isn't configured. You'll see helpful error messages in the console, but the static pages will still work.

```bash
npm run dev
```

You'll see this in console:
```
╔════════════════════════════════════════════════════════════════════╗
║                    ⚠️  SUPABASE NOT CONFIGURED                     ║
╚════════════════════════════════════════════════════════════════════╝

Missing Supabase credentials. Please follow these steps:
...
```

**This is fine for testing the UI!** But database features won't work.

---

### **Option 2: Full Setup (With Supabase)**

To get full functionality with database, follow these steps:

#### Step 1: Create Supabase Project (5 min)
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up/login
4. Click "New Project"
5. Choose an organization (or create one)
6. Enter:
   - **Name:** haven-communities
   - **Database Password:** (choose a strong password)
   - **Region:** (choose closest to you)
7. Click "Create new project"
8. Wait 1-2 minutes for setup

#### Step 2: Get Your Credentials (1 min)
1. Once project is ready, click on "Settings" (gear icon)
2. Click "API" in the left sidebar
3. You'll see:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

#### Step 3: Update .env File (1 min)
1. Open the `.env` file in your project root
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Save the file

#### Step 4: Setup Database (10 min)
Follow the detailed steps in `FINAL_SETUP_STEPS.md`:
- Run SQL script to create tables
- Create storage buckets
- Create admin user
- Configure RLS policies

#### Step 5: Restart Dev Server
```bash
# Stop current server (Ctrl+C)
# Start again
npm run dev
```

**Done!** Supabase is now fully configured.

---

## 🧪 How to Test

### Test 1: Check Console
Open browser console (F12), you should see either:
- ✅ No errors (if Supabase configured)
- ⚠️ Helpful warning message (if not configured)

### Test 2: Try Admin Login
1. Go to `/admin` route
2. Try logging in
3. If Supabase configured: Should work
4. If not: Will show error

### Test 3: Try Projects Page
1. Go to Projects page
2. If Supabase configured + has data: Shows properties
3. If Supabase configured + no data: Shows "No properties found"
4. If not configured: Shows error with helpful message

---

## 📂 File Reference

### `.env` (Your actual credentials - NOT in git)
```env
VITE_SUPABASE_URL=your_actual_url
VITE_SUPABASE_ANON_KEY=your_actual_key
```

### `.env.example` (Template - IS in git)
```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### `.gitignore` (Protects .env)
```
.env
.env.local
.env.production
```

---

## ❓ Common Issues

### Issue: "Still getting undefined error"
**Solution:** Make sure to restart your dev server after updating `.env`

### Issue: ".env file not loading"
**Solution:** 
- Check file is named exactly `.env` (not `.env.txt`)
- Check it's in the project root (same level as `package.json`)
- Restart dev server

### Issue: "Database errors"
**Solution:** 
- Make sure you ran the SQL script in Supabase
- Check tables exist in Supabase dashboard
- Verify credentials are correct

---

## ✅ What Works Now

### Without Supabase (Option 1):
- ✅ App doesn't crash
- ✅ Static pages work
- ✅ Helpful error messages
- ❌ No database features

### With Supabase (Option 2):
- ✅ App doesn't crash
- ✅ All pages work
- ✅ Database features work
- ✅ Admin panel works
- ✅ Forms save data
- ✅ Properties/blogs load from DB

---

## 🎯 Next Steps

1. Choose your option:
   - **Option 1:** Quick test (skip Supabase for now)
   - **Option 2:** Full setup (follow steps above)

2. Start dev server:
   ```bash
   npm run dev
   ```

3. If you chose Option 2, follow `FINAL_SETUP_STEPS.md` for complete database setup

---

**Questions?** Check the console for helpful error messages or see `FINAL_SETUP_STEPS.md` for detailed Supabase setup!
