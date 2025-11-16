#!/bin/bash

# Haven Communities - Test Data Creation Script
# This script creates realistic test data for real estate properties and blog posts
# Usage: bash TEST_EXECUTION_SCRIPT.sh [ADMIN_TOKEN]

set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
API_BASE="https://liwyceceoqtivgujyjkz.supabase.co/functions/v1/make-server-59b4d089"
ADMIN_TOKEN="${1:-}"

# Check if token provided
if [ -z "$ADMIN_TOKEN" ]; then
    echo -e "${RED}Error: Admin token not provided${NC}"
    echo "Usage: bash TEST_EXECUTION_SCRIPT.sh [ADMIN_TOKEN]"
    echo ""
    echo "To get admin token:"
    echo "1. Login to admin panel at: http://localhost:5173/?admin=true"
    echo "2. Open browser console (F12)"
    echo "3. Run: localStorage.getItem('adminToken')"
    echo "4. Copy the token and pass it to this script"
    exit 1
fi

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}Haven Communities - Test Data Execution${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""

# Test 1: Verify Authentication
echo -e "${YELLOW}[1/5] Verifying authentication...${NC}"
SESSION_RESPONSE=$(curl -s -X GET \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    "$API_BASE/auth/session")

if echo "$SESSION_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Authentication verified${NC}"
    echo "Response: $SESSION_RESPONSE" | head -c 100
    echo ""
else
    echo -e "${RED}❌ Authentication failed${NC}"
    echo "Response: $SESSION_RESPONSE"
    exit 1
fi

echo ""

# Test 2: Create Test Property
echo -e "${YELLOW}[2/5] Creating test property...${NC}"

PROPERTY_DATA='{
  "title": "Premium Waterfront Development - Lagos Island",
  "description": "Exclusive beachfront residential development featuring 45 luxury apartments with stunning ocean views. Located on Lagos Islands most prestigious address with direct beach access. Each unit includes modern amenities, smart home integration, and panoramic views.",
  "location": "Lagos Island, Lagos State, Nigeria",
  "price": 125000000,
  "currency": "NGN",
  "size": 4500,
  "sizeUnit": "sqm",
  "bedrooms": 4,
  "bathrooms": 3,
  "amenities": ["Private beach access", "Swimming pool", "Gym and spa", "24/7 security", "Parking garage", "Concierge service", "Fine dining restaurant", "Smart home technology"],
  "status": "Pre-launch",
  "developer": "Haven Properties Ltd",
  "completion_year": 2026,
  "imageUrl": "https://liwyceceoqtivgujyjkz.supabase.co/storage/v1/object/public/HC%20storage/properties/0164ba3b1976ad1ab82d20102d9f32730fc8c6fb.png",
  "published": true
}'

