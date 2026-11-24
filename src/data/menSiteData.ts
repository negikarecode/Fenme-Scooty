import { SiteData } from './siteData';

export const menSiteData: SiteData = {
  brand: {
    name: "Femme Scooty | Men",
    wordmark: "femme scooty.",
    tagline: "Experienced Male Trainers Ke Saath Safe Scooty Training",
    subTagline: "Ab Bina Dar, Khud Scooty Chalana Seekhein",
    foundedYear: 2024,
    founder: "Kajal Kaur",
    studentsTrained: 1000,
    ageRange: "16 se 60 Saal",
    phone: "+91 96256 95363",
    formattedPhone: "+91 96256 95363",
    whatsappNumber: "919625695363",
    whatsappUrl: "https://wa.me/919625695363?text=Namaste,%20mujhe%20men%20scooty%20training%20ke%20baare%20mein%20jaankari%20chahiye.",
    email: "info@femmescooty.in",
    address: "Delhi NCR, Lucknow, Mathura, Jodhpur, Ghaziabad aur Faridabad",
    heroHeadline: "Ab Bina Dar, Khud Scooty Chalana Seekhein",
    heroSubtext: "Experienced Male Trainers • Ghar Ke Paas Training • Scooty aur Petrol Free",
    heroReassurance: "Cycle aati ho ya nahi, hum aapko aaram se, bina kisi judgment ya tension ke scooty chalana sikhayenge.",
    aboutBlurbFooter: "Femme Scooty Men sabhi umar ke purushon ko aasan aur bina kisi judgment ke scooty chalana sikhata hai. Experienced male trainers, aapke ghar ke paas safe mahol."
  },
  announcement: "Experienced Male Trainers • Free Scooty aur Petrol • Ghar Ke Paas Training",
  tickerItems: [
    "1000+ RIDERS SEEKH CHUKE HAIN",
    "16 SE 60 SAAL TAK",
    "CYCLE AATI HO YA NAHI",
    "GHAR KE PAAS TRAINING",
    "EXPERIENCED MALE TRAINERS",
    "FREE SCOOTY AUR PETROL",
    "JUDGMENT-FREE TRAINING"
  ],
  story: {
    title: "Hamari Kahani",
    subtitle: "Har Umar Ke Liye Safe Riding",
    founderStory: "Femme Scooty ne purushon ke liye ye dedicated program shuru kiya taaki chahe school-college ke young students hon, working men hon, ya senior citizens—har koi bina kisi sharam ya jhijhak ke safe mahol mein scooty seekh sake.",
    mission: "Hamare certified male trainers respectful, patient aur friendly tareeqe se 1-on-1 sikhate hain. Chahe aapki umar 16 saal ho ya 60 saal, scooty chalana seekhna ab bilkul aasan aur safe hai.",
    stats: [
      { label: "Riders Seekh Chuke", value: "1,000+" },
      { label: "Umar Ki Seema", value: "16 se 60 Saal" },
      { label: "Active Shehar", value: "6 Shehar" },
      { label: "Trainers", value: "Experienced Male" }
    ],
    corePillars: [
      {
        title: "7 Din Mein Zero se Hero",
        desc: "Cycle ka balance nahi aata? Zero se basic balance aur comfortable throttle control sikhate hain."
      },
      {
        title: "Experienced Male Trainers",
        desc: "Patient aur polite male instructors jo bina kisi judgment ke aaram se guide karte hain."
      },
      {
        title: "Ghar Ke Paas Shaant Sadak",
        desc: "Door jaane ki zaroorat nahi, aapke ghar ke paas safe aur traffic-free sadak par practice hoti hai."
      },
      {
        title: "Free Scooty aur Petrol",
        desc: "Training ke liye hamari automatic scooty aur petrol use karein, koi alag kharcha nahi hai."
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
      accentColor: "sky",
      image: "/images/men-course-basic.jpg",
      features: [
        "Cycle nahi aati? Koi baat nahi, zero se shuru karenge",
        "Aapke ghar ke paas safe aur shaant sadak par 1-on-1 practice",
        "Scooty aur petrol hamari taraf se bilkul free",
        "Experienced male trainer – bina kisi jhijhak ke seekhein"
      ]
    },
    {
      id: "4-days-advance",
      name: "4 Din ka Advance Course",
      badge: "Traffic & Road Confidence",
      duration: "4 Din • Roz 1 Ghanta",
      idealFor: "Balance hai par bheed-bhaad aur traffic mein dar lagta hai",
      tagline: "Gali se nikal kar main road par aaram se chalayein",
      accentColor: "sage",
      image: "/images/men-course-advance.jpg",
      features: [
        "City traffic aur bheed wali sadkon par safe handling",
        "U-turn, flyover slope aur emergency braking control",
        "Rearview mirrors aur lane discipline ki sahi aadat",
        "Free scooty aur petrol training ke dauran"
      ]
    },
    {
      id: "rto-weekend-refresher",
      name: "RTO Test aur Weekend Practice",
      badge: "License & Weekend Special",
      duration: "2-3 Din • Saturday-Sunday Batch",
      idealFor: "Driving license test ki taiyari aur Saturday-Sunday special practice",
      tagline: "Pehli baar mein license test pass karein full confidence se",
      accentColor: "sky",
      image: "/images/men-course-rto.jpg",
      features: [
        "RTO 8-track aur driving skill test ki poori taiyari",
        "Working men ke liye Saturday aur Sunday ke special batch",
        "Tight parking, center stand aur signal rules ki practice",
        "Pehle hi attempt mein driving test pass karein"
      ]
    }
  ],
  benefits: [
    {
      id: "male-trainers",
      title: "Experienced Male Trainers",
      description: "Certified aur professional male trainers jo bina kisi judgment ke aaram se aur dhyan se sikhate hain.",
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
      description: "16 saal ke students se lekar 60 saal ke senior citizens tak, har umar ke liye comfortable pace.",
      iconName: "award"
    },
    {
      id: "flexible-timing",
      title: "Apni Pasand Ka Time",
      description: "Subah ya shaam, jo time aapke office, business ya college ke schedule ke hisaab se suit kare.",
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
      id: "rajesh-sharma",
      name: "Rajesh Sharma",
      role: "Working Professional (46 Saal)",
      city: "Delhi",
      rating: 5,
      image: "/images/rajesh-sharma.png",
      quote: "46 saal ki umar mein scooty seekhna mushkil lag raha tha, par trainer ne bina judge kiye itne aaram se sikhaya ki ab daily office scooty se aaram se jaata hoon."
    },
    {
      id: "amit-patel",
      name: "Amit Patel",
      role: "College Student (20 Saal)",
      city: "Lucknow",
      rating: 5,
      image: "/images/amit-patel.png",
      quote: "Cycle aati thi par scooty traffic mein chalaney mein dar lagta tha. 4 din ke advance course mein saara dar nikal gaya! Trainers bohot friendly hain."
    },
    {
      id: "harish-verma",
      name: "Harish Verma",
      role: "Senior Citizen (58 Saal)",
      city: "Ghaziabad",
      rating: 5,
      image: "/images/harish-verma.png",
      quote: "Retirement ke baad market aur chotey kaamo ke liye scooty zaroori thi. Trainer ne safe colony mein patience se sikhaya. Zindagi ka sabse accha decision raha!"
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
      description: "Jodhpur shahar ke sabhi areas mein shaant sadkon par structured classes.",
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
      answer: "Bilkul nahi! Hamare kaafi students ne pehle kabhi cycle nahi chalayi hoti. Automatic gearless scooty par pairon ke support ke saath aasan step-by-step tareeqe se balance sikhate hain."
    },
    {
      question: "Kya training ke liye apni khud ki scooty lani padegi?",
      answer: "Nahi, bilkul zaroorat nahi hai. Hum aapko training ke liye automatic scooty aur petrol dono provide karte hain, jiska koi alag kharcha nahi hai."
    },
    {
      question: "Kya trainers sach mein experienced aur patient hain?",
      answer: "Haan, 100% experienced male instructors hain jo bina kisi judgment, daant ya jaldbazi ke respectful aur patient tareeqe se sikhate hain."
    },
    {
      question: "Kya senior citizens (50+ saal) scooty chalana seekh sakte hain?",
      answer: "Haan, bilkul! Hamare paas 50 se 60 saal ke kaafi working aur retired men aate hain. Unke liye extra safe, shaant sadak par comfortable pace par practice karwayi jaati hai."
    },
    {
      question: "Class ka time kya rehta hai aur slot kaise book karein?",
      answer: "Subah 6:00 baje se 10:00 baje tak aur shaam ko 4:30 baje se 7:30 baje tak ke flexible slots hain. Working men ke liye Saturday-Sunday weekend batches bhi hain."
    },
    {
      question: "Agar 7 din ke baad bhi thoda confidence chahiye toh?",
      answer: "Aap aasan flexible top-up sessions le sakte hain jab tak aap heavy traffic aur main road par 100% aatmasamman ke saath ride na karne lagein."
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
