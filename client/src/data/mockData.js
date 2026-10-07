// Comprehensive Mock & Fallback Data for Gym Platform

export const initialTrainers = [
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
  },
  {
    id: 'trn-07',
    slug: 'jordan-reed',
    name: 'Jordan Reed',
    role: 'Olympic Weightlifting & Cross-Training Coach',
    experience: '10+ Years',
    photo: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Clean & Jerk Mechanics', 'Snatch Kinematics', 'Barbell Cycling', 'Metabolic Conditioning'],
    certifications: ['USAW Senior Coach Level 2', 'CrossFit Level 3 Trainer (CCMT)', 'CSCS'],
    bio: 'Former national Olympic lifting competitor focused on kinetic power output, bar trajectory precision, and ruthless cardiovascular work capacity.',
    philosophy: 'Master the mechanics before you chase the weight. Technique is the foundation that holds the house of strength.',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Saturday']
  },
  {
    id: 'trn-08',
    slug: 'samantha-brooks',
    name: 'Samantha Brooks',
    role: 'Combat Conditioning & Boxing Master',
    experience: '8+ Years',
    photo: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Boxing Biomechanics', 'Heavy Bag Conditioning', 'Footwork & Agility', 'Rotational Power'],
    certifications: ['USA Boxing Certified Coach', 'NASM Certified Personal Trainer', 'Kettlebell Athletics Specialist'],
    bio: 'Golden Gloves competitor turned conditioning coach, building fighters and everyday athletes with sharp boxing mechanics and unbreakable stamina.',
    philosophy: 'In the ring and in life, composure under fire wins every battle. Channel your inner fire with surgical discipline.',
    availableDays: ['Tuesday', 'Wednesday', 'Friday', 'Sunday']
  },
  {
    id: 'trn-09',
    slug: 'liam-gallagher',
    name: 'Liam Gallagher',
    role: 'Calisthenics & Gymnastic Strength Specialist',
    experience: '7+ Years',
    photo: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Ring & Bar Calisthenics', 'Scapular Control', 'Handstand Balance', 'Tendon Conditioning'],
    certifications: ['WSWCF Master Calisthenics Trainer', 'GymnasticBodies Certified Coach', 'FMS Level 2'],
    bio: 'Specialist in relative bodyweight leverage, tendon resilience, and gymnastic strength progression. Teaches athletes total control over their physical vessel.',
    philosophy: 'Before you demand power from the barbell, command mastery over your own gravity. Control begins from the fingertips down.',
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday']
  }
];

