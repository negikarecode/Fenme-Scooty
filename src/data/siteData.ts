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
  description: string;
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
    heroHeadline: string;
    heroSubtext: string;
    heroReassurance: string;
    aboutBlurbFooter: string;
  };
  announcement: string;
  tickerItems: string[];
  story: {
    title: string;
    subtitle: string;
    founderStory: string;
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
    tagline: "Delhi NCR & UP's Most Trusted Ladies Scooty Training",
    subTagline: "Learn Scooty With Confidence — Ab Bina Dar Chalayein!",
    foundedYear: 2024,
    founder: "Kajal Kaur",
    studentsTrained: 1000,
    ageRange: "Ages 16 to 60",
    phone: "+91 96256 95363",
    formattedPhone: "+91 96256 95363",
    whatsappNumber: "919625695363",
    whatsappUrl: "https://wa.me/919625695363?text=Hello%20Femme%20Scooty,%20I%20would%20like%20more%20details%20about%20scooter%20training.",
    email: "info@femmescooty.in",
    address: "Delhi NCR, Lucknow, Mathura, Jodhpur, Ghaziabad and Faridabad",
    heroHeadline: "Learn Scooty With Confidence — Ab Bina Dar Chalayein!",
    heroSubtext: "100% Female Trainers • Aapke Ghar Ke Paas • Free Scooty & Petrol",
    heroReassurance: "Cycle aati ho ya nahi, learn scooter riding comfortably and without stress with patient 1-on-1 guidance.",
    aboutBlurbFooter: "Empowering women across Delhi NCR, Ghaziabad, Faridabad, Lucknow, Mathura, and Jodhpur with safe, stress-free scooter training."
  },
  announcement: "100% Female Trainers • Free Scooty & Petrol Included • Ghar Ke Paas Training",
  tickerItems: [
    "1,000+ Students Trained",
    "Ages 16 to 60",
    "Cycle Aati Ho Ya Nahi",
    "Ghar Ke Paas Training",
    "100% Female Trainers",
    "Free Scooty & Petrol Included"
  ],
  story: {
    title: "About Us",
    subtitle: "Hamari Kahani — Scooty Freedom Starts Here!",
    founderStory: "Started in 2024 by Kajal Kaur with just 1 trainer and 1 scooty, Femme Scooty began with one simple thought: 'Why should women depend on others for short distances?' Today, we have trained 1,000+ students aged 16 to 60 across 6 cities.",
    mission: "Our polite and patient female trainers guide you step-by-step without rushing or scolding. Aapki umar chahe 16 ho ya 60, learning to ride a scooty is now easy, safe, and empowering.",
    stats: [
      { label: "Students Trained", value: "1,000+" },
      { label: "Age Group", value: "Ages 16 to 60" },
      { label: "Active Cities", value: "6 Cities" },
      { label: "Trainers", value: "100% Female" }
    ],
    corePillars: [
      {
        title: "Zero to Hero in 7 Days",
        desc: "No cycling experience needed! Zero se aasan step-by-step technique ke saath balance sikhate hain."
      },
      {
        title: "Patient Female Trainers",
        desc: "Polite, supportive trainers who understand your fears and guide you with patience."
      },
      {
        title: "Ghar Ke Paas Safe Roads",
        desc: "Door jaane ki zaroorat nahi. Practice on safe, low-traffic neighborhood roads near your home."
      },
      {
        title: "Free Scooty & Petrol",
        desc: "Khud ki scooty nahi hai? Use ours at zero extra cost with all training petrol included."
      }
    ]
  },
  courses: [
    {
      id: "7-days-basic",
      name: "7 Days Basic Course",
      badge: "Most Popular",
      duration: "7 Days • 1 Hour Daily",
      idealFor: "Complete Beginners — Jinhe balance karna bhi nahi aata!",
      tagline: "Overcome your fear from day one!",
      accentColor: "blush",
      image: "/images/course-basic.jpg",
      features: [
        "No cycling experience needed (Cycle nahi aati? Koi baat nahi!)",
        "Training near your home (Aapke area ke paas safe roads par)",
        "Free scooty & petrol included (no extra charges)",
        "Patient female trainers & flexible morning/evening slots"
      ]
    },
    {
      id: "4-days-advance",
      name: "4 Days Advance Course",
      badge: "Traffic Confidence",
      duration: "4 Days • 1 Hour Daily",
      idealFor: "Traffic Confidence — Balance hai par road pe dar lagta hai!",
      tagline: "Master busy roads, turns & flyovers!",
      accentColor: "sky",
      image: "/images/course-advance.jpg",
      features: [
        "Real traffic riding & confidence building",
        "U-turns, slopes, and emergency braking practice",
        "Free pickup & drop for classes",
        "Free scooty & petrol included"
      ]
    }
  ],
  benefits: [
    {
      id: "ladies-only",
      title: "100% Female Trainers",
      description: "Safe, ladies-only environment (no male staff around).",
      iconName: "users"
    },
    {
      id: "ghar-ke-paas",
      title: "Ghar Ke Paas Comfort",
      description: "Practice on safe, familiar roads near your home.",
      iconName: "mapPin"
    },
    {
      id: "scooty-petrol-free",
      title: "Free Scooty & Petrol",
      description: "Khud ki scooty nahi hai? Use ours at zero extra cost.",
      iconName: "sparkles"
    },
    {
      id: "umar-no-bar",
      title: "No Age Bar (16–60)",
      description: "16 saal ki student ho ya 60 saal ki homemaker, everyone learns at their own pace.",
      iconName: "award"
    },
    {
      id: "flexible-timing",
      title: "Flexible Timings",
      description: "Morning, evening, and weekend slots tailored to your schedule.",
      iconName: "calendar"
    },
    {
      id: "zero-pressure",
      title: "Zero-Pressure Learning",
      description: "Cycle nahi aati? Koi baat nahi! Patient trainers aapko bilkul basic se, bina kisi jhijhak ke sikhate hain.",
      iconName: "shield"
    }
  ],
  testimonials: [
    {
      id: "pooja-verma",
      name: "Pooja Verma",
      role: "Homemaker (42 Years)",
      city: "Delhi",
      rating: 5,
      image: "/images/pooja-verma.png",
      quote: "I never thought I could ride a two-wheeler at 42. Cycle bhi nahi aati thi, but trainer didi was so patient and encouraging. Within 7 days, I was riding around my colony with complete ease!"
    },
    {
      id: "simran-kaur",
      name: "Simran Kaur",
      role: "Working Professional (28 Years)",
      city: "Delhi / NCR",
      rating: 5,
      image: "/images/simran-kaur.png",
      quote: "Relying on cabs every morning was exhausting. Femme Scooty helped build my road confidence quickly. Ab daily office apni scooty se travel karti hoon!"
    },
    {
      id: "riya-mehta",
      name: "Riya Mehta",
      role: "College Student (17 Years)",
      city: "Lucknow",
      rating: 5,
      image: "/images/riya-mehta.png",
      quote: "I was nervous before my first class, but the trainers made everything so simple and friendly. Darr bilkul nikal gaya. Now I ride to college independently!"
    }
  ],
  cities: [
    {
      id: "delhi",
      name: "Delhi",
      state: "National Capital Region",
      image: "/images/delhi.png",
      description: "West, East, South, and North Delhi areas covered with doorstep lane training.",
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
      description: "Gomti Nagar, Hazratganj, Aliganj, and all prime Lucknow localities.",
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
      description: "Mathura and Vrindavan peaceful residential corridors for calm practice.",
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
      description: "Structured scooter training across calm neighborhood roads in Jodhpur.",
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
      description: "Indirapuram, Vaishali, Vasundhara, and surrounding society gates.",
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
      description: "Greater Faridabad and Old Faridabad quiet sectors with 1-on-1 trainers.",
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
      question: "Do I need to know cycling first? (Kya cycle chalani aani zaroori hai?)",
      answer: "No! We teach balancing from day one. Over 70% of our students have never ridden a bicycle before. Automatic gearless scooty par pairon ke support se step-by-step balance seekhna bohot aasan hai."
    },
    {
      question: "Do I need my own scooty? (Kya khud ki scooty honi chahiye?)",
      answer: "No, our scooty and petrol are included for free. If you prefer learning on your own scooter, that is welcome too with zero issues."
    },
    {
      question: "Will there be a female trainer? (Kya female trainer hi sikhayengi?)",
      answer: "Yes, 100% female trainers with no male staff around."
    },
    {
      question: "Can I choose my class timing? (Kya main apna time slot choose kar sakti hoon?)",
      answer: "Yes, morning, evening, and weekend slots are available."
    },
    {
      question: "Can senior citizens (ages 50+) learn? (Kya 50+ saal ke log seekh sakte hain?)",
      answer: "Absolutely! We regularly train learners up to age 60 with extra safety, patience, and a comfortable, unhurried pace."
    },
    {
      question: "What if I need extra practice? (Agar aur practice chahiye toh?)",
      answer: "Flexible top-up sessions are readily available until you feel 100% confident on city roads."
    }
  ],
  navLinks: [
    { label: "About Us", href: "#about" },
    { label: "Courses", href: "#courses" },
    { label: "Why Us", href: "#why-us" },
    { label: "Reviews", href: "#reviews" },
    { label: "Locations", href: "#locations" },
    { label: "FAQs", href: "#faq" }
  ]
};
