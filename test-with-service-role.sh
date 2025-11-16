#!/bin/bash

API_BASE="https://liwyceceoqtivgujyjkz.supabase.co/functions/v1/make-server-59b4d089"
SERVICE_ROLE_KEY="sb_secret_hfZ09e99L5hy605biT33jA_q2R3M-e5"

echo "Testing Backend with Service Role Key..."
echo ""

echo "Test 1: Health Check"
curl -s "$API_BASE/health" | jq .
echo ""

echo "Test 2: Create Property (with service role key)"
curl -s -X POST \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "title": "Luxury Waterfront - Test",
      "description": "Test property",
      "location": "Lagos Island",
      "price": 150000000,
      "currency": "NGN",
      "size": 3500,
      "sizeUnit": "sqm",
      "bedrooms": 4,
      "bathrooms": 3,
      "status": "Available",
      "developer": "Test Dev",
      "completion_year": 2024,
      "imageUrl": "https://test.com/image.png",
      "published": true
    }' \
    "$API_BASE/admin/properties" | jq .

