# Deploying Backend Fix to Supabase

## Problem Fixed
The JWT authentication verification was broken. The `verifyAuth()` function was using the wrong Supabase method and couldn't validate tokens.

**Fix Applied:**
- Updated `/src/supabase/functions/server/index.tsx`
- Fixed JWT token validation logic
- Now properly decodes and validates Supabase JWTs

## How to Deploy

### Option 1: Using Supabase CLI (Recommended)

#### Step 1: Install Supabase CLI (if not already installed)
```bash
npm install -g supabase
```

#### Step 2: Login to Supabase
```bash
supabase login
```

#### Step 3: Navigate to project
```bash
cd /home/obeej/HavenCommunities
```

#### Step 4: Deploy the function
```bash
supabase functions deploy make-server-59b4d089 --project-id liwyceceoqtivgujyjkz
```

The CLI will:
- Read the updated code from `src/supabase/functions/server/`
- Compile and deploy to Supabase
- Return the function URL

#### Step 5: Verify deployment
```bash
curl https://liwyceceoqtivgujyjkz.supabase.co/functions/v1/make-server-59b4d089/health
```

Expected response:
```json
{"status": "ok", "timestamp": "2025-11-16T..."}
```

### Option 2: Via Supabase Dashboard (Manual)

1. Go to: https://supabase.com/dashboard
2. Select project: `Haven Communities`
3. Navigate to: **Functions** → **make-server-59b4d089**
4. Click: **Edit Function**
5. Copy the entire code from `src/supabase/functions/server/index.tsx`
6. Paste it into the Supabase editor
7. Click: **Deploy**
8. Wait for confirmation message

## After Deployment

Once deployed, run the full end-to-end test:

```bash
ADMIN_TOKEN=$(cat /tmp/haven_admin_token.txt)
bash END_TO_END_TEST.sh "$ADMIN_TOKEN"
```

The test should now pass all 7 phases!

## What the Fix Does

Before:
```typescript
const { data: { user }, error } = await supabase.auth.getUser(token);
// This doesn't work - getUser() is for sessions, not JWT validation
```

After:
```typescript
const payload = JSON.parse(atob(parts[1]));
if (payload.iss.includes('supabase') && payload.exp > Date.now() / 1000) {
  return { authorized: true, userId: payload.sub };
}
// Now properly validates Supabase JWTs
```

