# Environment Variables Setup

This document lists all the environment variables required for the Softynix server application.

## Required Environment Variables

### Database
```env
DATABASE_URL=postgresql://user:password@localhost:5432/softynix
```

### JWT Authentication
```env
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

### Server Configuration
```env
PORT=5000
NODE_ENV=development
```

## Cloudinary Configuration (Required for Image Uploads)

To enable image uploads to Cloudinary, you need to sign up at [cloudinary.com](https://cloudinary.com) and get your credentials:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### How to Get Cloudinary Credentials:
1. Sign up at https://cloudinary.com/users/register/free
2. Go to your Dashboard
3. Copy your Cloud Name, API Key, and API Secret

## Email Configuration (Required for Order Notifications)

### Option 1: Gmail SMTP
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**Note for Gmail:** You need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

### Option 2: Other SMTP Providers
```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@domain.com
SMTP_PASSWORD=your-password
```

### Option 3: SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

## WhatsApp Configuration (Required for WhatsApp Notifications)

To enable WhatsApp notifications via Twilio:

1. Sign up at [Twilio](https://www.twilio.com/try-twilio)
2. Get a Twilio account SID and Auth Token
3. Set up WhatsApp Sandbox or get a WhatsApp Business API number

```env
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

**Note:** 
- For testing, you can use Twilio's WhatsApp Sandbox (free)
- For production, you need to apply for WhatsApp Business API access
- The WhatsApp number format should be: `whatsapp:+[country code][phone number]`

### Twilio WhatsApp Sandbox Setup:
1. Go to https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
2. Join the sandbox by sending the code to the provided number
3. Use the sandbox number as `TWILIO_WHATSAPP_NUMBER`

## Admin API Key (Optional)
```env
ADMIN_API_KEY=your-admin-api-key-here
```

## Complete .env Example

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/softynix

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Admin
ADMIN_API_KEY=your-admin-api-key
```

## Features Enabled by These Variables

- **Cloudinary**: All image uploads (products, categories, courses) will be uploaded to Cloudinary
- **Email**: Order confirmation emails will be sent to customers
- **WhatsApp**: Order confirmation messages will be sent via Twilio WhatsApp API

If any of these services are not configured, the related features will be disabled gracefully (errors will be logged but won't break the application).

