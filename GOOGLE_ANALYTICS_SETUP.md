# Google Analytics 4 (GA4) Setup Guide

This guide explains how to set up Google Analytics 4 tracking for the Softynix website.

## Prerequisites

1. A Google account
2. Access to Google Analytics
3. A Google Analytics 4 property

## Getting Your Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Create a new GA4 property (or use an existing one)
4. Go to Admin → Data Streams → Web
5. Click on your web stream
6. Copy your Measurement ID (it looks like: `G-XXXXXXXXXX`)

## Environment Variables

Add the following environment variable to your `client/.env.local` file:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important:** Replace `G-XXXXXXXXXX` with your actual Google Analytics Measurement ID.

## Features Implemented

### 1. Automatic Page View Tracking
- Every page visit is automatically tracked
- Works on all routes including dynamic routes
- Tracks page path and title

### 2. E-Commerce Event Tracking

The following e-commerce events are tracked:

#### `view_item`
- Triggered when a user views a product detail page
- Tracks: product ID, name, category, price, currency

#### `add_to_cart`
- Triggered when a user adds a product to cart
- Tracks: product ID, name, category, price, quantity, currency, total value

#### `remove_from_cart`
- Triggered when a user removes a product from cart
- Tracks: product ID, name, category, price, quantity, currency, total value

#### `begin_checkout`
- Triggered when a user reaches the payment page
- Tracks: total value, currency, number of items, product details

#### `purchase`
- Triggered when an order is successfully placed
- Tracks: transaction ID, order value, currency, product details, quantities

### 3. User Engagement Events

#### `login`
- Triggered when a user successfully logs in
- Tracks: login method (email)

#### `sign_up`
- Triggered when a user successfully signs up
- Tracks: signup method (email)

#### `search`
- Triggered when a user searches for products
- Tracks: search term

#### `view_item_list`
- Triggered when products are displayed (shop page, category pages)
- Tracks: list name, product IDs, names, categories, prices

## Event Parameters

All e-commerce events include the following standard parameters:

- `currency`: Currency code (BDT)
- `value`: Monetary value
- `items`: Array of product items with:
  - `item_id`: Product ID
  - `item_name`: Product name
  - `item_category`: Product category
  - `price`: Product price
  - `quantity`: Quantity (for cart events)

## Custom Events

You can add custom event tracking using the `useGoogleAnalytics` hook:

```tsx
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";

function MyComponent() {
  const { trackEvent } = useGoogleAnalytics();

  const handleCustomAction = () => {
    trackEvent("custom_event_name", {
      custom_parameter: "value",
      another_param: 123,
    });
  };

  return (
    // Your component JSX
  );
}
```

## Available Tracking Functions

- `trackEvent(eventName, parameters)` - Track any custom event
- `trackPageView(url, title)` - Track page view manually
- `trackPurchase(params)` - Track purchase completion
- `trackAddToCart(params)` - Track add to cart
- `trackBeginCheckout(params)` - Track checkout start
- `trackViewItem(params)` - Track product view
- `trackSearch(params)` - Track search queries
- `trackLogin(method)` - Track user login
- `trackSignUp(method)` - Track user signup
- `trackViewItemList(params)` - Track product list views
- `trackRemoveFromCart(params)` - Track remove from cart

## Testing Your Analytics

### Using Google Analytics DebugView

1. Go to [Google Analytics](https://analytics.google.com/)
2. Navigate to Admin → DebugView
3. Visit your website and perform actions
4. You should see events appearing in real-time

### Using Google Tag Assistant

1. Install the [Google Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Visit your website
3. Click the extension icon to see if GA4 is firing correctly
4. Check that events are being tracked

### Using Browser Console

Open browser console and check for:
- `gtag` function availability
- No JavaScript errors
- Events being logged (in debug mode)

## Integration Points

### Pages with Tracking

1. **Home Page** (`/`)
   - Page view tracking

2. **Shop Page** (`/shop`)
   - Page view tracking
   - Search tracking
   - View item list tracking

3. **Product Pages** (`/products/[id]`)
   - Page view tracking
   - View item tracking

4. **Cart Page** (`/cart`)
   - Page view tracking
   - Add to cart tracking (via cart context)
   - Remove from cart tracking (via cart context)

5. **Payment Page** (`/payment`)
   - Page view tracking
   - Begin checkout tracking

6. **Checkout Success** (`/checkout/success`)
   - Page view tracking
   - Purchase tracking

7. **Login Page** (`/login`)
   - Page view tracking
   - Login event tracking

8. **Signup Page** (`/signup`)
   - Page view tracking
   - Sign up event tracking

## Data Privacy & Compliance

- GA4 automatically handles user privacy
- IP anonymization is enabled by default
- Consider adding a cookie consent banner
- Inform users about tracking in your privacy policy
- Comply with GDPR/CCPA if applicable

## Enhanced E-Commerce Reports

With the implemented tracking, you'll have access to:

- **Monetization Reports**: Revenue, transactions, average order value
- **E-commerce Purchases**: Product performance, sales by product
- **Shopping Behavior**: Cart abandonment, checkout funnel
- **Product Performance**: Best sellers, product views
- **User Engagement**: Login rates, signup conversion

## Troubleshooting

### Analytics Not Firing

1. Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in your `.env.local` file
2. Restart your development server after adding the environment variable
3. Check browser console for any JavaScript errors
4. Verify the Measurement ID is correct in Google Analytics

### Events Not Showing

1. Wait a few minutes - events may take time to appear in reports
2. Use DebugView for real-time event verification
3. Check that events are being called (use browser console)
4. Verify you're using the correct Measurement ID

### Production Deployment

Make sure to:
1. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to your production environment variables
2. Test events after deployment
3. Verify analytics is working in production using Tag Assistant
4. Check Google Analytics reports after 24-48 hours

## Advanced Configuration

### Custom Dimensions

You can add custom dimensions in Google Analytics and track them:

```tsx
const { trackEvent } = useGoogleAnalytics();

trackEvent("custom_event", {
  custom_dimension_1: "value",
  custom_dimension_2: 123,
});
```

### User Properties

Set user properties for better segmentation:

```tsx
if (typeof window !== "undefined" && window.gtag) {
  window.gtag("set", "user_properties", {
    user_type: "premium",
    subscription_status: "active",
  });
}
```

## Support

For issues or questions:
1. Check [Google Analytics Help Center](https://support.google.com/analytics)
2. Use Google Analytics DebugView for troubleshooting
3. Check browser console for errors
4. Verify Measurement ID in Google Analytics Admin

## Next Steps

1. Set up conversion goals in Google Analytics
2. Create custom reports and dashboards
3. Set up audience segments
4. Configure data retention settings
5. Set up automated email reports

---

**Note**: Analytics data may take 24-48 hours to appear in standard reports. Use DebugView for real-time verification.
