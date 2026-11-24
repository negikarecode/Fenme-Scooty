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
    tagline: "Delhi NCR aur UP Ki Sabse Bharosemand Ladies Scooty Training",
    subTagline: "Ab Bina Dar, Khud Scooty Chalana Seekhein",
    foundedYear: 2024,
    founder: "Kajal Kaur",
    studentsTrained: 1000,
    ageRange: "16 se 60 Saal",
    phone: "+91 96256 95363",
    formattedPhone: "+91 96256 95363",
    whatsappNumber: "919625695363",
    whatsappUrl: "https://wa.me/919625695363?text=Namaste%20Femme%20Scooty,%20mujhe%20scooty%20training%20ke%20baare%20mein%20jaankari%20chahiye.",
    email: "info@femmescooty.in",
    address: "Delhi NCR, Lucknow, Mathura, Jodhpur, Ghaziabad aur Faridabad",
    heroHeadline: "Ab Bina Dar, Khud Scooty Chalana Seekhein",
    heroSubtext: "100% Mahila Trainers • Aapke Ghar Ke Paas • Scooty aur Petrol Bilkul Free",
    heroReassurance: "Cycle aati ho ya nahi, hum aapko aaram se, bina kisi tension ke scooty chalana sikhayenge.",
    aboutBlurbFooter: "Femme Scooty mahilaon ko aasan aur bina tension ke scooty chalana sikhati hai. 100% mahila trainers, aapke ghar ke paas safe mahol."
  },
  announcement: "100% Mahila Trainers • Free Scooty aur Petrol • Ghar Ke Paas Training",
  tickerItems: [
    "1000+ Mahilayein Seekh Chuki Hain",
    "16 se 60 Saal Tak",
    "Cycle Aati Ho Ya Nahi",
    "Ghar Ke Paas Training",
    "100% Mahila Trainers",
    "Free Scooty aur Petrol",
    "Subse Aaramdaayak Mahol"
  ],
  story: {
    title: "Hamari Kahani",
    subtitle: "Har Mahila Ki Apni Azaadi",
    founderStory: "Kajal Kaur ne 2024 mein Femme Scooty ki shuruat ki taaki mahilaon ko chhote-mote kaamo, bachhon ko school chhodne ya office jaane ke liye kisi aur par nirbhar na hona pade. Sirf 1 trainer aur 1 scooty se shuru hua ye safar aaj 1000 se zyada mahilaon ko azaad aur aatmanirbhar bana chuka hai.",
    mission: "Hamari patient mahila trainers bina kisi daant ya jaldbazi ke bohot aaram se sikhati hain. Umar chahe 16 saal ho ya 60 saal, scooty chalana seekhna ab bilkul aasan aur safe hai.",
    stats: [
      { label: "Mahilayein Seekh Chuki", value: "1,000+" },
      { label: "Umar Ki Seema", value: "16 se 60 Saal" },
      { label: "Active Shehar", value: "6 Shehar" },
      { label: "Trainers", value: "100% Mahila" }
    ],
    corePillars: [
      {
        title: "7 Din Mein Zero se Hero",
        desc: "Cycle ka balance nahi aata? Koi chinta nahi, pehle din se hi aasan technique se balance sikhate hain."
      },
      {
        title: "Patience Wali Didi Trainers",
        desc: "Sirf polite aur patient mahila instructors jo bina daante aaram se guide karti hain."
      },
      {
        title: "Ghar Ke Paas Shaant Sadak",
        desc: "Door jaane ki zaroorat nahi, aapke ghar ke paas safe aur traffic-free sadak par practice hoti hai."
      },
      {
        title: "Free Scooty aur Petrol",
        desc: "Khud ki scooty nahi hai toh hamari automatic scooty use karein, petrol ka koi alag kharcha nahi hai."
      }
    ]
  },
  courses: [
    {
      id: "7-days-basic",
      name: "7 Din ka Basic Course",
      badge: "Sabse Popular",
      duration: "7 Din • Roz 1 Ghanta",
      idealFor: "Jinhe balance karna bhi nahi aata",
      tagline: "Pehle din se hi aapka darr nikal jayega",
      accentColor: "blush",
      image: "/images/course-basic.jpg",
      features: [
        "Cycle nahi aati? Koi baat nahi, zero se shuru karenge",
        "Aapke ghar ke paas safe aur shaant sadak par practice",
        "Scooty aur petrol hamari taraf se bilkul free",
        "Patient mahila trainer – bina kisi darr ke seekhein"
      ]
    },
    {
      id: "4-days-advance",
      name: "4 Din ka Advance Course",
      badge: "Traffic & Road Confidence",
      duration: "4 Din • Roz 1 Ghanta",
      idealFor: "Balance hai par bheed-bhaad aur traffic mein dar lagta hai",
      tagline: "Gali se nikal kar main road par aaram se chalayein",
      accentColor: "sky",
      image: "/images/course-advance.jpg",
      features: [
        "Traffic aur bheed wali sadkon par confidence layein",
        "U-turn, chadhai aur slope aasaani se sambhalein",
        "Emergency braking aur mirrors dekhne ki sahi aadat",
        "Free scooty aur petrol training ke dauran"
      ]
    }
  ],
  benefits: [
    {
      id: "ladies-only",
      title: "Sirf Mahila Trainers",
      description: "Sirf certified mahila trainers jo bina kisi jhijhak ke aaram se aur pyaar se sikhati hain.",
      iconName: "users"
    },
    {
      id: "ghar-ke-paas",
      title: "Ghar Ke Paas Safe Roads",
      description: "Door travel karne ki tension nahi. Training aapke ghar ke paas wali shaant sadak par hoti hai.",
      iconName: "mapPin"
    },
    {
      id: "scooty-petrol-free",
      title: "Free Scooty aur Petrol",
      description: "Khud ki scooty nahi hai? Hamari automatic scooty aur petrol use karein, koi hidden charges nahi.",
      iconName: "sparkles"
    },
    {
      id: "umar-no-bar",
      title: "Umar Ki Koi Seema Nahi",
      description: "16 saal ki beti ho ya 60 saal ki mummy, har umar ke liye customized aur comfortable pace.",
      iconName: "award"
    },
    {
      id: "flexible-timing",
      title: "Apni Pasand Ka Time",
      description: "Subah ya shaam, jo time aapke ghar aur kaam ke schedule ke hisaab se suit kare.",
      iconName: "calendar"
    },
    {
      id: "test-ready",
      title: "RTO Test Ki Taiyari",
      description: "Figure-8, emergency brake aur traffic rules ki training taaki driving test aasaani se pass ho.",
      iconName: "shield"
    }
  ],
  testimonials: [
    {
      id: "pooja-verma",
      name: "Pooja Verma",
      role: "Homemaker (42 Saal)",
      city: "Delhi",
      rating: 5,
      image: "/images/pooja-verma.png",
      quote: "Main kabhi scooty chala paungi, socha bhi nahi tha. Cycle bhi nahi aati thi, par trainer didi ne itne pyaar aur patience se sikhaya ki 7 din mein main aaram se colony mein scooty chala rahi thi."
    },
    {
      id: "simran-kaur",
      name: "Simran Kaur",
      role: "Working Professional (28 Saal)",
      city: "Delhi / NCR",
      rating: 5,
      image: "/images/simran-kaur.png",
      quote: "Office jaane ke liye roz cab ka wait karna padta tha. Ab main apni scooty se aaram se aati-jaati hoon. Femme Scooty ki trainers ne mera dar bilkul khatam kar diya."
    },
    {
      id: "riya-mehta",
      name: "Riya Mehta",
      role: "Student (17 Saal)",
      city: "Lucknow",
      rating: 5,
      image: "/images/riya-mehta.png",
      quote: "17 saal ki hoon aur pehli baar khud kuch seekha. Trainers bohot friendly the, darr bilkul nahi laga. Ab main college aaram se khud ride karke jaati hoon!"
    }
  ],
  cities: [
    {
      id: "delhi",
      name: "Delhi",
      state: "National Capital Region",
      image: "/images/delhi.png",
      description: "West, East, South aur North Delhi ke saare bade areas mein ghar ke paas training.",
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
      description: "Gomti Nagar, Hazratganj, Aliganj sahit pure Lucknow ke localities mein training.",
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
      description: "Mathura aur Vrindavan ke safe corridors mein aaram se seekhein.",
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
      description: "Jodhpur shahar ki mahilaon ke liye shaant sadkon par training.",
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
      description: "Indirapuram, Vaishali, Vasundhara sahit sabhi societies mein door-step training.",
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
      description: "Greater Faridabad aur Old Faridabad ke calm sectors mein structured classes.",
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
      question: "Kya mujhe pehle se cycle chalani aani zaroori hai?",
      answer: "Bilkul nahi! Hamare 70% se zyada students ne kabhi cycle nahi chalayi hoti. Hum direct automatic gearless scooty par dono pairon ke support ke saath aasan tarike se balance sikhate hain."
    },
    {
      question: "Kya training ke liye apni khud ki scooty lani hogi?",
      answer: "Nahi, bilkul zaroorat nahi hai. Hum aapko training ke liye light scooty aur petrol dono dete hain, jiska koi alag kharcha nahi hai. Agar aap apni scooty par seekhna chahein toh wo bhi kar sakte hain."
    },
    {
      question: "Kya shuru karne se pehle learning license hona zaroori hai?",
      answer: "Shuruat ki practice ke liye license nahi chahiye hota kyunki practice safe colony lanes mein hoti hai. Baad mein main road par jaane ke liye hum aapka online learning license apply karwane mein poori madad karte hain."
    },
    {
      question: "Kya saari trainers sach mein mahilayein hi hain?",
      answer: "Haan, 100% sirf certified mahila trainers hi sikhati hain. Femme Scooty sirf mahilaon ke liye hai, taaki aap bina kisi jhijhak aur bina kisi darr ke khul kar seekh sakein."
    },
    {
      question: "Class ka time kya rehta hai aur slot kaise book karein?",
      answer: "Subah 6:00 baje se 10:00 baje tak aur shaam ko 4:30 baje se 7:30 baje tak ke flexible slots hain. Working women ke liye weekend batches bhi hain. Aap upar form bhar sakte hain ya WhatsApp par direct message bhej sakte hain."
    },
    {
      question: "Agar 7 din ke baad bhi thoda dar lage toh kya extra din mil sakte hain?",
      answer: "Haan, bilkul! Hamara maksad hai ki aap poore aatmasamman aur confidence ke saath ride karein. Agar aapko extra din ki practice chahiye toh aasan top-up sessions mil jaate hain."
    }
  ],
  navLinks: [
    { label: "Hamare Baare Mein", href: "#about" },
    { label: "Courses", href: "#courses" },
    { label: "Kyu Chunein", href: "#why-us" },
    { label: "Reviews", href: "#reviews" },
    { label: "Locations", href: "#locations" },
    { label: "Sawal-Jawab", href: "#faq" }
  ]
};
