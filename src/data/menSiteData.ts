import { SiteData } from './siteData';

export const menSiteData: SiteData = {
  brand: {
    name: "Femme Scooty | Men",
    wordmark: "femme scooty.",
    tagline: "Delhi NCR & UP's Trusted Two-Wheeler Scooter Training For Men",
    subTagline: "Learn Scooty With Confidence — Ab Bina Dar Chalayein!",
    foundedYear: 2024,
    founder: "Kajal Kaur",
    studentsTrained: 1000,
    ageRange: "Ages 16 to 60",
    phone: "+91 96256 95363",
    formattedPhone: "+91 96256 95363",
    whatsappNumber: "919625695363",
    whatsappUrl: "https://wa.me/919625695363?text=Hello,%20I%20would%20like%20details%20about%20scooter%20training%20for%20men.",
    email: "info@femmescooty.in",
    address: "Delhi NCR, Lucknow, Mathura, Jodhpur, Ghaziabad and Faridabad",
    heroHeadline: "Learn Scooty With Confidence — Ab Bina Dar Chalayein!",
    heroSubtext: "Experienced Male Trainers • Aapke Ghar Ke Paas • Free Scooty & Petrol",
    heroReassurance: "Cycle aati ho ya nahi, learn scooter riding comfortably and without judgment with patient 1-on-1 guidance.",
    aboutBlurbFooter: "Empowering learners across Delhi NCR, Lucknow, Mathura, and Jodhpur with safe, stress-free scooter training."
  },
  announcement: "Experienced Male Trainers • Free Scooty & Petrol Included • Ghar Ke Paas Training",
  tickerItems: [
    "1000+ Students Trained",
    "Ages 16 to 60",
    "Cycle Aati Ho Ya Nahi",
    "Ghar Ke Paas Training",
    "Experienced Male Trainers",
    "Free Scooty & Petrol Included"
  ],
  story: {
    title: "About Us",
    subtitle: "Hamari Kahani — Scooty Freedom Starts Here!",
    founderStory: "Started in 2024 as a dedicated wing of Femme Scooty, our men's training program ensures that students, working professionals, and senior citizens can learn two-wheeler riding safely and without judgment. Today, we have trained 1000+ students aged 16 to 60 across 6 cities.",
    mission: "Our certified male instructors guide you step-by-step with patience and zero judgment. Chahe aapki umar 16 ho ya 60, learning two-wheeler riding is now simple, practical, and safe.",
    stats: [
      { label: "Students Trained", value: "1,000+" },
      { label: "Age Group", value: "Ages 16 to 60" },
      { label: "Active Cities", value: "6 Cities" },
      { label: "Trainers", value: "Experienced Male" }
    ],
    corePillars: [
      {
        title: "Zero to Hero in 7 Days",
        desc: "No cycling experience needed! Zero se basic balance aur throttle handling aaram se sikhate hain."
      },
      {
        title: "Experienced Male Trainers",
        desc: "Certified, respectful male instructors who guide with zero judgment or pressure."
      },
      {
        title: "Ghar Ke Paas Safe Roads",
        desc: "Door travel karne ki tension nahi. Practice on safe, low-traffic neighborhood roads near your home."
      },
      {
        title: "Free Scooty & Petrol",
        desc: "Automatic gearless scooty and fuel provided during training with zero hidden costs."
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
      tagline: "Master two-wheeler balance from day one!",
      accentColor: "sky",
      image: "/images/men-course-basic.jpg",
      features: [
        "No cycling experience needed (Cycle nahi aati? Koi baat nahi!)",
        "Training near your home (Aapke area ke paas safe roads par)",
        "Free scooty & petrol included (no extra charges)",
        "Patient male trainers & flexible morning/evening slots"
      ]
    },
    {
      id: "4-days-advance",
      name: "4 Days Advance Course",
      badge: "Traffic Confidence",
      duration: "4 Days • 1 Hour Daily",
      idealFor: "Traffic Confidence — Balance hai par road pe dar lagta hai!",
      tagline: "Master city traffic, turns & slopes with ease!",
      accentColor: "sage",
      image: "/images/men-course-advance.jpg",
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
      id: "male-trainers",
      title: "Experienced Male Trainers",
      description: "Certified male trainers in a friendly, judgment-free environment.",
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
      description: "16 saal ke student hon ya 60 saal ke senior citizen, everyone learns at their own pace.",
      iconName: "award"
    },
    {
      id: "flexible-timing",
      title: "Flexible Timings",
      description: "Morning, evening, and weekend slots tailored to your schedule.",
      iconName: "calendar"
    },
    {
      id: "test-ready",
      title: "Road & Test Ready",
      description: "Practical training for parking, U-turns, and RTO driving tests.",
      iconName: "shield"
    }
  ],
  testimonials: [
    {
      id: "rajesh-sharma",
      name: "Rajesh Sharma",
      role: "Working Professional (46 Years)",
      city: "Delhi",
      rating: 5,
      image: "/images/rajesh-sharma.png",
      quote: "At 46, learning two-wheeler balance felt intimidating. But the trainer was respectful and judgment-free. Ab daily office traffic mein aaram se ride karta hoon!"
    },
    {
      id: "amit-patel",
      name: "Amit Patel",
      role: "College Student (20 Years)",
      city: "Lucknow",
      rating: 5,
      image: "/images/amit-patel.png",
      quote: "I knew basic bicycle balance, but traffic on main roads scared me. In just 4 days of the advance course, I gained real road confidence!"
    },
    {
      id: "harish-verma",
      name: "Harish Verma",
      role: "Senior Citizen (58 Years)",
      city: "Ghaziabad",
      rating: 5,
      image: "/images/harish-verma.png",
      quote: "After retirement, having two-wheeler freedom for groceries and daily chores was essential. Trainer taught me with great patience in safe colony lanes."
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
      question: "Will there be an experienced trainer? (Kya experienced trainer sikhayenge?)",
      answer: "Yes, 100% certified male trainers with a patient, respectful approach."
    },
    {
      question: "Can I choose my class timing? (Kya main apna time slot choose kar sakte hain?)",
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
