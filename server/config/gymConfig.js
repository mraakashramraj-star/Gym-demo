// Centralized Gym Configuration
// Easily edit gym branding, contact details, working hours, and pricing tiers here.

export const gymConfig = {
  // Brand Identity (Default placeholder as requested)
  name: process.env.GYM_NAME || "[GYM NAME]",
  brandFallback: "IRONPULSE ATHLETIC CLUB",
  tagline: "TRAIN HARD. LIVE STRONG.",
  subheading: "Premium training, expert coaching and a community built to help you reach your goals.",
  
  // Contact & Location
  location: "[CITY, STATE]",
  address: "[GYM ADDRESS]",
  phone: "[PHONE NUMBER]",
  email: "[EMAIL ADDRESS]",
  
  // Realistic Fallbacks if placeholder is kept:
  displayDetails: {
    addressFormatted: "108 Olympic Blvd, Metro Fitness District, [CITY, STATE] 560001",
    phoneFormatted: "+91 98765 43210",
    emailFormatted: "info@gymbrand.com",
    coordinates: {
      lat: 12.9716,
      lng: 77.5946
    }
  },

  // Operating Hours
  hours: {
    weekdays: "05:00 AM — 11:00 PM",
    saturday: "06:00 AM — 10:00 PM",
    sunday: "07:00 AM — 08:00 PM"
  },

  // Currency & Payment Gateway
  currency: "₹",
  currencyCode: "INR",
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || "",
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || "",

  // Pricing Tiers (Placeholder prices as specified: 999, 1999, 3499)
  membershipTiers: [
    {
      id: "basic",
      name: "BASIC",
      monthlyPrice: 999,
      annualPrice: 9990,
      description: "Essential access to world-class gym facilities and cardio arena.",
      popular: false,
      badge: "Standard Access",
      features: [
        "Full gym floor & cardio floor access",
        "Standard locker room & shower access",
        "1 Free fitness assessment & orientation",
        "Free mobile app access for workout tracking",
        "Water station & hydration lounge",
        "Access during off-peak and peak hours"
      ],
      notIncluded: [
        "Group studio classes (HIIT, Yoga, Zumba)",
        "Personal trainer consultation",
        "Sauna & steam recovery suite",
        "Free guest passes"
      ]
    },
    {
      id: "premium",
      name: "PREMIUM",
      monthlyPrice: 1999,
      annualPrice: 19990,
      description: "Complete fitness package with unlimited studio classes and recovery perks.",
      popular: true,
      badge: "Most Popular",
      features: [
        "All Basic Tier privileges",
        "Unlimited group classes (HIIT, Yoga, Strength, Zumba)",
        "Advanced body composition analysis every month",
        "1 Monthly 1-on-1 Personal Trainer session",
        "Infrared sauna & steam room access",
        "2 Free guest passes per month",
        "Priority online class booking window (7 days ahead)"
      ],
      notIncluded: [
        "Dedicated VIP locker with private towel service",
        "Weekly custom diet & nutrition plan"
      ]
    },
    {
      id: "vip",
      name: "VIP",
      monthlyPrice: 3499,
      annualPrice: 34990,
      description: "The ultimate elite training experience with bespoke coaching & recovery.",
      popular: false,
      badge: "Elite Experience",
      features: [
        "All Premium Tier privileges",
        "4 Monthly 1-on-1 Personal Training sessions",
        "Custom weekly diet & macro-nutrient counseling",
        "Reserved VIP locker & complimentary laundry service",
        "Full recovery lounge access (cryo & percussive therapy)",
        "Unlimited guest passes (1 per visit)",
        "Exclusive VIP member events and masterclasses",
        "24/7 Concierge fitness & schedule support"
      ],
      notIncluded: []
    }
  ],

  // Social Links
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com"
  }
};
