// Unified Gym Configuration
// Central single file to edit Gym Name, Tagline, Location, Contact, and Pricing.

export const gymConfig = {
  // Brand Identity (Use "[GYM NAME]" by default, or brand fallback if desired)
  name: "[GYM NAME]",
  brandDisplayName: "APEX ATHLETIC", // High-end visual moniker or "[GYM NAME]"
  tagline: "TRAIN HARD. LIVE STRONG.",
  subheading: "Premium training, expert coaching and a community built to help you reach your goals.",

  // Contact Details
  location: "[CITY, STATE]",
  address: "[GYM ADDRESS]",
  phone: "[PHONE NUMBER]",
  email: "[EMAIL ADDRESS]",

  // Formatted display values (for realistic aesthetic demonstration)
  displayDetails: {
    addressFormatted: "108 Olympic Blvd, Metro Fitness District, [CITY, STATE] 560001",
    phoneFormatted: "+91 98765 43210",
    emailFormatted: "contact@gymbrand.com",
    hoursWeekday: "05:00 AM — 11:00 PM",
    hoursSaturday: "06:00 AM — 10:00 PM",
    hoursSunday: "07:00 AM — 08:00 PM"
  },

  // Currency
  currency: "₹",
  currencyCode: "INR",

  // Pricing Tiers (Easily editable here)
  pricing: [
    {
      id: "basic",
      name: "BASIC",
      monthlyPrice: 999,
      annualPrice: 9990,
      description: "Essential gym floor access, cardio equipment, and locker rooms.",
      popular: false,
      badge: "Standard",
      features: [
        "Full gym floor & cardio arena access",
        "Locker room & high-pressure showers",
        "Complimentary fitness orientation session",
        "Mobile app access for workout logging",
        "Free high-speed member Wi-Fi & hydration lounge"
      ],
      notIncluded: [
        "Unlimited group classes (HIIT, Yoga, Zumba)",
        "Personal trainer consultation",
        "Sauna & recovery suite",
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
        "All Basic tier amenities included",
        "Unlimited studio classes (HIIT, Yoga, Strength, Zumba)",
        "Monthly 1-on-1 Personal Trainer consultation",
        "Infrared sauna & steam room access",
        "Monthly 3D body composition analysis",
        "2 Free guest passes every month",
        "Priority class booking (7 days in advance)"
      ],
      notIncluded: [
        "Reserved VIP locker with laundry service",
        "Weekly custom dietitian meal blueprint"
      ]
    },
    {
      id: "vip",
      name: "VIP",
      monthlyPrice: 3499,
      annualPrice: 34990,
      description: "The ultimate elite athletic experience with dedicated coaching and full recovery.",
      popular: false,
      badge: "Elite Access",
      features: [
        "All Premium tier privileges included",
        "4 Monthly 1-on-1 Personal Training sessions",
        "Custom weekly nutrition & macro coaching",
        "Reserved VIP locker & laundry service",
        "Full recovery lounge access (cryo & percussive therapy)",
        "Unlimited guest passes (1 guest per workout)",
        "Exclusive VIP workshops and masterclasses",
        "24/7 Concierge coaching & priority support"
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
