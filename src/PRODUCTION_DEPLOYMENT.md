# Production Deployment Guide - Haven Communities

Complete guide to deploying Haven Communities to production on Render with Supabase.

---

## 📋 Pre-Deployment Checklist

- [ ] Supabase project created and configured
- [ ] Database tables created (see SUPABASE_SETUP.md)
- [ ] Admin user created in Supabase Auth
- [ ] Storage buckets created
- [ ] Environment variables documented
- [ ] .gitignore includes .env files
- [ ] Application tested locally

---

## 🚀 Part 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **New Project**
3. Fill in project details
4. Wait for project to be ready (~2 minutes)

### 1.2 Run Database Setup

Follow the complete guide in `SUPABASE_SETUP.md` to:
- Create all tables
- Set up Row Level Security (RLS)
- Create storage buckets
- Create admin user
- Seed sample data (optional)

### 1.3 Get API Credentials

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGci...`

---

## 📦 Part 2: Prepare Your Application

### 2.1 Install Dependencies

```bash
npm install @supabase/supabase-js
```

### 2.2 Create .env File

Create `.env` in project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2.3 Update .gitignore

Ensure these are in `.gitignore`:

```
.env
.env.local
.env.production
.env.development
node_modules/
dist/
```

### 2.4 Test Locally

```bash
npm run dev
```

Verify:
- Application loads
- Can login to admin
- Can create/edit/delete properties
- Can view public properties
- Newsletter signup works
- Contact form works

---

## 🌐 Part 3: Deploy to Render

### 3.1 Push Code to GitHub

```bash
git add .
git commit -m "Production ready with Supabase"
git push origin main
```

### 3.2 Create Render Account

1. Go to [https://render.com](https://render.com)
2. Sign up / Login with GitHub
3. Authorize Render to access your repository

### 3.3 Create New Web Service

1. Click **New +** → **Web Service**
2. Connect your GitHub repository
3. Configure:

**Basic Settings:**
```
Name: haven-communities
Region: Choose closest to your users
Branch: main
Runtime: Node
```

**Build Settings:**
```
Build Command: npm install && npm run build
Start Command: npm run preview
```

**Environment Variables:**
Click **Advanced** → **Add Environment Variable**

Add these:
```
VITE_SUPABASE_URL = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NODE_VERSION = 18
```

**Instance Type:**
```
Free (or Starter for production)
```

4. Click **Create Web Service**

### 3.4 Wait for Deployment

- First deployment takes 5-10 minutes
- Watch the logs for any errors
- Render will show "Live" when ready

---

## 🔧 Part 4: Configure Custom Domain (Optional)

### 4.1 In Render Dashboard

1. Go to your web service
2. Click **Settings** tab
3. Scroll to **Custom Domain**
4. Click **Add Custom Domain**
5. Enter your domain: `www.havencommunities.com`

### 4.2 In Your DNS Provider

Add these records:

**For www subdomain:**
```
Type: CNAME
Name: www
Value: haven-communities.onrender.com
TTL: 3600
```

**For root domain:**
```
Type: A
Name: @
Value: [Render's IP - shown in dashboard]
TTL: 3600
```

### 4.3 Enable HTTPS

- Render automatically provides SSL
- Wait 5-10 minutes for certificate to be issued
- Your site will be available at `https://www.havencommunities.com`

---

## 🔒 Part 5: Security Hardening

### 5.1 Supabase Security

**Enable Email Confirmations:**
1. Go to Supabase Dashboard → **Authentication** → **Providers**
2. Enable Email confirmations
3. Configure SMTP settings for production

**Review RLS Policies:**
```sql
-- Verify all tables have RLS enabled
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename NOT IN (
  SELECT tablename FROM pg_policies
);
```

**Check Storage Policies:**
1. Go to **Storage** → Each bucket
2. Verify policies allow:
   - Public read
   - Authenticated write/delete

### 5.2 Application Security

**Rate Limiting:**
Consider adding rate limiting for:
- Newsletter signups
- Contact form submissions
- Login attempts

**Input Validation:**
- All forms validate on client and server
- SQL injection protection (Supabase handles this)
- XSS protection (React handles this)

**CORS Configuration:**
In Supabase Dashboard → **Settings** → **API**:
```
Allowed origins: https://www.havencommunities.com
```

---

## 📊 Part 6: Monitoring & Analytics

### 6.1 Render Monitoring

**View Logs:**
1. Go to your web service
2. Click **Logs** tab
3. Monitor for errors

**Set Up Alerts:**
1. Go to **Settings** → **Alerts**
2. Add alert for service down
3. Add email notification

### 6.2 Supabase Monitoring

**Database Performance:**
1. Go to **Database** → **Monitoring**
2. Watch query performance
3. Set up alerts for slow queries

**API Usage:**
1. Go to **Settings** → **Billing**
2. Monitor API requests
3. Set up usage alerts

### 6.3 Add Google Analytics (Optional)

Add to your index.html:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔄 Part 7: CI/CD Setup

### 7.1 Automatic Deployments

Render automatically deploys when you push to main:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Render will:
1. Detect push
2. Run build
3. Deploy if successful
4. Keep previous version if failed

### 7.2 Preview Deployments

For pull requests:
1. Go to **Settings** → **Branch Deploys**
2. Enable **Preview Deployments**
3. Every PR gets a preview URL

---

## 🧪 Part 8: Post-Deployment Testing

### 8.1 Public Site Testing

- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] All images load
- [ ] Projects/Properties display
- [ ] Blog posts display
- [ ] Newsletter signup works
- [ ] Contact form submits
- [ ] Mobile responsive
- [ ] Fast loading (< 3s)