export const initialGallery = [
  // Facility
  {
    id: 'gal-04',
    title: 'Cardio Loft & Panoramic City Skyline',
    category: 'Facility',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
    description: 'Matrix connected treadmills and climbmills with floor-to-ceiling urban skyline views.'
  },
  {
    id: 'gal-06',
    title: 'Hydro-Recovery & Cedarwood Sauna Suite',
    category: 'Facility',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
    description: 'Infrared cedarwood sauna and contrast cold plunge pools for accelerated muscle repair.'
  },
  {
    id: 'gal-09',
    title: 'Sports Science Cryo & Compression Lounge',
    category: 'Facility',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    description: 'Normatec compression boots and specialized recovery recliners for post-session down-regulation.'
  },
  {
    id: 'gal-10',
    title: 'Executive Locker Suites & Rain Showers',
    category: 'Facility',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    description: 'Italian marble vanity stations, private rainfall showers, and electronic biometric lockers.'
  },

  // Equipment
  {
    id: 'gal-01',
    title: 'Olympic Free Weights & Platforms',
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    description: 'Precision Eleiko barbells and competition drop platforms calibrated to IWF standards.'
  },
  {
    id: 'gal-05',
    title: 'Selectorized Hypertrophy Zone',
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    description: 'Custom plate-loaded machines engineered for peak muscular tension and optimal resistance profiles.'
  },
  {
    id: 'gal-12',
    title: 'Dumbbell Battery Up To 65kg',
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
    description: 'Full urethane dumbbell deck with twin incline benches and spotter platforms.'
  },
  {
    id: 'gal-14',
    title: 'Concept2 Row & SkiErg Battery',
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
    description: 'Synchronized cardiovascular ergometers for testing metabolic output and threshold power.'
  },

  // Training
  {
    id: 'gal-02',
    title: 'High-Torque HIIT Arena & Prowler Turf',
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    description: 'Sled tracks, assault bikes, and kettlebell conditioning arena built for explosive power.'
  },
  {
    id: 'gal-15',
    title: 'Olympic Clean & Jerk Technique Session',
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80',
    description: 'Athletes fine-tuning the triple extension and explosive catch under professional eyes.'
  },
  {
    id: 'gal-16',
    title: 'Heavy Barbell Compound Squats',
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=1200&q=80',
    description: 'Progressive overload training with competition bumper plates and calibrated collars.'
  },
  {
    id: 'gal-17',
    title: 'Combat Boxing Heavy Bag Drill',
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=1200&q=80',
    description: 'High-frequency strike combinations and rotational agility under strobe training lights.'
  },

  // Classes
  {
    id: 'gal-03',
    title: 'Zen Mind & Body Yoga Sanctuary',
    category: 'Classes',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    description: 'Acoustically isolated studio with natural maple flooring and warm ambient lighting.'
  },
  {
    id: 'gal-18',
    title: 'Rhythm Wave Studio Zumba & Dance',
    category: 'Classes',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=1200&q=80',
    description: 'High-energy studio session blending syncopated Latin rhythms with intense cardio conditioning.'
  },
  {
    id: 'gal-19',
    title: 'Functional Kettlebell Movement Group',
    category: 'Classes',
    image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=1200&q=80',
    description: 'Synchronized team swings, snatches, and Turkish get-ups developing athletic hips.'
  },
  {
    id: 'gal-20',
    title: 'Morning Sun Vinyasa Breathwork Flow',
    category: 'Classes',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    description: 'Opening thoracic mobility and centering nervous system readiness for the day ahead.'
  },

  // Events
  {
    id: 'gal-07',
    title: 'Annual Athletic Pull-Up & Grip Challenge',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80',
    description: 'Members testing their max muscular endurance at our community fitness throwdown.'
  },
  {
    id: 'gal-21',
    title: 'Summer Strongman Invitational',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    description: 'Local and regional athletes battling through farmer carries and log presses.'
  },
  {
    id: 'gal-22',
    title: '5K Sunrise Community River Run',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=80',
    description: 'Over 120 members and coaches taking to the riverside track for our annual charity run.'
  },
  {
    id: 'gal-23',
    title: 'Barbell Kinematics & Nutrition Seminar',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
    description: 'Interactive educational workshop breaking down squat biomechanics and meal timing.'
  },

  // Community
  {
    id: 'gal-08',
    title: 'Community Lifting Brotherhood & PR Board',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    description: 'Celebrating personal records, high-fives, and supporting teammate progress every sunrise.'
  },
  {
    id: 'gal-24',
    title: 'Post-Workout Fuel & Lounge Hangouts',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
    description: 'Members unwinding at the juice bar sharing training advice and weekly wins.'
  },
  {
    id: 'gal-25',
    title: 'Partner Training Grit & Accountability',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    description: 'Pushing each other through the final grueling reps of Saturday conditioning.'
  },
  {
    id: 'gal-26',
    title: 'Annual Member Transformation Honors Gala',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    description: 'Recognizing outstanding dedication, physical metamorphoses, and inspiring community spirits.'
  }
];

