# 🔧 Troubleshooting Guide

## ❌ Error: "Cannot read properties of undefined (reading 'VITE_SUPABASE_URL')"

This error means the environment variables are not being loaded. Here's how to fix it:

---

## ✅ Solution Checklist

### Step 1: Check .env File Exists
```bash
# In your project root, check if .env exists
ls -la .env
```

**Expected:** You should see `.env` file listed

**If missing:** Create it:
```bash
touch .env
```

---

### Step 2: Check .env File Content

Open `.env` file and make sure it has:

```env
VITE_SUPABASE_URL=your_actual_supabase_url
VITE_SUPABASE_ANON_KEY=your_actual_anon_key
```

**Important:**
- ✅ No quotes around values
- ✅ No spaces around `=`
- ✅ Starts with `VITE_` prefix
- ✅ No comments on the same line

**Example (CORRECT):**
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...<your-actual-key>
```

**Example (WRONG):**
```env
VITE_SUPABASE_URL="https://your-project.supabase.co"  # ❌ No quotes!
SUPABASE_URL=https://your-project.supabase.co         # ❌ Missing VITE_ prefix!
VITE_SUPABASE_URL = https://your-project.supabase.co  # ❌ No spaces around =
```

---

### Step 3: Check File Location

`.env` file **MUST** be in the **project root** (same folder as `package.json`):

```
/your-project/
  ├── .env                    ← Must be here!
  ├── package.json
  ├── vite.config.ts
  ├── App.tsx
  └── lib/
      └── supabase.ts
```

**NOT** in:
- ❌ `/lib/.env`
- ❌ `/src/.env`
- ❌ `/components/.env`

---

### Step 4: Restart Dev Server COMPLETELY

**Important:** Just saving .env is not enough!

```bash
# 1. Stop the server completely
# Press Ctrl+C in the terminal

# 2. Make sure it's stopped
# Wait for the process to end

# 3. Start fresh
npm run dev
```

**Don't just refresh the browser - you MUST restart the server!**

---

### Step 5: Clear Cache (If Still Not Working)

```bash
# Stop the server first (Ctrl+C)

# Delete cache folders
rm -rf node_modules/.vite
rm -rf dist

# Restart
npm run dev
```

---

### Step 6: Check Browser Console

1. Open your app in browser
2. Press `F12` to open DevTools
3. Go to **Console** tab
4. Look for messages

**If Supabase NOT configured, you'll see:**
```
╔════════════════════════════════════════════════════════╗
║          ⚠️  SUPABASE NOT CONFIGURED                   ║
╚════════════════════════════════════════════════════════╝

Current values:
- VITE_SUPABASE_URL: ❌ Missing
- VITE_SUPABASE_ANON_KEY: ❌ Missing
```

**If Supabase IS configured correctly:**
```
- VITE_SUPABASE_URL: ✅ Set
- VITE_SUPABASE_ANON_KEY: ✅ Set
```

---

## 🔍 Common Issues

### Issue 1: "I added the env vars but still getting error"

**Cause:** Server not restarted

**Fix:**
```bash
# Stop server (Ctrl+C)
# Wait 2 seconds
npm run dev
```

---

### Issue 2: ".env file is being ignored"

**Cause:** File might be in wrong location or have wrong extension

**Fix:**
```bash
# Check if it's actually named .env (not .env.txt or env)
ls -la | grep env

# Should show:
# .env
# .env.example

# If you see .env.txt, rename it:
mv .env.txt .env
```

---

### Issue 3: "Environment variables are empty"

**Cause:** Wrong format in .env file

**Fix:** Open .env and check:
- ✅ No quotes: `VITE_SUPABASE_URL=https://...`
- ✅ No spaces: `VITE_SUPABASE_URL=https://...` (not `VITE_SUPABASE_URL = https://...`)
- ✅ Has VITE_ prefix
- ✅ One variable per line

---

### Issue 4: "import.meta.env is undefined"

**Cause:** Code running in wrong context or Vite not configured

**Fix:** 
1. Make sure you're using Vite (check package.json has "vite" in scripts)
2. Make sure `vite.config.ts` exists (we created it)
3. Restart server completely

---

### Issue 5: "Still crashing after all steps"

**Try this nuclear option:**

```bash
# Stop server (Ctrl+C)

# Clear everything
rm -rf node_modules/.vite
rm -rf dist
rm -rf node_modules

# Reinstall
npm install

# Restart
npm run dev
```

---

## 📋 Quick Verification Script

Run this in your project root:

```bash
# Check .env exists and has content
if [ -f .env ]; then
  echo "✅ .env file exists"
  if grep -q "VITE_SUPABASE_URL" .env; then
    echo "✅ VITE_SUPABASE_URL found in .env"
  else
    echo "❌ VITE_SUPABASE_URL not found in .env"
  fi
  if grep -q "VITE_SUPABASE_ANON_KEY" .env; then
    echo "✅ VITE_SUPABASE_ANON_KEY found in .env"
  else
    echo "❌ VITE_SUPABASE_ANON_KEY not found in .env"
  fi
else
  echo "❌ .env file does not exist"
fi
```

---

## 🆘 Still Having Issues?

1. **Check the console message** - It will tell you which variables are missing
2. **Verify your .env file format** - Copy from `.env.example`
3. **Make sure you restarted the server** - This is the #1 cause
4. **Check file location** - Must be in project root
5. **Try the nuclear option** - Delete node_modules and reinstall

---

## ✅ Success Indicators

When everything is working:

1. ✅ Dev server starts without errors
2. ✅ Browser console shows "✅ Set" for both variables (or no Supabase warnings)
3. ✅ App loads without crashing
4. ✅ Admin login page loads (even if login fails, page should load)

---

**Need help?** Check the console messages - they'll tell you exactly what's missing!