### 8.2 Admin Panel Testing

- [ ] Can access `/admin`
- [ ] Login works
- [ ] Dashboard shows stats
- [ ] Can create property
- [ ] Can edit property
- [ ] Can delete property
- [ ] Can create blog post
- [ ] Can edit blog post
- [ ] Can view newsletters
- [ ] Can view contacts
- [ ] Logout works

### 8.3 Performance Testing

Use [PageSpeed Insights](https://pagespeed.web.dev/):
```
https://pagespeed.web.dev/?url=https://www.havencommunities.com
```

Target scores:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

---

## 🐛 Part 9: Troubleshooting

### Build Fails on Render

**Check Node Version:**
```
Environment Variables:
NODE_VERSION = 18
```

**Check Build Command:**
```
npm install && npm run build
```

**View Build Logs:**
Look for specific error messages in Render logs

### Application Not Loading

**Check Environment Variables:**
- Verify `VITE_SUPABASE_URL` is correct
- Verify `VITE_SUPABASE_ANON_KEY` is correct
- Must start with `VITE_` for Vite to pick them up

**Check Start Command:**
```
npm run preview
```

### Database Connection Issues

**Verify Supabase:**
- Project is active (not paused)
- URL is correct
- Anon key is correct
- RLS policies allow access

**Check Supabase Dashboard:**
- API → Logs for errors
- Database → Queries for slow/failed queries

### Images Not Loading

**Check Storage Buckets:**
- Buckets are public
- Policies allow read access
- Images were uploaded successfully

**Check Image URLs:**
- Should be: `https://xxxxx.supabase.co/storage/v1/object/public/...`
- Verify URLs in database match uploaded images

### Forms Not Submitting

**Check RLS Policies:**
```sql
-- Newsletter should allow INSERT for everyone
CREATE POLICY "Anyone can subscribe"
ON newsletter_subscribers FOR INSERT
WITH CHECK (true);

-- Contact should allow INSERT for everyone
CREATE POLICY "Anyone can submit contact"
ON contact_submissions FOR INSERT
WITH CHECK (true);
```

**Check Network Tab:**
- Open browser DevTools → Network
- Submit form
- Look for failed requests
- Check request/response

---

## 📈 Part 10: Optimization

### 10.1 Image Optimization

**Use WebP format:**
- Convert images to WebP before upload
- Supabase Storage supports WebP

**Set proper dimensions:**
- Properties: 1200x800px
- Blog posts: 1200x630px
- Thumbnails: 400x300px

**Enable caching:**
Already configured in storage upload:
```typescript
cacheControl: '3600' // 1 hour
```

### 10.2 Database Optimization

**Add indexes for common queries:**
```sql
CREATE INDEX IF NOT EXISTS idx_properties_category ON properties(category);
CREATE INDEX IF NOT EXISTS idx_properties_published ON properties(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
```

**Enable Postgres extensions:**
```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm; -- For fuzzy text search
```

### 10.3 CDN Setup (Optional)

Use Cloudflare for:
- Additional caching
- DDoS protection
- Better global performance

---

## 🔐 Part 11: Backup Strategy

### 11.1 Supabase Backups

**Automatic Backups:**
- Supabase backs up daily (free tier: 7 days retention)
- Pro tier: 30 days retention

**Manual Backup:**
```bash
# Export database
pg_dump "postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres" > backup.sql

# Restore
psql "postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres" < backup.sql
```

### 11.2 Code Backups

**GitHub:**
- All code is in version control
- Multiple branches for safety
- Tags for releases

**Render:**
- Keeps deployment history
- Can rollback to previous version

---

## 📞 Part 12: Support & Maintenance

### 12.1 Regular Maintenance

**Weekly:**
- [ ] Check error logs
- [ ] Review analytics
- [ ] Test critical functions

**Monthly:**
- [ ] Update dependencies: `npm update`
- [ ] Review Supabase usage
- [ ] Backup important data
- [ ] Check SSL certificate (auto-renews)

**Quarterly:**
- [ ] Security audit
- [ ] Performance review
- [ ] User feedback review
- [ ] Update documentation

### 12.2 Getting Help

**Render Support:**
- Documentation: https://render.com/docs
- Community: https://community.render.com

**Supabase Support:**
- Documentation: https://supabase.com/docs
- Discord: https://discord.supabase.com

**Application Issues:**
- Check application logs in Render
- Check Supabase logs
- Review TROUBLESHOOTING.md

---

## ✅ Deployment Complete!

Your Haven Communities application is now:

✅ Deployed to production on Render
✅ Connected to Supabase database
✅ Secured with RLS policies
✅ Monitored and backed up
✅ Ready for real users

**Next Steps:**
1. Test everything thoroughly
2. Share with stakeholders
3. Monitor for issues
4. Gather user feedback
5. Iterate and improve

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

**Deployed:** Ready for Production 🎉

**Support:** Check TROUBLESHOOTING.md for common issues

**Updates:** Push to main branch for automatic deployment
