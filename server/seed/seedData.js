import bcrypt from 'bcryptjs';

export const getSeedData = () => {
  const salt = bcrypt.genSaltSync(10);
  const adminPasswordHash = bcrypt.hashSync('admin123', salt);
  const memberPasswordHash = bcrypt.hashSync('member123', salt);

  const users = [
    {
      id: 'usr-admin-01',
      name: 'Gym Administrator',
      email: 'admin@gym.com',
      phone: '+91 98765 00001',
      password: adminPasswordHash,
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      createdAt: '2026-01-01T08:00:00.000Z'
    },
    {
      id: 'usr-member-01',
      name: 'Rohan Sharma',
      email: 'member@gym.com',
      phone: '+91 98765 12345',
      password: memberPasswordHash,
      role: 'member',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      fitnessGoal: 'Hypertrophy & Athletic Endurance',
      emergencyContact: {
        name: 'Priya Sharma',
        phone: '+91 98765 54321',
        relation: 'Spouse'
      },
      membership: {
        planId: 'premium',
        planName: 'PREMIUM',
        billingCycle: 'monthly',
        status: 'active',
        startDate: '2026-08-01',
        expiryDate: '2026-10-01',
        amountPaid: 1999
      },
      progress: [
        { date: '2026-06-01', weight: 82.5, bodyFat: 21.0, chest: 102, waist: 88, arms: 37 },
        { date: '2026-07-01', weight: 80.8, bodyFat: 19.5, chest: 103, waist: 86, arms: 37.5 },
        { date: '2026-08-01', weight: 79.2, bodyFat: 18.2, chest: 104, waist: 84, arms: 38 },
        { date: '2026-09-01', weight: 77.8, bodyFat: 17.0, chest: 105, waist: 82, arms: 38.5 }
      ],
      createdAt: '2026-06-01T10:00:00.000Z'
    },
    {
      id: 'usr-member-02',
      name: 'Ananya Verma',
      email: 'ananya@gym.com',
      phone: '+91 98765 99887',
      password: memberPasswordHash,
      role: 'member',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      fitnessGoal: 'Functional Mobility & Stress Reduction',
      membership: {
        planId: 'vip',
        planName: 'VIP',
        billingCycle: 'annual',
        status: 'active',
        startDate: '2026-01-15',
        expiryDate: '2027-01-15',
        amountPaid: 34990
      },
      progress: [
        { date: '2026-05-01', weight: 64.0, bodyFat: 25.0, chest: 88, waist: 74, arms: 27 },
        { date: '2026-07-01', weight: 61.5, bodyFat: 23.0, chest: 87, waist: 71, arms: 27.5 },
        { date: '2026-09-01', weight: 59.8, bodyFat: 21.5, chest: 87, waist: 68, arms: 28 }
      ],
      createdAt: '2026-01-15T09:30:00.000Z'
    },
    {
      id: 'usr-member-03',
      name: 'Vikram Sengupta',
      email: 'vikram@gym.com',
      phone: '+91 98765 33221',
      password: memberPasswordHash,
      role: 'member',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      fitnessGoal: 'Powerlifting & Raw Strength',
      membership: {
        planId: 'basic',
        planName: 'BASIC',
        billingCycle: 'monthly',
        status: 'active',
        startDate: '2026-09-01',
        expiryDate: '2026-10-01',
        amountPaid: 999
      },
      progress: [
        { date: '2026-08-01', weight: 89.0, bodyFat: 22.0, chest: 108, waist: 92, arms: 40 },
        { date: '2026-09-01', weight: 88.2, bodyFat: 20.8, chest: 109, waist: 90, arms: 40.5 }
      ],
      createdAt: '2026-08-10T11:00:00.000Z'
    }
  ];

  const trainers = [
    {
      id: 'trn-01',
      slug: 'alex-vance',
      name: 'Alex Vance',
      role: 'Head of Performance & HIIT Specialist',
      experience: '9+ Years',
      photo: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
      cover: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      specialties: ['HIIT & Conditioning', 'Metabolic Acceleration', 'Athletic Movement', 'VO2 Max Training'],
      certifications: ['CSCS (Certified Strength & Conditioning Specialist)', 'ACE Master Trainer', 'CPR/AED Red Cross'],
      bio: 'Former collegiate sprinter and conditioning coach specializing in high-velocity power development and rapid fat loss protocols.',
      philosophy: 'Intensity without intention is just fatigue. We train with measurable purpose every single session.',
      availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday']
    },
    {
      id: 'trn-02',
      slug: 'sarah-jenkins',
      name: 'Sarah Jenkins',
      role: 'Master Yoga & Mobility Director',
      experience: '8+ Years',
      photo: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
      cover: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
      specialties: ['Vinyasa & Power Yoga', 'Myofascial Release', 'Joint Mobility', 'Breathwork & Recovery'],
      certifications: ['RYT 500 Yoga Alliance', 'FRC Mobility Specialist', 'Pilates Mat Certification'],
      bio: 'Dedicated to helping heavy lifters and busy professionals unlock pain-free ranges of motion, balance nervous system stress, and enhance posture.',
      philosophy: 'True strength is having full control throughout your entire joint articulation under load.',
      availableDays: ['Tuesday', 'Thursday', 'Saturday', 'Sunday']
    },
    {
      id: 'trn-03',
      slug: 'david-kovacs',
      name: 'David Kovacs',
      role: 'Senior Strength & Hypertrophy Coach',
      experience: '11+ Years',
      photo: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
      cover: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      specialties: ['Compound Barbell Lifts', 'Bodybuilding Physique Prep', 'Biomechanics', 'Strength Periodization'],
      certifications: ['NSCA-CPT', 'USA Powerlifting Club Coach Level 2', 'Precision Nutrition L1'],
      bio: 'Competitive powerlifter with over a decade of coaching national medalists, transformation athletes, and foundational lifters.',
      philosophy: 'Respect the progressive overload principle. Show up, log your numbers, execute with clinical form.',
      availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday']
    },
    {
      id: 'trn-04',
      slug: 'maya-patel',
      name: 'Maya Patel',
      role: 'Functional Conditioning & Zumba Lead',
      experience: '7+ Years',
      photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      cover: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=1200&q=80',
      specialties: ['Zumba & Dance Fitness', 'Kettlebell Athletics', 'Core Stabilization', 'Agility Drills'],
      certifications: ['ZIN Certified Zumba Master', 'StrongFirst SFG I', 'ISSA Elite Fitness Trainer'],
      bio: 'Blends rhythm, explosive cardiovascular energy, and functional movement to create electric studio environments that ignite stamina.',
      philosophy: 'Movement should be exhilarating and challenging. When you enjoy the burn, consistency becomes effortless.',
      availableDays: ['Monday', 'Wednesday', 'Friday', 'Sunday']
    },
    {
      id: 'trn-05',
      slug: 'marcus-chen',
      name: 'Marcus Chen',
      role: 'Lead Physiotherapist & Recovery Specialist',
      experience: '10+ Years',
      photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80',
      cover: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
      specialties: ['Sports Injury Rehab', 'Postural Restoration', 'Dry Needling', 'Kinetic Chain Re-education'],
      certifications: ['Doctor of Physical Therapy (DPT)', 'CSCS', 'Active Release Techniques (ART)'],
      bio: 'Bridges the gap between clinical rehabilitation and high-level athletic performance, ensuring members recover faster and train pain-free.',
      philosophy: 'Do not just treat the symptom—identify the breakdown in the kinetic chain and rebuild it stronger.',
      availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday']
    },
    {
      id: 'trn-06',
      slug: 'elena-rostova',
      name: 'Elena Rostova',
      role: 'Clinical Sports Nutritionist & Dietitian',
      experience: '8+ Years',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      cover: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
      specialties: ['Macronutrient Periodization', 'Body Recomposition', 'Gut Health & Digestion', 'Competition Dietetics'],
      certifications: ['Registered Dietitian (RD)', 'ISSN Certified Sports Nutritionist (CISSN)', 'Precision Nutrition L2'],
      bio: 'Evidence-based nutritionist turning complex bioenergetics into sustainable, delicious, real-world nutrition systems.',
      philosophy: 'You cannot out-train chronic nutritional dysfunction. Fuel for performance and the aesthetic follows.',
      availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday']
    }
  ];

  const programs = [
    {
      id: 'prg-01',
      slug: 'personal-training',
      title: 'Personal Training',
      category: '1-on-1 Coaching',
      icon: 'UserCheck',
      tagline: 'Customized 1-on-1 coaching designed around your physiological blueprint.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=80',
      description: 'Our bespoke personal training program pairs you with an elite performance coach. We begin with a complete kinetic movement screen, postural evaluation, and metabolic goal audit to engineer a periodized program that guarantees results.',
      benefits: [
        'Comprehensive 3D kinetic body movement and mobility screen',
        'Custom progressive training protocol updated every 4 weeks',
        'Real-time form correction to ensure injury-free maximal output',
        'Integrated macronutrient and supplement guidelines',
        'Bi-weekly DEXA body composition and caliper measurements',
        'Flexible 1-on-1 scheduling with elite certified trainers'
      ],
      process: [
        { step: '01', title: 'Physiological Assessment', desc: 'Screening mobility, baseline strength, cardiovascular stamina, and injury history.' },
        { step: '02', title: 'Bespoke Program Architecture', desc: 'Custom tailored weekly split designed specifically for your schedule and physiology.' },
        { step: '03', title: 'High-Impact Coaching', desc: 'Intensive 60-minute private sessions pushing peak efficiency and precise mechanics.' },
        { step: '04', title: 'Continuous Re-evaluation', desc: 'Data-driven progressive overload logging and monthly biometric reviews.' }
      ],
      targetAudience: 'Ideal for executives, competitive lifters, post-rehab athletes, and beginners who require focused accountability.',
      leadTrainer: 'David Kovacs'
    },
    {
      id: 'prg-02',
      slug: 'group-classes',
      title: 'Group Classes',
      category: 'Studio Fitness',
      icon: 'Users',
      tagline: 'Electrifying team energy led by charismatic master trainers.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
      description: 'Experience the kinetic power of training in a like-minded tribe. Our curated studio classes fuse heart-thumping soundscapes, high-definition lighting, and structured interval protocols to elevate stamina and camaraderie.',
      benefits: [
        'Dynamic team atmosphere that propels you beyond personal limits',
        'Varied workouts targeting cardiovascular, core, and functional power',
        'Expert instructor modifications for every fitness background',
        'World-class acoustic sound and synchronized studio lighting',
        'Seamless weekly app reservation system with guaranteed spots'
      ],
      process: [
        { step: '01', title: 'Reserve Online', desc: 'Claim your slot instantly via the schedule timetable up to 7 days ahead.' },
        { step: '02', title: 'Dynamic Warmup', desc: '10-minute nervous system priming and active joint mobility.' },
        { step: '03', title: 'The Main Protocol', desc: '40-minute high-energy circuits, partner intervals, and tempo sets.' },
        { step: '04', title: 'Guided Downregulation', desc: 'Static stretching and breathwork cooldown to kickstart recovery.' }
      ],
      targetAudience: 'Anyone who thrives on group accountability, motivating music, and high-energy community fitness.',
      leadTrainer: 'Alex Vance'
    },
    {
      id: 'prg-03',
      slug: 'yoga',
      title: 'Yoga & Mindful Mobility',
      category: 'Mind & Body',
      icon: 'Flower2',
      tagline: 'Balance intensity with deliberate flexibility, breath control, and joint resilience.',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80',
      description: 'A sanctuary within the gym. Our yoga and mobility sequences are specifically designed to counteract the tightness of heavy lifting, desk ergonomics, and everyday chronic stress.',
      benefits: [
        'Restores full active joint range of motion and spinal decompression',
        'Balances sympathetic nervous system overload via pranayama breathwork',
        'Strengthens deep intrinsic stabilizer muscles and improves balance',
        'Infrared heated studio options for deep tissue warm-up',
        'Reduces chronic lower back tension and shoulder impingement risks'
      ],
      process: [
        { step: '01', title: 'Centering & Breath', desc: 'Box breathing and somatic awareness to disconnect from the daily grind.' },
        { step: '02', title: 'Fluid Vinyasa Flow', desc: 'Progressive movement chains synchronizing breath with athletic poses.' },
        { step: '03', title: 'Deep Fascial Holds', desc: 'Targeted yin stretches held under relaxed tension to loosen connective tissue.' },
        { step: '04', title: 'Savasana Restoration', desc: 'Deep guided meditative stillness leaving you grounded and recharged.' }
      ],
      targetAudience: 'Lifters seeking injury prevention, runners needing hip opening, and professionals managing stress.',
      leadTrainer: 'Sarah Jenkins'
    },
    {
      id: 'prg-04',
      slug: 'hiit',
      title: 'HIIT & Metabolic Conditioning',
      category: 'Cardio & Stamina',
      icon: 'Flame',
      tagline: 'Torch calories, build unshakeable endurance, and ignite your afterburn.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
      description: 'High-Intensity Interval Training engineered using scientifically validated work-to-rest ratios. Maximize EPOC (Excess Post-Exercise Oxygen Consumption) to elevate your metabolic rate for hours post-session.',
      benefits: [
        'Maximum calorie expenditure in 45 focused minutes',
        'Boosts anaerobic threshold and cardiovascular VO2 max',
        'Uses SkiErgs, assault bikes, kettlebells, and plyometrics',
        'Preserves lean muscle mass while accelerating fat oxidation',
        'Heart rate monitoring tracking real-time exertion zones'
      ],
      process: [
        { step: '01', title: 'Cardiac Calibration', desc: 'Heart rate sync and movement prep to prime circulatory capacity.' },
        { step: '02', title: 'Station Rotations', desc: 'Alternating high-torque compound movements and cardio erg sprints.' },
        { step: '03', title: 'Tabata Finisher', desc: '8 rounds of 20s all-out power followed by 10s recovery.' },
        { step: '04', title: 'Metabolic Flush', desc: 'Active aerobic cooldown clearing lactic accumulation.' }
      ],
      targetAudience: 'Members aiming for rapid fat reduction, athletic stamina, and time-efficient high-sweat training.',
      leadTrainer: 'Alex Vance'
    },
    {
      id: 'prg-05',
      slug: 'zumba',
      title: 'Zumba & Rhythm Cardio',
      category: 'Dance Fitness',
      icon: 'Music',
      tagline: 'High-octane Latin and world rhythms that turn cardio into a celebration.',
      image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=1000&q=80',
      description: 'Ditch the mundane treadmill routine and join the dance party. Zumba combines Latin rhythms with interval cardio for an exhilarating full-body workout that burns up to 600 calories an hour.',
      benefits: [
        'High-energy social dance workout that never feels like a chore',
        'Full-body toning with special emphasis on core and lower body',
        'Enhances coordination, agility, and cardiovascular health',
        'Accessible for all rhythm skill levels—pure fun and freedom',
        'Releases endorphins and dramatically reduces cortisol'
      ],
      process: [
        { step: '01', title: 'Rhythm Warmup', desc: 'Easy footwork patterns warming up ankles, calves, and hips.' },
        { step: '02', title: 'Latin & Urban Beats', desc: 'Progressive choreography fusing Salsa, Reggaeton, Merengue, and Cumbia.' },
        { step: '03', title: 'Tempo Intervals', desc: 'Alternating fast and slow tempo tracks for peak cardio conditioning.' },
        { step: '04', title: 'Celebration Cooldown', desc: 'Gentle rhythmic stretches leaving you smiling and revitalized.' }
      ],
      targetAudience: 'Anyone seeking a fun, upbeat, non-intimidating way to torch calories and connect with peers.',
      leadTrainer: 'Maya Patel'
    },
    {
      id: 'prg-06',
      slug: 'strength-training',
      title: 'Strength & Powerlifting',
      category: 'Heavy Lifting',
      icon: 'Dumbbell',
      tagline: 'Master the barbell, build unbreakable bone density, and lift heavier.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
      description: 'Rooted in the golden principles of progressive overload. Master the Squat, Bench Press, Deadlift, and Overhead Press on competition Eleiko platforms with calibrated plates and expert spotting.',
      benefits: [
        'Dedicated Olympic platforms, calibrated plates, and competition racks',
        'Technical biomechanical cueing for maximum neurological recruitment',
        'Substantial increases in bone mineral density and tendon tensile strength',
        'Structured RPE (Rate of Perceived Exertion) and percentage-based programming',
        'Supportive lifting brotherhood and sisterhood cheering every PR'
      ],
      process: [
        { step: '01', title: 'Barbell Mobility', desc: 'Ankle dorsiflexion, thoracic extension, and hip capsule priming.' },
        { step: '02', title: 'Primary Compound Lift', desc: 'Work up to prescribed working sets adhering strictly to form.' },
        { step: '03', title: 'Accessory Hypertrophy', desc: 'Targeting weak points with dumbbell rows, lunges, and trunk work.' },
        { step: '04', title: 'PR Logging', desc: 'Recording exact weights, sets, and reps into your digital member tracker.' }
      ],
      targetAudience: 'Strength seekers, powerlifters, and anyone determined to develop genuine physical power.',
      leadTrainer: 'David Kovacs'
    },
    {
      id: 'prg-07',
      slug: 'bodybuilding',
      title: 'Bodybuilding & Hypertrophy',
      category: 'Physique Sculpting',
      icon: 'Shield',
      tagline: 'Scientific muscular hypertrophy, mind-muscle connection, and symmetry.',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
      description: 'Focus exclusively on muscle volume, symmetry, and aesthetic balance. Utilizing specialized biomechanically sound machines, drop-sets, mechanical drop-sets, and peak contraction protocols.',
      benefits: [
        'Isolate individual muscle heads for balanced, proportioned aesthetics',
        'High-end selectorized and plate-loaded Arsenal & Prime machines',
        'Strategic manipulation of time-under-tension (TUT)',
        'Techniques for peak muscle pump and fascia stretching',
        'Personalized physique assessments targeting lagging muscle groups'
      ],
      process: [
        { step: '01', title: 'Activation Sets', desc: 'Pre-exhausting target muscles with cables to lock in the mind-muscle link.' },
        { step: '02', title: 'Heavy Mechanical Tension', desc: '6-10 rep sets prioritizing strict concentric control and deep eccentric stretch.' },
        { step: '03', title: 'Metabolic Stress Finishers', desc: 'Drop-sets, supersets, and rest-pause sets driving intra-cellular swelling.' },
        { step: '04', title: 'Intra-Fascial Stretch', desc: 'Deep weighted stretching under load to maximize growth signaling.' }
      ],
      targetAudience: 'Physique athletes, aesthetic lifters, and anyone wanting to maximize lean muscle mass.',
      leadTrainer: 'David Kovacs'
    },
    {
      id: 'prg-08',
      slug: 'weight-loss',
      title: 'Weight Loss & Transformation',
      category: 'Body Recomposition',
      icon: 'Activity',
      tagline: 'Sustainable, science-backed fat loss without starvation diets or burnout.',
      image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=1000&q=80',
      description: 'A holistic 360-degree approach combining metabolic strength training, daily NEAT optimization, behavioral habit coaching, and personalized calorie budgeting to achieve permanent body recomposition.',
      benefits: [
        'Preserves muscle while selectively shedding visceral and subcutaneous fat',
        'Weekly accountability check-ins with your assigned transformation mentor',
        'Customized nutrition blueprint with flexible macronutrient tracking',
        'Metabolic strength circuits that prevent resting metabolic slowdown',
        'Long-term sustainable lifestyle habits that keep weight off permanently'
      ],
      process: [
        { step: '01', title: 'Biometric Baseline', desc: 'Accurate DEXA scan, circumferences, and resting metabolic rate calculation.' },
        { step: '02', title: 'Nutritional Re-engineering', desc: 'Creating an enjoyable, satiating calorie deficit with high protein targets.' },
        { step: '03', title: 'Resistance + Cardio Fusion', desc: 'Preserving lean muscle tissue while optimizing total weekly energy burn.' },
        { step: '04', title: 'Sustained Maintenance', desc: 'Reverse dieting strategies once your goal weight is reached.' }
      ],
      targetAudience: 'Anyone struggling with stubborn fat, yo-yo dieting, or looking for an empowering total makeover.',
      leadTrainer: 'Elena Rostova'
    },
    {
      id: 'prg-09',
      slug: 'nutrition-and-diet',
      title: 'Nutrition & Diet Counseling',
      category: 'Dietetics',
      icon: 'Apple',
      tagline: 'Clinical sports nutrition tailored to your bio-individuality and lifestyle.',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=80',
      description: 'Nutrition makes or breaks your gym investment. Work 1-on-1 with our registered clinical sports dietitian to construct a customized meal blueprint that fuels energy, speeds recovery, and fits your culture.',
      benefits: [
        'Personalized macro and micronutrient breakdown based on metabolic rate',
        'Custom grocery guides, meal prepping strategies, and dining-out blueprints',
        'Support for vegetarian, vegan, ketogenic, high-protein, and medical diets',
        'Optimized workout peri-nutrition (pre, intra, and post workout fueling)',
        'Evidence-based supplement guidance filtering out marketing gimmicks'
      ],
      process: [
        { step: '01', title: '7-Day Dietary Audit', desc: 'Analyzing current food intake, micronutrient gaps, and digestive comfort.' },
        { step: '02', title: 'Personalized Macro Strategy', desc: 'Setting tailored grams of protein, carbohydrates, and fats for your phase.' },
        { step: '03', title: 'Practical Meal Architecture', desc: 'Real-world recipes and grocery templates adapted to your kitchen.' },
        { step: '04', title: 'Bi-Weekly Strategy Calibration', desc: 'Adjusting calories as body composition changes to prevent plateau.' }
      ],
      targetAudience: 'Lifters hitting plateaus, busy professionals eating on the go, and individuals wanting real nutritional clarity.',
      leadTrainer: 'Elena Rostova'
    },
    {
      id: 'prg-10',
      slug: 'physiotherapy-recovery',
      title: 'Physiotherapy & Recovery',
      category: 'Therapy & Longevity',
      icon: 'HeartPulse',
      tagline: 'Elite physical therapy, infrared saunas, cryotherapy, and soft-tissue rehab.',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
      description: 'Train hard, recover harder. Our sports medicine clinic within the gym provides orthopedic evaluations, active release technique, dry needling, percussive therapy, and infrared recovery to keep you operating at 100%.',
      benefits: [
        'Licensed Doctor of Physical Therapy assessments and manual therapy',
        'Immediate diagnosis and targeted rehabilitation for acute strains and pains',
        'Access to full-spectrum infrared sauna and cold plunge therapy suite',
        'Normatec dynamic pneumatic compression boots for enhanced lymphatic flow',
        'Corrective exercise prescriptions integrated directly with gym floor workouts'
      ],
      process: [
        { step: '01', title: 'Clinical Examination', desc: 'Orthopedic joint stress testing, neuro-muscular evaluation, and palpation.' },
        { step: '02', title: 'Manual Treatment', desc: 'Dry needling, joint mobilization, and soft-tissue myofascial release.' },
        { step: '03', title: 'Active Neuromuscular Re-education', desc: 'Targeted strengthening of inhibited stabilizer muscle groups.' },
        { step: '04', title: 'Recovery Suite Session', desc: 'Contrast therapy (sauna + cold plunge) for accelerated systemic flushing.' }
      ],
      targetAudience: 'Injured lifters, endurance runners, athletes in peak season, and anyone with persistent aches.',
      leadTrainer: 'Marcus Chen'
    }
  ];

  const classes = [
    // Monday
    {
      id: 'cls-mon-01',
      day: 'Monday',
      time: '06:00 AM',
      name: 'HIIT Metabolic Blast',
      category: 'HIIT',
      instructor: 'Alex Vance',
      duration: '50 mins',
      capacity: 15,
      reserved: 12,
      intensity: 'High',
      room: 'Studio A (Main Turf)'
    },
    {
      id: 'cls-mon-02',
      day: 'Monday',
      time: '07:30 AM',
      name: 'Vinyasa Dawn Flow',
      category: 'Yoga',
      instructor: 'Sarah Jenkins',
      duration: '60 mins',
      capacity: 18,
      reserved: 14,
      intensity: 'Medium',
      room: 'Zen Studio 2'
    },
    {
      id: 'cls-mon-03',
      day: 'Monday',
      time: '12:00 PM',
      name: 'Core & Mobility Express',
      category: 'Mobility',
      instructor: 'Sarah Jenkins',
      duration: '45 mins',
      capacity: 20,
      reserved: 20, // FULL CLASS to demonstrate "Class Full" state!
      intensity: 'Low-Medium',
      room: 'Functional Arena'
    },
    {
      id: 'cls-mon-04',
      day: 'Monday',
      time: '05:30 PM',
      name: 'Strength & Barbell Technique',
      category: 'Strength',
      instructor: 'David Kovacs',
      duration: '60 mins',
      capacity: 12,
      reserved: 9,
      intensity: 'High',
      room: 'Lifting Deck'
    },
    {
      id: 'cls-mon-05',
      day: 'Monday',
      time: '06:45 PM',
      name: 'Zumba Cardio Party',
      category: 'Zumba',
      instructor: 'Maya Patel',
      duration: '55 mins',
      capacity: 25,
      reserved: 19,
      intensity: 'High',
      room: 'Studio A (Main Turf)'
    },

    // Tuesday
    {
      id: 'cls-tue-01',
      day: 'Tuesday',
      time: '06:30 AM',
      name: 'Functional Kettlebell Circuit',
      category: 'Functional Training',
      instructor: 'Maya Patel',
      duration: '50 mins',
      capacity: 16,
      reserved: 11,
      intensity: 'High',
      room: 'Functional Arena'
    },
    {
      id: 'cls-tue-02',
      day: 'Tuesday',
      time: '08:00 AM',
      name: 'Cardio Engine Endurance',
      category: 'Cardio',
      instructor: 'Alex Vance',
      duration: '45 mins',
      capacity: 15,
      reserved: 10,
      intensity: 'High',
      room: 'Cardio Loft'
    },
    {
      id: 'cls-tue-03',
      day: 'Tuesday',
      time: '06:00 PM',
      name: 'Heavy Compound Foundations',
      category: 'Strength',
      instructor: 'David Kovacs',
      duration: '60 mins',
      capacity: 12,
      reserved: 12, // FULL CLASS
      intensity: 'Very High',
      room: 'Lifting Deck'
    },
    {
      id: 'cls-tue-04',
      day: 'Tuesday',
      time: '07:15 PM',
      name: 'Power Restorative Yoga',
      category: 'Yoga',
      instructor: 'Sarah Jenkins',
      duration: '60 mins',
      capacity: 20,
      reserved: 13,
      intensity: 'Low',
      room: 'Zen Studio 2'
    },

    // Wednesday
    {
      id: 'cls-wed-01',
      day: 'Wednesday',
      time: '06:00 AM',
      name: 'Tabata Sprint Inferno',
      category: 'HIIT',
      instructor: 'Alex Vance',
      duration: '45 mins',
      capacity: 15,
      reserved: 8,
      intensity: 'High',
      room: 'Studio A (Main Turf)'
    },
    {
      id: 'cls-wed-02',
      day: 'Wednesday',
      time: '07:30 AM',
      name: 'Joint Health & Mobility Flow',
      category: 'Mobility',
      instructor: 'Sarah Jenkins',
      duration: '50 mins',
      capacity: 18,
      reserved: 12,
      intensity: 'Low-Medium',
      room: 'Zen Studio 2'
    },
    {
      id: 'cls-wed-03',
      day: 'Wednesday',
      time: '05:30 PM',
      name: 'Upper Body Hypertrophy',
      category: 'Strength',
      instructor: 'David Kovacs',
      duration: '60 mins',
      capacity: 14,
      reserved: 10,
      intensity: 'High',
      room: 'Lifting Deck'
    },
    {
      id: 'cls-wed-04',
      day: 'Wednesday',
      time: '06:45 PM',
      name: 'Zumba Rhythm Wave',
      category: 'Zumba',
      instructor: 'Maya Patel',
      duration: '55 mins',
      capacity: 25,
      reserved: 16,
      intensity: 'High',
      room: 'Studio A (Main Turf)'
    },

    // Thursday
    {
      id: 'cls-thu-01',
      day: 'Thursday',
      time: '06:30 AM',
      name: 'Athletic Conditioning & Agility',
      category: 'Functional Training',
      instructor: 'Alex Vance',
      duration: '50 mins',
      capacity: 16,
      reserved: 14,
      intensity: 'High',
      room: 'Functional Arena'
    },
    {
      id: 'cls-thu-02',
      day: 'Thursday',
      time: '08:00 AM',
      name: 'Cardio Threshold Ride & Row',
      category: 'Cardio',
      instructor: 'Maya Patel',
      duration: '45 mins',
      capacity: 15,
      reserved: 7,
      intensity: 'High',
      room: 'Cardio Loft'
    },
    {
      id: 'cls-thu-03',
      day: 'Thursday',
      time: '06:00 PM',
      name: 'Lower Body Posterior Chain',
      category: 'Strength',
      instructor: 'David Kovacs',
      duration: '60 mins',
      capacity: 12,
      reserved: 9,
      intensity: 'High',
      room: 'Lifting Deck'
    },
    {
      id: 'cls-thu-04',
      day: 'Thursday',
      time: '07:15 PM',
      name: 'Ashtanga Yoga Discipline',
      category: 'Yoga',
      instructor: 'Sarah Jenkins',
      duration: '60 mins',
      capacity: 18,
      reserved: 11,
      intensity: 'Medium',
      room: 'Zen Studio 2'
    },

    // Friday
    {
      id: 'cls-fri-01',
      day: 'Friday',
      time: '06:00 AM',
      name: 'Full Body HIIT Matrix',
      category: 'HIIT',
      instructor: 'Alex Vance',
      duration: '50 mins',
      capacity: 16,
      reserved: 15,
      intensity: 'High',
      room: 'Studio A (Main Turf)'
    },
    {
      id: 'cls-fri-02',
      day: 'Friday',
      time: '07:30 AM',
      name: 'Spinal Decompression & Stretch',
      category: 'Mobility',
      instructor: 'Sarah Jenkins',
      duration: '50 mins',
      capacity: 18,
      reserved: 18, // FULL CLASS
      intensity: 'Low',
      room: 'Zen Studio 2'
    },
    {
      id: 'cls-fri-03',
      day: 'Friday',
      time: '05:30 PM',
      name: 'Barbell PR Club',
      category: 'Strength',
      instructor: 'David Kovacs',
      duration: '60 mins',
      capacity: 12,
      reserved: 11,
      intensity: 'Very High',
      room: 'Lifting Deck'
    },
    {
      id: 'cls-fri-04',
      day: 'Friday',
      time: '06:45 PM',
      name: 'Weekend Kickoff Zumba',
      category: 'Zumba',
      instructor: 'Maya Patel',
      duration: '55 mins',
      capacity: 25,
      reserved: 22,
      intensity: 'High',
      room: 'Studio A (Main Turf)'
    },

    // Saturday
    {
      id: 'cls-sat-01',
      day: 'Saturday',
      time: '07:00 AM',
      name: 'Saturday Super Circuit',
      category: 'Functional Training',
      instructor: 'Alex Vance',
      duration: '60 mins',
      capacity: 20,
      reserved: 17,
      intensity: 'High',
      room: 'Functional Arena'
    },
    {
      id: 'cls-sat-02',
      day: 'Saturday',
      time: '08:30 AM',
      name: 'Sunrise Power Yoga & Breath',
      category: 'Yoga',
      instructor: 'Sarah Jenkins',
      duration: '75 mins',
      capacity: 22,
      reserved: 16,
      intensity: 'Medium',
      room: 'Zen Studio 2'
    },
    {
      id: 'cls-sat-03',
      day: 'Saturday',
      time: '10:00 AM',
      name: 'Strength Masterclass & Deadlifts',
      category: 'Strength',
      instructor: 'David Kovacs',
      duration: '75 mins',
      capacity: 12,
      reserved: 10,
      intensity: 'High',
      room: 'Lifting Deck'
    },
    {
      id: 'cls-sat-04',
      day: 'Saturday',
      time: '04:30 PM',
      name: 'Weekend Beat Zumba Fiesta',
      category: 'Zumba',
      instructor: 'Maya Patel',
      duration: '50 mins',
      capacity: 25,
      reserved: 14,
      intensity: 'High',
      room: 'Studio A (Main Turf)'
    },

    // Sunday
    {
      id: 'cls-sun-01',
      day: 'Sunday',
      time: '08:00 AM',
      name: 'Full Body Mobility & Myofascial Release',
      category: 'Mobility',
      instructor: 'Sarah Jenkins',
      duration: '60 mins',
      capacity: 20,
      reserved: 15,
      intensity: 'Low',
      room: 'Zen Studio 2'
    },
    {
      id: 'cls-sun-02',
      day: 'Sunday',
      time: '09:30 AM',
      name: 'Sunday Warrior Aerobic Challenge',
      category: 'Cardio',
      instructor: 'Alex Vance',
      duration: '50 mins',
      capacity: 16,
      reserved: 9,
      intensity: 'High',
      room: 'Studio A (Main Turf)'
    },
    {
      id: 'cls-sun-03',
      day: 'Sunday',
      time: '11:00 AM',
      name: 'Community Functional Games',
      category: 'Functional Training',
      instructor: 'Maya Patel',
      duration: '60 mins',
      capacity: 24,
      reserved: 18,
      intensity: 'Medium-High',
      room: 'Functional Arena'
    }
  ];

  const bookings = [
    {
      id: 'bkg-01',
      userId: 'usr-member-01',
      classId: 'cls-mon-01',
      className: 'HIIT Metabolic Blast',
      trainerName: 'Alex Vance',
      bookingDate: '2026-09-21',
      time: '06:00 AM',
      category: 'HIIT',
      status: 'Upcoming',
      createdAt: '2026-09-15T14:30:00.000Z'
    },
    {
      id: 'bkg-02',
      userId: 'usr-member-01',
      classId: 'cls-mon-04',
      className: 'Strength & Barbell Technique',
      trainerName: 'David Kovacs',
      bookingDate: '2026-09-21',
      time: '05:30 PM',
      category: 'Strength',
      status: 'Upcoming',
      createdAt: '2026-09-15T15:10:00.000Z'
    },
    {
      id: 'bkg-03',
      userId: 'usr-member-01',
      classId: 'cls-wed-01',
      className: 'Tabata Sprint Inferno',
      trainerName: 'Alex Vance',
      bookingDate: '2026-09-16',
      time: '06:00 AM',
      category: 'HIIT',
      status: 'Completed',
      createdAt: '2026-09-10T10:00:00.000Z'
    },
    {
      id: 'bkg-04',
      userId: 'usr-member-02',
      classId: 'cls-mon-02',
      className: 'Vinyasa Dawn Flow',
      trainerName: 'Sarah Jenkins',
      bookingDate: '2026-09-21',
      time: '07:30 AM',
      category: 'Yoga',
      status: 'Upcoming',
      createdAt: '2026-09-16T09:00:00.000Z'
    }
  ];

  const blogPosts = [
    {
      id: 'post-01',
      slug: 'progressive-overload-principles',
      title: 'The Master Key to Muscle Growth: Progressive Overload Explained',
      category: 'Workout',
      author: 'David Kovacs',
      date: 'September 12, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
      excerpt: 'Lifting the same weights for the same repetitions every week will stall your physique. Here is the clinical framework for progressive tension.',
      content: `
### Why Progressive Overload Is Non-Negotiable

If there is one physiological universal truth in resistance training, it is this: muscle tissue will only adapt, repair, and hyper-trophy when exposed to a stimulus that exceeds its current adaptive threshold.

Many lifters enter the gym week after week, picking up the same 20 kg dumbbells and completing 3 sets of 10. While this maintains existing conditioning, it will not trigger new myofibrillar protein synthesis.

### The 4 Vectors of Progression

1. **Absolute Load (Weight on the Bar)**: Adding 1.25 kg to 2.5 kg to compound barbell movements when technical execution allows.
2. **Repetition Density**: Performing more repetitions with identical form under the same load.
3. **Execution Tempo & Control**: Increasing time-under-tension by taking 3 full seconds on the eccentric portion.
4. **Range of Motion**: Lifting through a deeper, uncompromised anatomical range of motion.

> "A great lifter logs every working rep and treats the notebook with as much respect as the barbell."

### Practical Takeaway
Keep a workout log inside the member portal. Note your working sets, and aim to earn one extra rep or micro-plate increase every week while maintaining pristine form.
      `
    },
    {
      id: 'post-02',
      slug: 'protein-timing-and-macros',
      title: 'Protein Timing & Total Daily Intake: What Science Actually Says',
      category: 'Nutrition',
      author: 'Elena Rostova, RD',
      date: 'September 08, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=80',
      excerpt: 'Is the 30-minute post-workout anabolic window real? How much protein can your body actually absorb per meal? Let us examine the data.',
      content: `
### Debunking The 30-Minute Anabolic Window Myth

For decades, bodybuilders panicked if they could not slam a protein shake within 30 minutes of dropping their final dumbbell. Modern peer-reviewed meta-analyses have shown that the anabolic window is far more generous—spanning several hours post-exercise.

What matters far more than an emergency post-workout shake is your **total daily protein intake** and how evenly it is distributed across your day.

### How Much Protein Do You Truly Need?

- **Strength & Hypertrophy Lifters**: 1.6 to 2.2 grams of protein per kilogram of body weight daily.
- **Fat Loss in a Caloric Deficit**: Up to 2.4 grams per kilogram to preserve lean tissue.
- **General Health**: 1.2 to 1.6 grams per kilogram.

### Optimize Leucine Thresholds
Aim for 25–40 grams of high-quality complete protein every 3 to 4 hours. This supplies 2.5 to 3 grams of the branch-chain amino acid **leucine**, which acts as the biological trigger turning on mTOR and muscle protein synthesis.
      `
    },
    {
      id: 'post-03',
      slug: 'sleep-and-hormonal-recovery',
      title: 'The Unsung Ergogenic Aid: Sleep, Cortisol, and Muscle Recovery',
      category: 'Recovery',
      author: 'Marcus Chen, DPT',
      date: 'August 30, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80',
      excerpt: 'You do not grow in the gym; you break tissue down in the gym. You grow when you achieve deep slow-wave sleep. Here is how to optimize it.',
      content: `
### Growth Hormone and Stage 3 Slow-Wave Sleep

Over 70% of total daily human growth hormone (HGH) pulsation occurs during Stage 3 non-REM slow-wave sleep. If you truncate your sleep to 5 or 6 hours, you cut off your body’s most potent endogenous recovery mechanism.

### The Cortisol-Testosterone Ratio
Chronic sleep restriction elevates systemic evening cortisol. Elevated cortisol impairs glucose tolerance, exacerbates cravings for hyper-palatable processed sugars, and blunts athletic performance.

### 4 Habits for Elite Recovery Sleep
1. **Darkness**: Sleep in complete darkness (use blackout shades or a sleep mask).
2. **Temperature**: Keep the bedroom between 18°C and 20°C (65°F–68°F).
3. **No Screens 45 Mins Before Bed**: Blue spectrum light suppresses melatonin secretion.
4. **Consistency**: Go to bed and wake up within a 30-minute window every day, even on weekends.
      `
    },
    {
      id: 'post-04',
      slug: 'functional-mobility-for-desk-workers',
      title: 'Unlocking Tight Hips & Shoulders: A 10-Minute Daily Mobility Routine',
      category: 'Lifestyle',
      author: 'Sarah Jenkins',
      date: 'August 22, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
      excerpt: 'Sitting in office chairs shortens your hip flexors and rounds your thoracic spine. Reverse the damage with these 4 restorative drills.',
      content: `
### The Modern Desk Posture Syndrome
Sitting for 8 to 10 hours puts your psoas and rectus femoris in chronically shortened positions while leaving your glutes neurologically inhibited. 

When you head to the gym and try to squat heavy without addressing this, your pelvis compensates with anterior pelvic tilt, transferring sheer stress directly into your lumbar spine.

### The 4 Essential Daily Drills
1. **The 90/90 Hip Switch**: Rotates the femoral head through both internal and external hip rotation.
2. **Thoracic Foam Roller Extensions**: Restores upper spine extension so your shoulders can safely overhead press.
3. **Half-Kneeling Couch Stretch**: Lengthens the quad and hip flexor with active glute contraction.
4. **Cat-Cow with Breath Sync**: Gently mobilizes every spinal segment.
      `
    }
  ];

  const testimonials = [
    {
      id: 'tst-01',
      name: 'Vikram Sengupta',
      role: 'Member since 2025',
      goal: 'Strength & Body Recomposition',
      quote: 'Joining this gym completely changed the way I approach fitness. The equipment is Olympic tier, the trainers genuinely know biomechanics, and the community holds you to a higher standard every morning.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      rating: 5,
      isPlaceholderNotice: 'Placeholder member profile for demonstration'
    },
    {
      id: 'tst-02',
      name: 'Ananya Verma',
      role: 'Member since 2026',
      goal: 'Cardio Stamina & Stress Relief',
      quote: 'The studio classes here are like nothing I have experienced. The instructors bring unmatched energy, the sound and lights are electric, and booking through the mobile portal makes scheduling seamless.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      rating: 5,
      isPlaceholderNotice: 'Placeholder member profile for demonstration'
    },
    {
      id: 'tst-03',
      name: 'Sameer Rao',
      role: 'VIP Member since 2024',
      goal: 'Injury Rehabilitation & Longevity',
      quote: 'The synergy between the personal trainers and physiotherapy clinic is world-class. Marcus resolved a two-year shoulder impingement, and I am now lifting heavier than ever without pain.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      rating: 5,
      isPlaceholderNotice: 'Placeholder member profile for demonstration'
    }
  ];

  const gallery = [
    {
      id: 'gal-01',
      title: 'Olympic Free Weights & Platforms',
      category: 'Equipment',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      description: 'Precision Eleiko barbells and competition drop platforms.'
    },
    {
      id: 'gal-02',
      title: 'High-Torque HIIT Arena',
      category: 'Training',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      description: 'Sled tracks, assault bikes, and kettlebell conditioning arena.'
    },
    {
      id: 'gal-03',
      title: 'Zen Mind & Body Yoga Studio',
      category: 'Classes',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
      description: 'Acoustically isolated studio with natural maple flooring.'
    },
    {
      id: 'gal-04',
      title: 'Cardio Loft & Panoramic Views',
      category: 'Facility',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
      description: 'Connected Matrix treadmills and climbmills.'
    },
    {
      id: 'gal-05',
      title: 'Selectorized Hypertrophy Zone',
      category: 'Equipment',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
      description: 'Custom plate-loaded machines engineered for peak muscular tension.'
    },
    {
      id: 'gal-06',
      title: 'Hydro-Recovery & Sauna Suite',
      category: 'Facility',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
      description: 'Infrared cedarwood sauna and contrast cold plunge pools.'
    },
    {
      id: 'gal-07',
      title: 'Annual Athletic Pull-Up Challenge',
      category: 'Events',
      image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80',
      description: 'Members testing their endurance at our community fitness games.'
    },
    {
      id: 'gal-08',
      title: 'Community Lifting Brotherhood',
      category: 'Community',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
      description: 'Celebrating personal records and supporting team progress.'
    }
  ];

  const contactMessages = [
    {
      id: 'msg-01',
      name: 'Karan Mehra',
      email: 'karan@example.com',
      phone: '+91 98765 67890',
      subject: 'Corporate Membership Query',
      message: 'Hello, I represent a tech startup nearby with 35 employees. Do you offer corporate wellness memberships?',
      status: 'unread',
      createdAt: '2026-09-15T11:20:00.000Z'
    }
  ];

  const newsletterSubscribers = [
    { email: 'member@gym.com', subscribedAt: '2026-08-01T09:00:00.000Z' }
  ];

  return {
    users,
    trainers,
    programs,
    classes,
    bookings,
    blogPosts,
    testimonials,
    gallery,
    contactMessages,
    newsletterSubscribers
  };
};
