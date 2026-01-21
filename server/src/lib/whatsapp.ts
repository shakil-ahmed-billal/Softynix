import twilio from 'twilio';
import 'dotenv/config';

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER; 
// Format: whatsapp:+14155238886

/**
 * Send WhatsApp message via Twilio
 * Note: The recipient number must be registered with WhatsApp and in the format: whatsapp:+1234567890
 */
export async function sendWhatsAppMessage(
  to: string,
  message: string
): Promise<void> {
  try {
    // Ensure phone number is in correct format
    let formattedTo = to.trim();
    
    // Remove any existing whatsapp: prefix
    if (formattedTo.startsWith('whatsapp:')) {
      formattedTo = formattedTo.replace('whatsapp:', '');
    }
    
    // Add country code if not present (assuming Bangladesh +880)
    if (!formattedTo.startsWith('+')) {
      // If it starts with 0, replace with +880
      if (formattedTo.startsWith('0')) {
        formattedTo = '+880' + formattedTo.substring(1);
      } else {
        formattedTo = '+880' + formattedTo;
      }
    }
    
    // Add whatsapp: prefix
    formattedTo = `whatsapp:${formattedTo}`;

    if (!TWILIO_WHATSAPP_NUMBER) {
      console.warn('TWILIO_WHATSAPP_NUMBER not configured, skipping WhatsApp message');
      return;
    }
    console.log({
      from: TWILIO_WHATSAPP_NUMBER,
      to: formattedTo,
      body: message
    });
    
    const messageResult = await client.messages.create({
      from: TWILIO_WHATSAPP_NUMBER,
      to: formattedTo,
      body: message,
    });

    console.log(`WhatsApp message sent to ${to}, SID: ${messageResult.sid}`);
  } catch (error: any) {
    console.error('Error sending WhatsApp message:', error);
    // Don't throw - WhatsApp failures shouldn't break order creation
    // Just log the error
    if (error.code === 21211) {
      console.warn(`Invalid WhatsApp number: ${to}. Number may not be registered with WhatsApp.`);
    }
  }
}

/**
 * Send order confirmation WhatsApp message
 */
export async function sendOrderConfirmationWhatsApp(
  order: {
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    totalAmount: number | string;
    items: Array<{
      product: {
        name: string;
      };
      quantity: number;
      subtotal: number | string;
    }>;
    paymentMethod?: string;
    transactionId?: string;
  }
): Promise<void> {
  try {
    const itemsList = order.items
      .map((item, index) => `${index + 1}. ${item.product.name} x${item.quantity} - ৳${item.subtotal}`)
      .join('\n');

    const message = `🎉 Order Confirmation

Dear ${order.customerName},

Thank you for your purchase! Your order has been received.

📦 Order Number: ${order.orderNumber}
${order.paymentMethod ? `💳 Payment Method: ${order.paymentMethod}` : ''}
${order.transactionId ? `🔢 Transaction ID: ${order.transactionId}` : ''}

🛍️ Items Ordered:
${itemsList}

💰 Total Amount: ৳${order.totalAmount}

We will notify you once your order is confirmed and processed.

Thank you for choosing Softynix!`;

    await sendWhatsAppMessage(order.customerPhone, message);
  } catch (error: any) {
    console.error('Error sending order confirmation WhatsApp:', error);
    // Don't throw - WhatsApp failures shouldn't break order creation
  }
}

