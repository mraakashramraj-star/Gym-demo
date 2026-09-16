import { db } from '../config/db.js';

// Handle Contact Form Submission
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide your name, email, and message.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const newMessage = db.contactMessages.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message: message.trim(),
      status: 'unread'
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. Our team will contact you within 24 business hours.',
      inquiryId: newMessage.id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit contact message.' });
  }
};

// Handle Newsletter Subscription
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = db.newsletterSubscribers.findOne(s => s.email === cleanEmail);

    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed to our performance newsletter!'
      });
    }

    db.newsletterSubscribers.create({
      email: cleanEmail,
      subscribedAt: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      message: 'Subscribed successfully! Check your inbox for exclusive workout and nutrition guides.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to subscribe.' });
  }
};

// Get Gallery Images with optional category filter
export const getGallery = async (req, res) => {
  try {
    const { category } = req.query;
    let gallery = db.gallery.getAll();

    if (category && category !== 'All') {
      gallery = gallery.filter(g => g.category.toLowerCase() === category.toLowerCase());
    }

    res.status(200).json({ success: true, count: gallery.length, gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve gallery images.' });
  }
};

// Get Testimonials (Authentic placeholder reviews)
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = db.testimonials.getAll();
    res.status(200).json({ success: true, count: testimonials.length, testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve testimonials.' });
  }
};