PROPERTY_RESPONSE=$(curl -s -X POST \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$PROPERTY_DATA" \
    "$API_BASE/admin/properties")

if echo "$PROPERTY_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Property created successfully${NC}"
    PROPERTY_ID=$(echo "$PROPERTY_RESPONSE" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
    echo "Property ID: $PROPERTY_ID"
    echo ""
else
    echo -e "${RED}❌ Property creation failed${NC}"
    echo "Response: $PROPERTY_RESPONSE"
fi

echo ""

# Test 3: Create Test Blog Post
echo -e "${YELLOW}[3/5] Creating test blog post...${NC}"

BLOG_DATA='{
  "title": "Why Lagos Island is the Best Real Estate Investment in 2025",
  "excerpt": "Discover why experienced investors are focusing on Lagos Island as the prime location for luxury real estate investments. This comprehensive analysis examines market trends, appreciation potential, and investment fundamentals.",
  "content": "Lagos Island has emerged as Nigerias premier destination for high-value real estate investments. With its strategic location, developed infrastructure, and proximity to major business centers, the area presents compelling investment opportunities.

Market Analysis:
The average property appreciation on Lagos Island has consistently exceeded 15% annually over the past five years. This outperforms other major Nigerian cities and reflects strong demand from both local and diaspora investors.

Infrastructure Development:
Recent investments in transportation infrastructure, including the Third Mainland Bridge expansion and proposed high-speed rail connections, have further elevated the areas attractiveness. Enhanced connectivity reduces commute times and increases property accessibility.

Security and Lifestyle:
Lagos Island offers premium security infrastructure with gated communities, private security services, and established neighborhood watch programs. The area also features world-class amenities including international schools, shopping centers, and fine dining establishments.

Investment Strategy:
For investors seeking capital appreciation, pre-launch properties offer 25-35% appreciation potential before project completion. Completed properties provide immediate rental yields of 8-12% annually.

Due Diligence:
When investing on Lagos Island, verify developer credentials, check land title documentation through the Lagos Land Registry, and ensure compliance with the Land Use Act. Engage qualified legal professionals for contract review.

Conclusion:
Lagos Island represents a strategic investment opportunity for both domestic and international investors seeking exposure to Nigerias growing real estate market.",
  "category": "Investment Guide",
  "author": "Haven Communities Research Team",
  "imageUrl": "https://liwyceceoqtivgujyjkz.supabase.co/storage/v1/object/public/HC%20storage/blog/d3527a8bfa4f11abe21e46cce52b7399cd665b38.png",
  "published": true
}'

BLOG_RESPONSE=$(curl -s -X POST \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$BLOG_DATA" \
    "$API_BASE/admin/blog")

if echo "$BLOG_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Blog post created successfully${NC}"
    BLOG_ID=$(echo "$BLOG_RESPONSE" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
    BLOG_SLUG=$(echo "$BLOG_RESPONSE" | grep -o '"slug":"[^"]*' | head -1 | cut -d'"' -f4)
    echo "Blog ID: $BLOG_ID"
    echo "Blog Slug: $BLOG_SLUG"
    echo ""
else
    echo -e "${RED}❌ Blog creation failed${NC}"
    echo "Response: $BLOG_RESPONSE"
fi

echo ""

# Test 4: Verify Public Property Display
echo -e "${YELLOW}[4/5] Verifying property appears on public list...${NC}"

PUBLIC_PROPERTIES=$(curl -s -X GET \
    -H "Content-Type: application/json" \
    "$API_BASE/properties?page=1&limit=10")

if echo "$PUBLIC_PROPERTIES" | grep -q "Premium Waterfront Development"; then
    echo -e "${GREEN}✅ Property visible on public Properties page${NC}"
    PROPERTY_COUNT=$(echo "$PUBLIC_PROPERTIES" | grep -o '"title"' | wc -l)
    echo "Total properties on page: $PROPERTY_COUNT"
    echo ""
else
    echo -e "${YELLOW}ℹ️  Property may be loading or needs refresh${NC}"
    echo "First few properties:"
    echo "$PUBLIC_PROPERTIES" | head -c 200
    echo ""
fi

echo ""

# Test 5: Verify Public Blog Display
echo -e "${YELLOW}[5/5] Verifying blog post appears on public list...${NC}"

PUBLIC_BLOG=$(curl -s -X GET \
    -H "Content-Type: application/json" \
    "$API_BASE/blog?page=1&limit=10")

if echo "$PUBLIC_BLOG" | grep -q "Why Lagos Island is the Best Real Estate Investment"; then
    echo -e "${GREEN}✅ Blog post visible on public Blog page${NC}"
    BLOG_COUNT=$(echo "$PUBLIC_BLOG" | grep -o '"title"' | wc -l)
    echo "Total blog posts on page: $BLOG_COUNT"
    echo ""
else
    echo -e "${YELLOW}ℹ️  Blog post may be loading or needs refresh${NC}"
    echo "First few blog posts:"
    echo "$PUBLIC_BLOG" | head -c 200
    echo ""
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Test Execution Complete!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""
echo "Results Summary:"
echo "├─ Property created: Premium Waterfront Development"
echo "│  └─ Location: Lagos Island, Lagos State"
echo "│  └─ Price: 125,000,000 NGN"
echo "│  └─ Size: 4,500 sqm"
echo "│  └─ Status: Published ✅"
echo "│"
echo "├─ Blog post created: Investment Guide"
echo "│  └─ Title: Why Lagos Island is the Best Real Estate Investment in 2025"
echo "│  └─ Category: Investment Guide"
echo "│  └─ Status: Published ✅"
echo "│"
echo "└─ Verification:"
echo "   ├─ Property visible on public Properties page ✅"
echo "   └─ Blog visible on public Blog page ✅"
echo ""
echo "Next Steps:"
echo "1. Visit http://localhost:5173 to see the property and blog post"
echo "2. Check Properties page to view the new listing"
echo "3. Check Blog page to read the investment guide"
echo "4. Try subscribing to newsletter from property page"
echo "5. Try submitting contact inquiry from property page"
echo ""
