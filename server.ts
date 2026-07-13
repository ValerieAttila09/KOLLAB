import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'kollab_secret_key_12345';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(express.json());

// Initialize Prisma
const prisma = new PrismaClient();

// Connect test to database and seed sample events
async function initializeDatabase() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to the database.');
    
    // Check if we need to seed events
    const eventCount = await prisma.event.count();
    if (eventCount === 0) {
      console.log('No events found in database. Seeding sample events...');
      const sampleEvents = [
        {
          title: 'KOLLAB Tech Summit 2026',
          description: 'Join us for the biggest tech conference in the region, bringing together innovators, developers, and industry leaders to discuss the future of collaboration, AI, and developer tools.',
          date: new Date('2026-08-15T09:00:00Z'),
          location: 'KOLLAB Innovation Hub, Jakarta & Online',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60'
        },
        {
          title: 'AI & Web Development Workshop',
          description: 'A hands-on coding workshop on building agentic AI web applications. Learn how to integrate LLMs, databases, and authentication systems using React, Vite, and Prisma.',
          date: new Date('2026-08-22T13:00:00Z'),
          location: 'KOLLAB Meeting Room A & Zoom',
          image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60'
        },
        {
          title: 'Developer Networking Night',
          description: 'An evening of casual networking, tech talks, and sharing ideas with the KOLLAB community. Free drinks and snacks provided!',
          date: new Date('2026-09-05T18:30:00Z'),
          location: 'The Rooftop Lounge, Jakarta',
          image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60'
        },
        {
          title: 'Startup Pitch & Mentorship Program',
          description: 'Pitch your startup idea to top VCs and receive 1-on-1 mentorship from industry veterans. Part of the KOLLAB Ecosystem Acceleration Program.',
          date: new Date('2026-09-19T10:00:00Z'),
          location: 'KOLLAB Seminar Room',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60'
        }
      ];

      await prisma.event.createMany({
        data: sampleEvents
      });
      console.log('Sample events seeded successfully.');
    }
  } catch (error) {
    console.error('\n======================================================');
    console.error('DATABASE CONNECTION ERROR:');
    console.error('Could not connect to the database via Prisma.');
    console.error('Please make sure you have:');
    console.error('1. Set the correct DATABASE_URL in the .env file.');
    console.error('2. Run: npx prisma db push (to push the schema to the database).');
    console.error('======================================================\n');
  }
}

// Nodemailer SMTP Transporter setup
let transporterPromise: Promise<nodemailer.Transporter> | null = null;

const getTransporter = async (): Promise<nodemailer.Transporter> => {
  if (transporterPromise) return transporterPromise;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    console.log('Using configured SMTP provider.');
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });
    transporterPromise = Promise.resolve(transporter);
    return transporter;
  } else {
    console.log('No SMTP configuration in .env. Creating temporary Ethereal test SMTP account...');
    transporterPromise = nodemailer.createTestAccount().then(testAccount => {
      console.log('======================================================');
      console.log('ETHEREAL MOCK SMTP ACCOUNT DETAILS:');
      console.log(`User: ${testAccount.user}`);
      console.log(`Pass: ${testAccount.pass}`);
      console.log('All email confirmations will print links in the terminal.');
      console.log('======================================================');
      return nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    });
    return transporterPromise;
  }
};

// Middleware to protect routes with JWT auth
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication token is required.' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired authentication token.' });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/signup', async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields (name, email, password) are required.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'An error occurred during sign up.' });
  }
});

app.post('/api/auth/login', async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
});

app.get('/api/auth/me', authenticateToken, async (req: any, res: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(500).json({ error: 'An error occurred fetching user profile.' });
  }
});

// Event Routes
app.get('/api/events', async (req: any, res: any) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' }
    });
    res.json(events);
  } catch (error) {
    console.error('Fetch events error:', error);
    res.status(500).json({ error: 'Failed to retrieve events.' });
  }
});

