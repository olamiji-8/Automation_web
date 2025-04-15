import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();
    
    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    // Email content
    const mailOptions = {
      from: `"AutomatePro Contact" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d53f8c; margin-bottom: 20px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-line;">${message}</p>
          </div>
        </div>
      `,
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Send confirmation email to user
    const confirmationMailOptions = {
      from: `"AutomatePro" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Thank you for contacting AutomatePro',
      text: `
        Dear ${name},
        
        Thank you for reaching out to AutomatePro. We've received your message and our team will get back to you shortly.
        
        Best regards,
        The AutomatePro Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d53f8c; margin-bottom: 20px;">Thank You for Contacting Us</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for reaching out to AutomatePro. We've received your message and our team will get back to you shortly.</p>
          
          <p>Best regards,<br>The AutomatePro Team</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #718096; font-size: 14px;">
              © ${new Date().getFullYear()} AutomatePro. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };
    
    await transporter.sendMail(confirmationMailOptions);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}