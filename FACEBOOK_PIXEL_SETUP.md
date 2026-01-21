# Facebook Pixel Setup Guide

This guide explains how to set up Facebook Pixel tracking for the Softynix website.

## Prerequisites

1. A Facebook Business account
2. Access to Facebook Events Manager
3. A Facebook Pixel ID

## Getting Your Facebook Pixel ID

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager2)
2. Click on "Connect Data Sources" → "Web" → "Facebook Pixel"
3. Click "Connect" and follow the setup wizard
4. Copy your Pixel ID (it looks like: `123456789012345`)

## Environment Variables

Add the following environment variable to your `client/.env.local` file:

```env
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your-pixel-id-here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-google-verification-code (optional)
```

**Important:** Replace `your-pixel-id-here` with your actual Facebook Pixel ID.

## Features Implemented

### 1. Automatic Page View Tracking
- Every page visit is automatically tracked
- Works on all routes including dynamic routes

### 2. Event Tracking

The following events are tracked:

#### AddToCart
- Triggered when a user adds a product to cart
- Tracks: product name, ID, price, quantity, currency

#### InitiateCheckout
- Triggered when user reaches the payment page
- Tracks: total value, currency, number of items, product IDs

#### Purchase
- Triggered when an order is successfully placed
- Tracks: order value, currency, product IDs, quantities

#### ViewContent
- Triggered when a user views a product detail page
- Tracks: product name, ID, price, currency

### 3. SEO Optimization

The following SEO features are implemented:

- **Meta Tags**: Title, description, keywords
- **Open Graph Tags**: For Facebook sharing
- **Twitter Cards**: For Twitter sharing
- **Structured Data**: Ready for search engines
- **Canonical URLs**: Prevents duplicate content issues
- **Robots Meta**: Controls search engine crawling

## Testing Your Pixel

### Using Facebook Pixel Helper

1. Install the [Facebook Pixel Helper Chrome Extension](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Visit your website
3. Click the extension icon to see if the pixel is firing correctly
4. Check that events are being tracked

### Using Facebook Events Manager

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager2)
2. Select your Pixel
3. Click on "Test Events"
4. Visit your website and perform actions (add to cart, purchase, etc.)
5. You should see events appearing in real-time

## Event Parameters

All events include the following standard parameters:

- `value`: Monetary value (in BDT)
- `currency`: Currency code (BDT)
- `content_ids`: Array of product IDs
- `content_name`: Product or order name
- `content_type`: Type of content (usually "product")

## Custom Events

You can add custom event tracking using the `useFacebookPixel` hook:

```tsx
import { useFacebookPixel } from "@/hooks/useFacebookPixel";

function MyComponent() {
  const { trackEvent, trackLead } = useFacebookPixel();

  const handleSignup = () => {
    trackCompleteRegistration({
      content_name: "User Registration",
      status: true,
    });
  };

  const handleContact = () => {
    trackLead({
      content_name: "Contact Form Submission",
      value: 0,
      currency: "BDT",
    });
  };

  return (
    // Your component JSX
  );
}
```

## Available Tracking Functions

- `trackEvent(eventName, params)` - Track any custom event
- `trackPurchase(params)` - Track purchase completion
- `trackAddToCart(params)` - Track add to cart
- `trackInitiateCheckout(params)` - Track checkout start
- `trackViewContent(params)` - Track content views
- `trackSearch(params)` - Track search queries
- `trackLead(params)` - Track lead generation
- `trackCompleteRegistration(params)` - Track registrations

## Troubleshooting

### Pixel Not Firing

1. Check that `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` is set in your `.env.local` file
2. Restart your development server after adding the environment variable
3. Check browser console for any JavaScript errors
4. Verify the pixel ID is correct in Facebook Events Manager

### Events Not Showing

1. Wait a few minutes - events may take time to appear
2. Check Facebook Pixel Helper extension for errors
3. Verify you're using the correct pixel ID
4. Check that events are being called (use browser console)

### Production Deployment

Make sure to:
1. Add `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` to your production environment variables
2. Add `NEXT_PUBLIC_SITE_URL` with your production domain
3. Test events after deployment
4. Verify pixel is working in production using Pixel Helper

## Privacy & Compliance

- The pixel tracks user behavior for advertising purposes
- Consider adding a cookie consent banner
- Inform users about tracking in your privacy policy
- Comply with GDPR/CCPA if applicable

## Support

For issues or questions:
1. Check Facebook Pixel documentation: https://developers.facebook.com/docs/meta-pixel
2. Use Facebook Pixel Helper for debugging
3. Check Facebook Events Manager for event status
