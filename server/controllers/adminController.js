import { db } from '../config/db.js';
import bcrypt from 'bcryptjs';

// Live Database Statistics Calculation
export const getAdminStats = async (req, res) => {
  try {
    const allUsers = db.users.getAll();
    const members = allUsers.filter(u => u.role === 'member');
    const activeMembers = members.filter(u => u.membership && u.membership.status === 'active');
    
    // Calculate actual revenue from stored member payment records
    const totalRevenue = members.reduce((sum, u) => {
      return sum + (u.membership?.amountPaid || 0);
    }, 0);

    const allBookings = db.bookings.getAll();
    const upcomingBookings = allBookings.filter(b => b.status === 'Upcoming').length;
    const completedBookings = allBookings.filter(b => b.status === 'Completed').length;
    const cancelledBookings = allBookings.filter(b => b.status === 'Cancelled').length;

    const allClasses = db.classes.getAll();
    const totalCapacity = allClasses.reduce((sum, c) => sum + (c.capacity || 15), 0);
    const totalReserved = allClasses.reduce((sum, c) => sum + (c.reserved || 0), 0);
    const capacityUtilization = totalCapacity > 0 ? Math.round((totalReserved / totalCapacity) * 100) : 0;

    const trainersCount = db.trainers.getAll().length;
    const blogCount = db.blogPosts.getAll().length;
    const inquiriesCount = db.contactMessages.find(m => m.status === 'unread').length;

    res.status(200).json({
      success: true,
      stats: {
        totalMembers: members.length,
        activeMemberships: activeMembers.length,
        totalRevenue,
        totalBookings: allBookings.length,
        upcomingBookings,
        completedBookings,
        cancelledBookings,
        totalClasses: allClasses.length,
        capacityUtilization,
        totalTrainers: trainersCount,
        publishedArticles: blogCount,
        unreadInquiries: inquiriesCount
      }
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to calculate database statistics.' });
  }
};

// Member Management: List Members
export const getMembers = async (req, res) => {
  try {
    const users = db.users.getAll().filter(u => u.role === 'member');
    const safeUsers = users.map(({ password, ...u }) => u);
    res.status(200).json({ success: true, count: safeUsers.length, members: safeUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve members.' });
  }
};

// Member Management: Create Member
export const createMember = async (req, res) => {
  try {
    const { name, email, phone, password, planId, billingCycle } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password || 'password123', salt);

    const newMember = db.users.create({
      name,
      email: email.toLowerCase().trim(),
      phone: phone || '',
      password: hashedPassword,
      role: 'member',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      fitnessGoal: 'General Health & Conditioning',
      membership: {
        planId: planId || 'basic',
        planName: (planId || 'basic').toUpperCase(),
        billingCycle: billingCycle || 'monthly',
        status: 'active',
        startDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        amountPaid: planId === 'vip' ? 3499 : planId === 'premium' ? 1999 : 999
      },
      progress: []
    });

    const { password: _, ...safeUser } = newMember;
    res.status(201).json({ success: true, message: 'Member created successfully.', member: safeUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create member.' });
  }
};

// Member Management: Update Member
export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, fitnessGoal, membership } = req.body;
    
    const updates = {};
    if (name) updates.name = name;
    if (phone !== undefined) updates.phone = phone;
    if (fitnessGoal !== undefined) updates.fitnessGoal = fitnessGoal;
    if (membership) updates.membership = membership;

    const updated = db.users.findByIdAndUpdate(id, updates);
    if (!updated) return res.status(404).json({ success: false, message: 'Member not found.' });

    const { password: _, ...safeUser } = updated;
    res.status(200).json({ success: true, message: 'Member updated.', member: safeUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update member.' });
  }
};

// Member Management: Delete Member
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.users.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Member not found.' });

    res.status(200).json({ success: true, message: 'Member removed successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete member.' });
  }
};
