# JWT Verification Issue & Solution

## Problem
The Supabase Edge Function "make-server-59b4d089" has JWT verification enabled at the function level, which is blocking all requests with a mismatch error.

## Why This Happens
Supabase has a setting: "Verify JWT with legacy secret"
- When ENABLED: Function verifies JWT using a specific Supabase secret
- Our JWT is from Supabase Auth but may not match the expected secret format
- Result: 401 Unauthorized before request reaches our backend code

## Solution Required
1. Go to Supabase Dashboard: https://supabase.com/dashboard
2. Select project: liwyceceoqtivgujyjkz
3. Navigate to: Functions → make-server-59b4d089 → Settings
4. Find: "Verify JWT with legacy secret" toggle
5. UNCHECK/DISABLE it
6. SAVE settings
7. Wait 30 seconds for changes to propagate
8. Re-run test

## Alternative - Use Service Role Key
If disabling JWT verification isn't possible, we can use the service role key for testing:

