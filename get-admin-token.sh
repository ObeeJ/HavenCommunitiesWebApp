#!/bin/bash

# Haven Communities - Automated Admin Token Generation
# Uses Supabase Admin API to create user and get session token

set -e

# Configuration
SUPABASE_URL="https://liwyceceoqtivgujyjkz.supabase.co"
SERVICE_ROLE_KEY="sb_secret_hfZ09e99L5hy605biT33jA_q2R3M-e5"
ADMIN_EMAIL="admin@havencommunities.local"
ADMIN_PASSWORD="TestAdmin2025!#"

echo "=================================================="
echo "Haven Communities - Admin Token Generator"
echo "=================================================="
echo ""

# Step 1: Create admin user
echo "Step 1: Creating admin user..."
CREATE_RESPONSE=$(curl -s -X POST \
  -H "apikey: $SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  "$SUPABASE_URL/auth/v1/admin/users" \
  -d "{
    \"email\": \"$ADMIN_EMAIL\",
    \"password\": \"$ADMIN_PASSWORD\",
    \"email_confirm\": true
  }")

echo "Response: $CREATE_RESPONSE"
echo ""

# Check if user already exists (error is fine, we'll just login)
if echo "$CREATE_RESPONSE" | grep -q "user_already_exists"; then
  echo "✓ User already exists, proceeding to login..."
elif echo "$CREATE_RESPONSE" | grep -q "\"id\""; then
  echo "✓ User created successfully"
else
  echo "! User creation response received"
fi

echo ""
echo "Step 2: Getting session token..."

# Step 2: Sign in and get session
LOGIN_RESPONSE=$(curl -s -X POST \
  -H "apikey: $SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  "$SUPABASE_URL/auth/v1/token?grant_type=password" \
  -d "{
    \"email\": \"$ADMIN_EMAIL\",
    \"password\": \"$ADMIN_PASSWORD\"
  }")

echo "Login Response:"
echo "$LOGIN_RESPONSE" | jq . 2>/dev/null || echo "$LOGIN_RESPONSE"
echo ""

# Extract token
ADMIN_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.access_token' 2>/dev/null || echo "")

if [ -z "$ADMIN_TOKEN" ] || [ "$ADMIN_TOKEN" == "null" ]; then
  echo "❌ Failed to get token"
  echo "Full response: $LOGIN_RESPONSE"
  exit 1
fi

echo "=================================================="
echo "✅ SUCCESS - ADMIN TOKEN OBTAINED"
echo "=================================================="
echo ""
echo "Admin Credentials:"
echo "  Email:    $ADMIN_EMAIL"
echo "  Password: $ADMIN_PASSWORD"
echo ""
echo "Admin Token:"
echo "  $ADMIN_TOKEN"
echo ""
echo "=================================================="
echo "Ready to run end-to-end test!"
echo "=================================================="
echo ""
echo "Run the test with:"
echo "  bash END_TO_END_TEST.sh '$ADMIN_TOKEN'"
echo ""

# Save token to file for easy access
echo "$ADMIN_TOKEN" > /tmp/haven_admin_token.txt
echo "Token also saved to: /tmp/haven_admin_token.txt"

