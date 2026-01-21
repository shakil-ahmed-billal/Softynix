import nodemailer from 'nodemailer';
import 'dotenv/config';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(
  order: {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    totalAmount: number | string;
    items: Array<{
      product: {
        name: string;
        image?: string | null;
      };
      quantity: number;
      price: number | string;
      subtotal: number | string;
    }>;
    paymentMethod?: string;
    transactionId?: string;
  }
): Promise<void> {
  try {
    const itemsHtml = order.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong>${item.product.name}</strong>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
          ৳${item.price}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
          ৳${item.subtotal}
        </td>
      </tr>
    `
      )
      .join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .order-details { background-color: white; padding: 20px; margin: 20px 0; border-radius: 5px; }
          table { width: 100%; border-collapse: collapse; }
          th { background-color: #f5f5f5; padding: 10px; text-align: left; }
          .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
          </div>
          <div class="content">
            <p>Dear ${order.customerName},</p>
            <p>Thank you for your purchase! Your order has been received and is being processed.</p>
            
            <div class="order-details">
              <h2>Order Details</h2>
              <p><strong>Order Number:</strong> ${order.orderNumber}</p>
              ${order.paymentMethod ? `<p><strong>Payment Method:</strong> ${order.paymentMethod}</p>` : ''}
              ${order.transactionId ? `<p><strong>Transaction ID:</strong> ${order.transactionId}</p>` : ''}
              
              <h3>Items Ordered</h3>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th style="text-align: center;">Quantity</th>
                    <th style="text-align: right;">Price</th>
                    <th style="text-align: right;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
              
              <div class="total">
                <p>Total Amount: ৳${order.totalAmount}</p>
              </div>
            </div>
            
            <p>We will send you another email once your order is confirmed and processed.</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Softynix. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Softynix" <${process.env.SMTP_USER}>`,
      to: order.customerEmail,
      subject: `Order Confirmation - ${order.orderNumber}`,
      html: htmlContent,
      text: `
        Order Confirmation
        
        Dear ${order.customerName},
        
        Thank you for your purchase! Your order has been received.
        
        Order Number: ${order.orderNumber}
        ${order.paymentMethod ? `Payment Method: ${order.paymentMethod}` : ''}
        ${order.transactionId ? `Transaction ID: ${order.transactionId}` : ''}
        
        Items Ordered:
        ${order.items.map((item) => `- ${item.product.name} x${item.quantity} - ৳${item.subtotal}`).join('\n')}
        
        Total Amount: ৳${order.totalAmount}
        
        We will send you another email once your order is confirmed.
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${order.customerEmail}`);
  } catch (error: any) {
    console.error('Error sending order confirmation email:', error);
    // Don't throw - email failures shouldn't break order creation
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

/**
 * Send generic email
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string
): Promise<void> {
  try {
    const mailOptions = {
      from: `"Softynix" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error: any) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

