export interface Course {
  id: string;
  name: string;
  badge: string;
  duration: string;
  idealFor: string;
  tagline: string;
  accentColor: 'blush' | 'sky' | 'sage';
  features: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  quote: string;
  rating: number;
  image: string;
}

export interface Benefit {
  id: string;
  title: string;
  hinglishHeadline: string;
  description: string;
  microBadge: string;
  iconName: 'users' | 'shield' | 'mapPin' | 'calendar' | 'sparkles' | 'award';
}

export interface CityLocation {
  id: string;
  name: string;
  state: string;
  image: string;
  description: string;
  hubs: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SiteData {
  brand: {
    name: string;
    wordmark: string;
    tagline: string;
    subTagline: string;
    foundedYear: number;
    founder: string;
    studentsTrained: number;
    ageRange: string;
    phone: string;
    formattedPhone: string;
    whatsappNumber: string;
    whatsappUrl: string;
    email: string;
    address: string;
    heroHeadline: {
      lead: string;
      highlight: string;
      tail: string;
    };
    heroSubtext: string;
    aboutBlurbFooter: string;
  };
  announcement: string;
  tickerItems: string[];
  story: {
    title: string;
    founderStory: string;
    milestoneText: string;
    mission: string;
    stats: { label: string; value: string }[];
    corePillars: { title: string; desc: string }[];
  };
  courses: Course[];
  benefits: Benefit[];
  testimonials: Testimonial[];
  cities: CityLocation[];
  faqs: FAQItem[];
  navLinks: { label: string; href: string }[];
}

export const siteData: SiteData = {
  brand: {
    name: "Femme Scooty",
    wordmark: "femme scooty.",
    tagline: "Delhi ki Sabse Trusted Ladies Scooty Training",
    subTagline: "Bina cycle, bina dar... Seedha scooty chalana seekho!",
    foundedYear: 2024,
    founder: "Kajal Kaur",
    studentsTrained: 1000,
    ageRange: "16 to 60",
    phone: "+91 96256 95363",
    formattedPhone: "+91 96256 95363",
    whatsappNumber: "919625695363",
    whatsappUrl: "https://wa.me/919625695363?text=Hi%20Femme%20Scooty,%20I%20would%20like%20to%20inquire%20about%20scooty%20training%20slots.",
    email: "info@femmescooty.in",
    address: "Training Hubs across Delhi NCR, Lucknow, Mathura, Jodhpur, Ghaziabad & Faridabad",
    heroHeadline: {
      lead: "India's dedicated",
      highlight: "women-only scooty academy",
      tail: "for freedom on two wheels."
    },
    heroSubtext: "100% female instructors, zero cycling experience needed, with free scooty and petrol provided near your home.",
    aboutBlurbFooter: "Femme Scooty empowers women across Delhi NCR, Lucknow, Mathura, Jodhpur, Ghaziabad, and Faridabad with stress-free scooter training. 100% female trainers, home-like environment."
  },
  announcement: "100% Female Trainers • Free Scooty & Petrol Included",
  tickerItems: [
    "1000+ WOMEN TRAINED",
    "AGES 16 TO 60",
    "FREE SCOOTY & PETROL",
    "LEARN NEAR YOUR HOME",
    "100% FEMALE TRAINERS",
    "ZERO CYCLING EXPERIENCE NEEDED",
    "FLEXIBLE TIMINGS"
  ],
  story: {
    title: "Scooty Freedom Starts Here!",
    mission: "Why should women depend on anyone else for daily commutes, errands, or spontaneous rides?",
    founderStory: "Started in 2024 by Kajal Kaur (an avid rider herself), Femme Scooty began with just 1 trainer and 1 scooty in Delhi. Kajal observed that many women hesitated to learn simply because traditional driving schools lacked patient female tutors or forced them into intimidating traffic too soon. Today, we have empowered over 1000+ female riders aged 16 to 60 across 6 cities.",
    milestoneText: "From nervous beginners to fearless riders, our structured curriculum eliminates fear through empathy, systematic balance science, and dedicated didi mentors.",
    stats: [
      { label: "Women Trained", value: "1,000+" },
      { label: "Age Group", value: "16 – 60" },
      { label: "Cities Active", value: "6 Major Cities" },
      { label: "Female Mentors", value: "100% Female" }
    ],
    corePillars: [
      {
        title: "Zero to Hero in 7 Days",
        desc: "No cycle or balance background? Our balance progression takes you from nervous to independent in one week."
      },
      {
        title: "Didi-Friendly Trainers",
        desc: "Patient, certified female instructors who understand hesitation and never rush your learning pace."
      },
      {
        title: "Ghar Ke Paas Classes",
        desc: "Step out into your locality's calm, familiar lanes without traveling miles to an open ground."
      },
      {
        title: "Free Scooty + Petrol Included",
        desc: "Do not own a vehicle yet? Use our well-maintained automatic scooters with fuel covered at zero extra charge."
      }
    ]
  },
  courses: [
    {
      id: "7-days-basic",
      name: "7 Days Basic Course",
      badge: "Most Popular",
      duration: "7 Days • 1 Hour Daily",
      idealFor: "Jinhe balance karna bhi nahi aata!",
      tagline: "Pehle din se hi confidence badhta hai!",
      accentColor: "blush",
      image: "/images/course-basic.jpg",
      features: [
        "Cycle nahi aati? Koi baat nahi — zero balance se start",
        "Apke area ke safe roads pe step-by-step practice",
        "Free scooty + petrol included (zero hidden charges)",
        "Female didi trainers — bilkul tension-free learning",
        "Morning & evening flexible batch slots"
      ]
    },
    {
      id: "4-days-advance",
      name: "4 Days Advance Course",
      badge: "Confidence Booster",
      duration: "4 Days • 1 Hour Daily",
      idealFor: "Balance to hai par road pe darr lagta hai!",
      tagline: "Ab gali se highway tak – sab handle karein!",
      accentColor: "sky",
      image: "/images/course-advance.jpg",
      features: [
        "Real market & traffic mein real-world confidence",
        "U-turns, tight alleys & incline slopes master karein",
        "Emergency braking & sudden hazard control techniques",
        "Pillion rider balance & mirror awareness drills",
        "Free scooty and petrol support throughout"
      ]
    },
    {
      id: "rto-weekend-refresher",
      name: "RTO Test & Weekend Refresher",
      badge: "Test & Skills Ready",
      duration: "2-3 Days • Weekend Slots",
      idealFor: "License test nikalna hai ya weekend pe ride polish karni hai!",
      tagline: "Pehli baar mein RTO test clear, full confidence ke saath!",
      accentColor: "sage",
      image: "/images/course-rto.jpg",
      features: [
        "RTO figure-8 track & ramp clearance simulation",
        "Traffic signal rules, road etiquette & signage training",
        "Tight parking, center stand & uphill stopping techniques",
        "Customized weekend morning batches for busy professionals",
        "Complete mock test inspection by senior female instructors"
      ]
    }
  ],
  benefits: [
    {
      id: "ladies-only",
      title: "100% Female Instructors",
      hinglishHeadline: "Ladies-Only Safe Space",
      description: "Only certified female trainers with no intimidating male staff. Ask every question freely in a sisterly, supportive environment.",
      microBadge: "LADIES ONLY ENVIRONMENT",
      iconName: "users"
    },
    {
      id: "scooty-petrol-free",
      title: "Free Scooty & Petrol Provided",
      hinglishHeadline: "Khudki scooty nahi? Hamari use karo",
      description: "You do not need to buy or borrow a scooter before learning. Practice on our light, well-serviced fleet with zero fuel charges.",
      microBadge: "ZERO FUEL COST",
      iconName: "sparkles"
    },
    {
      id: "ghar-ke-paas",
      title: "Learn Near Your Home",
      hinglishHeadline: "Apke area ke safe roads",
      description: "No commuting to distant training tracks. Lessons are arranged in peaceful, quiet roads within or adjacent to your neighborhood.",
      microBadge: "LOCAL CORRIDORS",
      iconName: "mapPin"
    },
    {
      id: "umar-no-bar",
      title: "Umar No Bar (Ages 16 to 60)",
      hinglishHeadline: "16 saal ki beti se 60 saal ki mommy",
      description: "Age is never a hurdle. Whether you are a college student, working mother, or grandmother, training is calibrated to your comfort.",
      microBadge: "ALL AGES WELCOME",
      iconName: "award"
    },
    {
      id: "flexible-timing",
      title: "Flexible Batch Schedules",
      hinglishHeadline: "Office se pehle ya shaam ke slots",
      description: "Early morning, evening, or weekend slots that fit smoothly around office shifts, college timetables, and household routines.",
      microBadge: "CUSTOM TIME SLOTS",
      iconName: "calendar"
    },
    {
      id: "test-ready",
      title: "RTO Test & Road Readiness",
      hinglishHeadline: "RTO test tricks aur emergency braking",
      description: "From figure-8 tracks and stop-and-go maneuvers to road presence and emergency handling, ride out ready for the official driving test.",
      microBadge: "RTO TEST VERIFIED",
      iconName: "shield"
    }
  ],
  testimonials: [
    {
      id: "pooja-verma",
      name: "Pooja Verma",
      role: "Homemaker",
      city: "Delhi",
      rating: 5,
      image: "/images/pooja-verma.png",
      quote: "Main kabhi scooty chala paungi, socha bhi nahi tha. Cycle bhi nahi chalani aati thi mujhe, par Femme Scooty ki didi ne itni patience se sikhaya ki 7 din mein main confidently apni gali mein scooty chala rahi thi."
    },
    {
      id: "simran-kaur",
      name: "Simran Kaur",
      role: "Working Professional",
      city: "Delhi / NCR",
      rating: 5,
      image: "/images/simran-kaur.png",
      quote: "Office jaana ab khud ki scooty pe hota hai. Pehle har jagah drop lena padta tha, ab main apni scooty se khud office jaati hoon. Femme Scooty ki female trainers ne itna confidence diya."
    },
    {
      id: "riya-mehta",
      name: "Riya Mehta",
      role: "Student (16 yrs)",
      city: "Lucknow",
      rating: 5,
      image: "/images/riya-mehta.png",
      quote: "16 saal ki hoon aur pehli baar khud kuch seekha. Summer vacation mein mummy-papa ne mujhe yahan join karwaya. Trainers bilkul friendly the, darr bilkul nahi laga. Ab main khud ride karti hoon!"
    }
  ],
  cities: [
    {
      id: "delhi",
      name: "Delhi",
      state: "National Capital Region",
      image: "/images/delhi.png",
      description: "Covering West, East, South, and North Delhi with door-step practice lanes.",
      hubs: [
        "Vikaspuri",
        "Tilak Nagar",
        "Janakpuri",
        "Uttam Nagar",
        "Nawada",
        "Sagarpur",
        "Kirti Nagar",
        "Moti Nagar",
        "Rajouri Garden",
        "Subhash Nagar",
        "Tagore Garden",
        "Mayapuri",
        "East Delhi",
        "Mayur Vihar",
        "Laxmi Nagar",
        "Shahdara",
        "Dilshad Garden",
        "Preet Vihar",
        "Karkardooma",
        "Geeta Colony",
        "Vivek Vihar",
        "Gandhi Nagar",
        "Mandawali"
      ]
    },
    {
      id: "lucknow",
      name: "Lucknow",
      state: "Uttar Pradesh",
      image: "/images/lucknow.png",
      description: "Comprehensive training across major residential and commercial sectors.",
      hubs: [
        "Hazratganj",
        "Gomti Nagar",
        "Indira Nagar",
        "Alambagh",
        "Chowk",
        "Aminabad",
        "Aliganj",
        "Jankipuram",
        "Rajajipuram",
        "Charbagh",
        "Mahanagar",
        "Telibagh",
        "Nirala Nagar",
        "Aashiana",
        "Sitapur Road",
        "Badshah Nagar",
        "Dilkusha",
        "Dubagga",
        "South City",
        "Jankipuram Extension",
        "Sushant Golf City",
        "Patrakarpuram",
        "Vikas Nagar",
        "Kakori",
        "Malihabad",
        "Chinhat",
        "Mohammadpur"
      ]
    },
    {
      id: "mathura",
      name: "Mathura",
      state: "Uttar Pradesh",
      image: "/images/mathura.png",
      description: "Dedicated safe training corridors across Mathura, Vrindavan, and surrounding blocks.",
      hubs: [
        "Krishna Janmabhoomi",
        "Dwarkadhish Temple Area",
        "Vrindavan Road",
        "Holigate",
        "Katra Keshav Dev",
        "Govind Nagar",
        "Ganesh Nagar",
        "Maholi",
        "Krishna Nagar",
        "Chhata",
        "Govardhan",
        "Barsana",
        "Nandgaon",
        "Gokul",
        "Baldeo",
        "Mahavan",
        "Radha Kund",
        "Kosi Kalan",
        "Mant",
        "Raya",
        "Sadabad",
        "Farah",
        "Aring",
        "Surir",
        "Naugaon",
        "Sonai",
        "Khanpur",
        "Goverdhanpur",
        "Kaman",
        "Kirtholi",
        "Kotban",
        "Nauhjhil"
      ]
    },
    {
      id: "jodhpur",
      name: "Jodhpur",
      state: "Rajasthan",
      image: "/images/jodhpur.png",
      description: "Welcoming female learners in Sun City with structured neighborhood instruction.",
      hubs: [
        "Sardar Market & Clock Tower",
        "Navchowkiya",
        "Shastri Nagar",
        "Ratanada",
        "Basni",
        "Shastri Circle",
        "Pal Road",
        "Shastri Colony",
        "Shanti Nagar",
        "Shyam Nagar",
        "Osian",
        "Bilara",
        "Phalodi",
        "Shergarh",
        "Luni",
        "Bhopalgarh",
        "Tinwari",
        "Balesar",
        "Kheenvsar"
      ]
    },
    {
      id: "ghaziabad",
      name: "Ghaziabad",
      state: "Uttar Pradesh",
      image: "/images/ghaziabad.png",
      description: "Active hubs serving high-density residential societies and township roads.",
      hubs: [
        "Vaishali",
        "Kaushambi",
        "Indirapuram",
        "Raj Nagar District Centre",
        "Vasundhara",
        "Mohan Nagar",
        "Crossings Republik",
        "Sahibabad",
        "Govindpuram",
        "Loni",
        "Abupur",
        "Modinagar",
        "Raj Nagar Extension",
        "Vaibhav Khand",
        "Arya Nagar",
        "Kavi Nagar"
      ]
    },
    {
      id: "faridabad",
      name: "Faridabad",
      state: "Haryana",
      image: "/images/faridabad.png",
      description: "Covering Old and Greater Faridabad, industrial sectors, and surrounding colonies.",
      hubs: [
        "Ballabgarh",
        "Neharpar",
        "Old Faridabad",
        "Greater Faridabad",
        "Jawahar Colony",
        "Gurukul Basti",
        "Mewala Maharajpur",
        "Friends Colony",
        "Chawla Colony",
        "Jeevan Nagar",
        "Nehru Colony",
        "Ashoka Enclave 3",
        "Basantpur",
        "Tikawali Village",
        "Kabulpur",
        "Gazipur",
        "Kanwara Village",
        "Sholaka",
        "Palwal Aligarh Highway",
        "Manjhawali Village",
        "Pirthla",
        "Mithapur",
        "Rajpur Kalan",
        "Railway Colony"
      ]
    }
  ],
  faqs: [
    {
      question: "Do I need to know cycling before joining?",
      answer: "No, cycling experience is completely unnecessary! Over 70% of our successful students had never balanced a bicycle in their lives. We teach weight transfer and balance directly on lightweight automatic scooters with custom dual-support techniques."
    },
    {
      question: "Do I need to bring my own scooty?",
      answer: "Not at all. We provide well-maintained, lightweight automatic scooters and cover all fuel/petrol costs during your training sessions at zero extra cost. If you already have your own scooty and want to practice on it, you can do that too!"
    },
    {
      question: "Do I need a learner's license before classes begin?",
      answer: "You do not need a license to take your initial neighborhood practice sessions with our instructor. However, we guide you through the quick online application for your RTO learner's license so you are 100% compliant before venturing onto main arterial roads."
    },
    {
      question: "Are the instructors really 100% female?",
      answer: "Yes, 100%. Femme Scooty is strictly women-only. Every single instructor is a certified, experienced female trainer who understands anxiety, self-doubt, and the desire for a patient, respectful mentor."
    },
    {
      question: "What are the class timings and how do I book?",
      answer: "We offer flexible slots from 6:00 AM to 10:00 AM in the morning and 4:30 PM to 7:30 PM in the evening, as well as dedicated weekend batches. You can submit the callback form on this page or message us directly on WhatsApp at +91 96256 95363 to reserve your preferred timing."
    },
    {
      question: "What if I need an extra day or two to feel fully confident?",
      answer: "Our trainers focus on mastery rather than rushing a clock. If you need supplemental practice on specific challenges like U-turns or bridge slopes, top-up sessions are readily available at nominal rates."
    }
  ],
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Courses", href: "#courses" },
    { label: "Why Us", href: "#why-us" },
    { label: "Reviews", href: "#reviews" },
    { label: "Locations", href: "#locations" },
    { label: "FAQs", href: "#faq" }
  ]
};