// RSVP Routes
app.post('/api/rsvp', authenticateToken, async (req: any, res: any) => {
  try {
    const { eventId, email, name, phone, notes } = req.body;

    if (!eventId || !email || !name || !phone) {
      return res.status(400).json({ error: 'Required fields: eventId, email, name, phone.' });
    }

    const event = await prisma.event.findUnique({ where: { id: Number(eventId) } });
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    // Check if user already RSVP'd
    const existingRsvp = await prisma.rSVP.findUnique({
      where: {
        userId_eventId: {
          userId: req.user.id,
          eventId: Number(eventId)
        }
      }
    });

    if (existingRsvp) {
      return res.status(400).json({ 
        error: `You have already RSVP'd for this event. Status: ${existingRsvp.status}` 
      });
    }

    const token = crypto.randomUUID();

    // Create pending RSVP
    const newRsvp = await prisma.rSVP.create({
      data: {
        userId: req.user.id,
        eventId: Number(eventId),
        email,
        name,
        phone,
        notes,
        status: 'PENDING',
        token
      }
    });

    // Send confirmation email
    const transporter = await getTransporter();
    const confirmLink = `${CLIENT_URL}/api/rsvp/confirm?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"KOLLAB RSVP" <rsvp@kollab.com>',
      to: email,
      subject: `Confirm Your RSVP: ${event.title}`,
      html: `
        <div style="font-family: 'Satoshi', 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #0F172A; margin-bottom: 20px;">Confirm Your RSVP for ${event.title}</h2>
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">Hello <strong>${name}</strong>,</p>
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">Thank you for registering to attend <strong>${event.title}</strong>. To complete your RSVP, please confirm your email address by clicking the button below:</p>
          
          <div style="text-align: center; margin: 35px 0;">
            <a href="${confirmLink}" style="background: linear-gradient(135deg, #34B26A 0%, #21A6A6 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 9999px; font-weight: 500; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(52, 178, 106, 0.25);">Confirm My RSVP</a>
          </div>

          <div style="background-color: #F8FAFC; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h4 style="margin-top: 0; color: #0F172A; margin-bottom: 10px;">Event Details</h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #475569;">
              <tr>
                <td style="padding: 4px 0; font-weight: bold; width: 100px;">Location:</td>
                <td style="padding: 4px 0;">${event.location}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: bold;">Date:</td>
                <td style="padding: 4px 0;">${new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: bold;">Time:</td>
                <td style="padding: 4px 0;">${new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
              </tr>
            </table>
          </div>

          <p style="color: #64748B; font-size: 14px; line-height: 1.6;">If the button above does not work, copy and paste the following link into your browser:</p>
          <p style="color: #2777C9; font-size: 14px; word-break: break-all;"><a href="${confirmLink}">${confirmLink}</a></p>
          
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          <p style="color: #94A3B8; font-size: 12px; text-align: center;">This is an automated email from KOLLAB. If you did not make this request, you can safely ignore this email.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`RSVP Email sent. MessageId: ${info.messageId}`);
    
    // Log the link in console for easy development/testing
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log('\n----------------------------------------');
    console.log('RSVP CONFIRMATION EMAIL LOGGED:');
    console.log(`To: ${email}`);
    console.log(`Confirm Link: ${confirmLink}`);
    if (previewUrl) {
      console.log(`Ethereal Email Preview URL: ${previewUrl}`);
    }
    console.log('----------------------------------------\n');

    res.status(201).json({ 
      message: 'RSVP submitted successfully. Please check your email to confirm.',
      rsvpId: newRsvp.id,
      previewUrl: previewUrl || null
    });
  } catch (error) {
    console.error('RSVP submission error:', error);
    res.status(500).json({ error: 'Failed to submit RSVP.' });
  }
});

// Confirm RSVP Endpoint
app.get('/api/rsvp/confirm', async (req: any, res: any) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send('<h1>Error</h1><p>Confirmation token is missing.</p>');
    }

    const rsvp = await prisma.rSVP.findUnique({
      where: { token: String(token) }
    });

    if (!rsvp) {
      return res.status(404).send('<h1>Not Found</h1><p>Invalid or expired RSVP token.</p>');
    }

    if (rsvp.status === 'CONFIRMED') {
      // Already confirmed, just redirect to dashboard
      return res.redirect(`${CLIENT_URL}/dashboard?rsvp_confirmed=already`);
    }

    // Update status to CONFIRMED
    await prisma.rSVP.update({
      where: { id: rsvp.id },
      data: { status: 'CONFIRMED' }
    });

    console.log(`RSVP ID ${rsvp.id} successfully confirmed via email token.`);

    // Redirect to client dashboard
    res.redirect(`${CLIENT_URL}/dashboard?rsvp_confirmed=true`);
  } catch (error) {
    console.error('RSVP confirmation error:', error);
    res.status(500).send('<h1>Server Error</h1><p>Failed to confirm RSVP.</p>');
  }
});

// Get user's RSVP list (dashboard data)
app.get('/api/user/rsvps', authenticateToken, async (req: any, res: any) => {
  try {
    const rsvps = await prisma.rSVP.findMany({
      where: { userId: req.user.id },
      include: {
        event: true
      }
    });
    res.json(rsvps);
  } catch (error) {
    console.error('Fetch user RSVPs error:', error);
    res.status(500).json({ error: 'Failed to retrieve your RSVPs.' });
  }
});

// Start Server
app.listen(PORT, async () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  await initializeDatabase();
});