export const initialBlogPosts = [
  // Workout
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
Keep a workout log inside your training journal. Note your working sets, and aim to earn one extra rep or micro-plate increase every week while maintaining pristine form.
    `
  },
  {
    id: 'post-05',
    slug: 'compound-vs-isolation-hypertrophy',
    title: 'Compound vs Isolation Movements: The Optimal Training Ratio',
    category: 'Workout',
    author: 'David Kovacs',
    date: 'August 18, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Should your workout consist of heavy multi-joint movements or targeted isolation machines? The optimal split for maximum muscle stimulus.',
    content: `
### The Great Barbell vs Machine Debate

For decades, purists argued that the barbell squat, bench press, and deadlift were all you ever needed. On the flip side, aesthetic bodybuilders frequently extol the virtues of cable cross-overs, leg extensions, and preacher curls.

Modern biomechanical analyses reveal that neither extreme is ideal. Maximum hypertrophic stimulation occurs when both modalities are sequenced strategically.

### The 70/30 Golden Rule
1. **70% Compound Multi-Joint Movements**: Squats, Romanian Deadlifts, Overhead Presses, Pull-ups, and Barbell Rows recruit the highest number of motor units and release systemic growth hormones.
2. **30% Single-Joint Isolation Work**: Lateral raises, incline dumbbell curls, and tricep overhead extensions eliminate stabilizer fatigue and directly load target muscle bellies at peak mechanical tension.

### Exercise Order Matters
Always perform compound exercises at the beginning of your training session when central nervous system freshness is highest. Transition into isolation work as metabolic fatigue accumulates.
    `
  },

  // Nutrition
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
    id: 'post-06',
    slug: 'peri-workout-fueling-guide',
    title: 'The Peri-Workout Nutrition Protocol: Pre, Intra, and Post-Fueling',
    category: 'Nutrition',
    author: 'Elena Rostova, RD',
    date: 'August 14, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'What you consume 90 minutes before lifting and during intense sessions directly dictates pump, power output, and cognitive drive.',
    content: `
### Fueling the Kinetic Machine

Entering a high-intensity session depleted of muscle glycogen results in early muscular burn, reduced set volume, and elevated cortisol. By structuring your peri-workout nutrients, you can double your high-velocity work capacity.

### The 3 Stages of Workout Fueling

1. **Pre-Workout (60-90 minutes prior)**: 30-40g low-glycemic complex carbohydrates (oatmeal, rice cakes, banana) paired with 25g fast-digesting protein and 500ml water with a pinch of sea salt.
2. **Intra-Workout (for sessions exceeding 60 mins)**: Electrolytes with 20g cyclic dextrin or coconut water to sustain cellular hydration and prevent intra-muscular cramping.
3. **Post-Workout (within 2 hours)**: High biological value protein (whey isolate or chicken breast) combined with starch to rapidly replenish depleted hepatic and intramuscular glycogen stores.
    `
  },

  // Recovery
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
    id: 'post-07',
    slug: 'cold-plunge-vs-sauna-hormesis',
    title: 'Contrast Therapy Demystified: Cold Plunges vs Infrared Sauna',
    category: 'Recovery',
    author: 'Marcus Chen, DPT',
    date: 'August 06, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'When should you cold plunge, and when will it blunt your hypertrophy gains? The science of thermal stress adaptation.',
    content: `
### Thermal Hormesis: Stressing to Rebuild

Both hyperthermic exposure (saunas) and hypothermic exposure (ice baths) stimulate potent cellular repair pathways via heat shock proteins and norepinephrine surges. However, their timing is paramount.

### When to Cold Plunge
- **The Caveat**: Do NOT take an ice bath within 4 hours after a hypertrophy lifting session. The acute inflammation triggered by lifting is the essential biochemical signal that initiates muscle fiber growth. Quenching it blunts muscle gains.
- **The Ideal Window**: Use cold water immersion (3-5 minutes at 10°C) on active rest days or before cardio sessions to elevate dopamine and clear central fatigue.

### When to Sauna
- 20 minutes in an infrared sauna at 80°C post-lifting enhances nitric oxide circulation, clears metabolic waste, and mimics light cardiovascular conditioning.
    `
  },

  // Lifestyle
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
  },
  {
    id: 'post-08',
    slug: 'psychology-of-consistency',
    title: 'The Psychology of Consistency: How to Train When Motivation Fades',
    category: 'Lifestyle',
    author: 'Alex Vance',
    date: 'July 28, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Motivation is a fickle emotional state; discipline is a trained neurological habit. Here is the behavioral architecture of high performers.',
    content: `
### Motivation Is An Emotion, Not A Strategy

Anyone can show up to the gym on a sunny morning when feeling energetic, well-fed, and inspired. The athletes who undergo true bodily transformations are the ones who cross the gym threshold when it is dark, raining, and work was exhausting.

### 3 Rules for Unshakable Habit Loops

1. **Lower the Friction of Initiation**: Pack your gym bag, lay out your lifting shoes, and prep your water bottle the night before.
2. **The "Two-Minute Rule"**: Tell yourself you only need to show up and warm up for 5 minutes. 95% of the time, once you begin moving, momentum carries you through the full session.
3. **Never Miss Twice**: A missed session is a bump in the road. Two consecutive missed sessions is the beginning of a new, destructive habit.
    `
  },

  // Fitness
  {
    id: 'post-09',
    slug: 'vo2-max-longevity-biomarker',
    title: 'VO2 Max: The Single Most Critical Biomarker for Cardiovascular Longevity',
    category: 'Fitness',
    author: 'Alex Vance',
    date: 'July 15, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'High VO2 max is linked to a 400% reduction in all-cause mortality compared to low cardiorespiratory fitness. How to train it efficiently.',
    content: `
### What Is VO2 Max?

VO2 max measures the maximal volume of oxygen your body can transport and utilize during peak aerobic exertion. While often treated as a stat for marathon runners, peer-reviewed clinical data shows it is the single strongest physiological predictor of healthspan and longevity.

### The Norwegian 4x4 Protocol
The gold standard for rapid VO2 max improvement is the Norwegian 4x4 method:
- 4-minute intervals at 90-95% of maximum heart rate (you can only speak in 1-word gasps).
- 3 minutes of active recovery (light jog or brisk walk).
- Repeat for 4 total rounds once or twice per week.

Incorporating just one VO2 max session alongside resistance training produces radical cardiovascular resilience.
    `
  },
  {
    id: 'post-10',
    slug: 'functional-core-anti-rotation',
    title: 'The Anti-Core Revolution: Why Endless Crunches Fail Athletes',
    category: 'Fitness',
    author: 'Maya Patel',
    date: 'July 04, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Your core was anatomically designed to resist motion and protect your spine, not repeatedly flex it. The exercises you should be doing instead.',
    content: `
### The True Function of the Abdominal Wall

The human spine is not designed to perform hundreds of repetitive spinal flexion cycles under load (such as weighted crunches or sit-ups). Anatomically, the primary purpose of the core musculature (transverse abdominis, internal/external obliques, and erectors) is **anti-motion**:

1. **Anti-Extension**: Resisting spinal hyperextension (Ab-wheel rollouts, hollow body holds).
2. **Anti-Rotation**: Resisting twisting under load (Pallof presses, bird-dogs).
3. **Anti-Lateral Flexion**: Resisting sideways tilting (Suitcase carries, side planks).

By training your core to stabilize against external loads, you dramatically boost your squat, sprint speed, and protect your lumbar vertebrae for life.
    `
  },

  // Success Stories
  {
    id: 'post-11',
    slug: 'vikram-transformation-journey',
    title: "From Chronic Lower Back Pain to a 210kg Deadlift: Vikram's 18-Month Story",
    category: 'Success Stories',
    author: 'Marcus Chen, DPT',
    date: 'June 20, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'After an L5-S1 disc herniation left him unable to tie his shoes, Vikram teamed up with our physiotherapy and coaching staff to rebuild from zero.',
    content: `
### The Starting Point: Crippling Back Pain

When Vikram, a 34-year-old software architect, first walked through our doors, he had been dealing with chronic sciatica for nearly two years. "I thought my days of lifting anything heavier than a grocery bag were over," he recalled.

### The Rebuilding Protocol
1. **Phase 1: Pelvic Neutrality & Glute Recruitment**: We eliminated all loaded spinal movements for the first 8 weeks, focusing entirely on McGill Big 3 drills and restorative hip mobility with Coach Sarah.
2. **Phase 2: Hip Hinge Kinematics**: Coach David introduced kettlebell deadlifts from elevated blocks, teaching Vikram to recruit his posterior chain rather than his lumbar spine.
3. **Phase 3: Progressive Overload**: Over 18 months of strict, disciplined training, Vikram added micro-plates each week.

### The Triumphant Milestone
Last month, during our Summer Lifting Meet, Vikram pulled a pristine, competition-depth **210 kg deadlift** with zero pain. "This gym did not just fix my back; they taught me how to trust my body again."
    `
  },
  {
    id: 'post-12',
    slug: 'ananya-career-and-fitness-balance',
    title: "How Ananya Shredded 14kg & Built Peak Energy While Working 60-Hour Weeks",
    category: 'Success Stories',
    author: 'Alex Vance',
    date: 'June 05, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'A demanding corporate management role left Ananya exhausted and reaching for sugar. Here is how structured 45-minute sessions turned her health around.',
    content: `
### Breaking The Corporate Burnout Loop

Ananya was working 60+ hours a week as a product director. Late meetings, airport travel, and takeout meals had caused her weight to creep up by 16kg while her sleep quality hit rock bottom.

### The Sustainable Blueprint
- **Time-Constrained Training**: Instead of unrealistic 2-hour gym routines, Coach Alex programmed three 45-minute full-body sessions per week focusing on high-density circuits.
- **Nutritional Structure without Deprivation**: Sports Dietitian Elena Rostova set up a meal-prep framework with simple 30g protein targets per meal, removing the stress of macro counting.
- **Stress Down-Regulation**: Attending Sarah's Sunday Restorative Yoga class normalized cortisol levels and restored deep Stage 3 sleep.

### The Outcome
In 9 months, Ananya lost 14 kg of pure fat, improved her resting heart rate from 78 to 58 bpm, and completed her first unassisted chin-up. "Fitness is no longer a chore on my calendar; it is the anchor that powers my entire professional day."
    `
  }
];

export const initialClasses = [
  {
    id: 'cls-mon-01',
    day: 'Monday',
    time: '06:00 AM',
    name: 'Metabolic HIIT Ignition',
    category: 'HIIT',
    instructor: 'Alex Vance',
    duration: '50 mins',
    capacity: 16,
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
    capacity: 20,
    reserved: 15,
    intensity: 'Medium',
    room: 'Zen Studio 2'
  },
  {
    id: 'cls-mon-03',
    day: 'Monday',
    time: '05:30 PM',
    name: 'Heavy Barbell Foundations',
    category: 'Strength',
    instructor: 'David Kovacs',
    duration: '60 mins',
    capacity: 12,
    reserved: 10,
    intensity: 'High',
    room: 'Lifting Deck'
  },
  {
    id: 'cls-tue-01',
    day: 'Tuesday',
    time: '06:30 AM',
    name: 'Olympic Snatch & Clean Mechanics',
    category: 'Strength',
    instructor: 'Jordan Reed',
    duration: '60 mins',
    capacity: 10,
    reserved: 8,
    intensity: 'Very High',
    room: 'Lifting Deck'
  },
  {
    id: 'cls-tue-02',
    day: 'Tuesday',
    time: '05:30 PM',
    name: 'Combat Strike Boxing Intervals',
    category: 'HIIT',
    instructor: 'Samantha Brooks',
    duration: '45 mins',
    capacity: 16,
    reserved: 14,
    intensity: 'High',
    room: 'Functional Arena'
  },
  {
    id: 'cls-wed-01',
    day: 'Wednesday',
    time: '06:00 AM',
    name: 'Tabata Sprint Inferno',
    category: 'HIIT',
    instructor: 'Alex Vance',
    duration: '45 mins',
    capacity: 15,
    reserved: 9,
    intensity: 'High',
    room: 'Studio A (Main Turf)'
  },
  {
    id: 'cls-wed-02',
    day: 'Wednesday',
    time: '05:30 PM',
    name: 'Gymnastic Ring Calisthenics',
    category: 'Strength',
    instructor: 'Liam Gallagher',
    duration: '55 mins',
    capacity: 12,
    reserved: 10,
    intensity: 'High',
    room: 'Functional Arena'
  },
  {
    id: 'cls-thu-01',
    day: 'Thursday',
    time: '06:30 AM',
    name: 'Joint Health & Myofascial Release',
    category: 'Yoga',
    instructor: 'Sarah Jenkins',
    duration: '50 mins',
    capacity: 18,
    reserved: 12,
    intensity: 'Low',
    room: 'Zen Studio 2'
  },
  {
    id: 'cls-fri-01',
    day: 'Friday',
    time: '06:00 PM',
    name: 'Zumba Cardio Rhythm Blast',
    category: 'Zumba',
    instructor: 'Maya Patel',
    duration: '50 mins',
    capacity: 25,
    reserved: 20,
    intensity: 'High',
    room: 'Studio A (Main Turf)'
  }
];

export const initialTestimonials = [
  {
    id: 'tst-01',
    name: 'Vikram Sengupta',
    role: 'Member since 2025',
    goal: 'Strength & Body Recomposition',
    quote: 'Joining this gym completely changed the way I approach fitness. The equipment is Olympic tier, the trainers genuinely know biomechanics, and the community holds you to a higher standard every morning.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    id: 'tst-02',
    name: 'Ananya Verma',
    role: 'Member since 2026',
    goal: 'Cardio Stamina & Stress Relief',
    quote: 'The studio classes here are like nothing I have experienced. The instructors bring unmatched energy, the sound and lights are electric, and booking through the mobile portal makes scheduling seamless.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    id: 'tst-03',
    name: 'Sameer Rao',
    role: 'VIP Member since 2024',
    goal: 'Injury Rehabilitation & Longevity',
    quote: 'The synergy between the personal trainers and physiotherapy clinic is world-class. Marcus resolved a two-year shoulder impingement, and I am now lifting heavier than ever without pain.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    rating: 5
  }
];

export const initialPrograms = [
  {
    id: 'prg-01',
    slug: 'personal-training',
    title: 'Personal Training',
    category: '1-on-1 Coaching',
    icon: 'UserCheck',
    tagline: 'Customized 1-on-1 coaching designed around your physiological blueprint.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=80',
    description: 'Our bespoke personal training program pairs you with an elite performance coach. We begin with a complete kinetic movement screen, postural evaluation, and metabolic goal audit to engineer a periodized program that guarantees results.',
    intensity: 'Customized to You',
    duration: '60 mins / session',
    frequency: '2–4 sessions / week',
    level: 'All Levels (Beginner to Elite)',
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
    intensity: 'High Energy',
    duration: '45–55 mins',
    frequency: 'Daily Schedules',
    level: 'All Levels Welcome',
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
    intensity: 'Low to Moderate',
    duration: '50–60 mins',
    frequency: '4 sessions / week',
    level: 'Beginner to Advanced',
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
    intensity: 'Maximum Output',
    duration: '45 mins',
    frequency: '3–4 sessions / week',
    level: 'Intermediate to Advanced',
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
    intensity: 'Moderate to High',
    duration: '50 mins',
    frequency: '3 sessions / week',
    level: 'All Levels (No Dance Exp Needed)',
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
    intensity: 'High Heavy Load',
    duration: '60–75 mins',
    frequency: '3–4 sessions / week',
    level: 'Novice to Competitive Lifters',
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
    intensity: 'High Muscle Fatigue',
    duration: '60–75 mins',
    frequency: '4–6 sessions / week',
    level: 'Intermediate to Advanced',
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
    intensity: 'Progressive Deficit',
    duration: '12-Week Roadmap',
    frequency: '4 Workouts + Weekly Check-in',
    level: 'All Levels',
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
    intensity: 'Consultative & Habit-Based',
    duration: '45-Min Consultations',
    frequency: 'Bi-Weekly Review Sessions',
    level: 'All Members',
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
    intensity: 'Therapeutic & Restorative',
    duration: '45–60 mins',
    frequency: 'As Prescribed / Weekly',
    level: 'Rehab to Elite Performance',
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

