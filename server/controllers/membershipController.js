import crypto from 'crypto';
import { gymConfig } from '../config/gymConfig.js';
import { db } from '../config/db.js';

// Get Membership Tiers
export const getTiers = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      currency: gymConfig.currency,
      currencyCode: gymConfig.currencyCode,
      tiers: gymConfig.membershipTiers
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve membership tiers.' });
  }
};

// Create Membership Order
export const createOrder = async (req, res) => {
  try {
    const { tierId, billingCycle } = req.body; // billingCycle: 'monthly' | 'annual'
    const tier = gymConfig.membershipTiers.find(t => t.id === tierId);

    if (!tier) {
      return res.status(404).json({ success: false, message: 'Invalid membership tier selected.' });
    }

    const isAnnual = billingCycle === 'annual';
    const amount = isAnnual ? tier.annualPrice : tier.monthlyPrice;

    // Check if Razorpay keys are configured
    const isLiveRazorpay = Boolean(gymConfig.razorpayKeyId && gymConfig.razorpayKeySecret);

    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    res.status(200).json({
      success: true,
      order: {
        orderId,
        amount: amount * 100, // in paise
        displayAmount: amount,
        currency: gymConfig.currencyCode,
        tierId: tier.id,
        tierName: tier.name,
        billingCycle: isAnnual ? 'annual' : 'monthly',
        isSandbox: !isLiveRazorpay,
        razorpayKeyId: gymConfig.razorpayKeyId || 'rzp_test_placeholder_key'
      }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ success: false, message: 'Failed to initiate membership order.' });
  }
};

// Verify Payment & Activate Membership
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature, tierId, billingCycle } = req.body;
    const userId = req.user.id;

    const tier = gymConfig.membershipTiers.find(t => t.id === tierId);
    if (!tier) {
      return res.status(400).json({ success: false, message: 'Invalid membership plan.' });
    }

    const isAnnual = billingCycle === 'annual';
    const amount = isAnnual ? tier.annualPrice : tier.monthlyPrice;

    // If live keys exist, verify HMAC SHA256 signature
    if (gymConfig.razorpayKeySecret && signature) {
      const generatedSignature = crypto
        .createHmac('sha256', gymConfig.razorpayKeySecret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      if (generatedSignature !== signature) {
        return res.status(400).json({ success: false, message: 'Payment verification failed: Invalid signature.' });
      }
    }

    // Calculate dates
    const startDate = new Date();
    const expiryDate = new Date();
    if (isAnnual) {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else {
      expiryDate.setDate(expiryDate.getDate() + 30);
    }

    const membershipData = {
      planId: tier.id,
      planName: tier.name,
      billingCycle: isAnnual ? 'annual' : 'monthly',
      status: 'active',
      startDate: startDate.toISOString().split('T')[0],
      expiryDate: expiryDate.toISOString().split('T')[0],
      amountPaid: amount,
      paymentId: paymentId || `pay_mock_${Date.now()}`
    };

    // Update member record
    const updatedUser = db.users.findByIdAndUpdate(userId, { membership: membershipData });
    const { password, ...safeUser } = updatedUser;

    res.status(200).json({
      success: true,
      message: `Congratulations! Your ${tier.name} membership is now active.`,
      membership: membershipData,
      user: safeUser
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ success: false, message: 'Payment verification failed on server.' });
  }
};
