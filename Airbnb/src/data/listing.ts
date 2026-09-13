// src/data/listing.ts
// Single source of truth for the listing data consumed by all page sections.

export interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
  /** width / height for the img element (helps CLS) */
  width: number;
  height: number;
}

export interface Highlight {
  id: string;
  /** Icon identifier consumed by the Highlights component */
  icon: 'pool' | 'aircon' | 'checkin';
  title: string;
  description: string;
}

export interface SleepRoom {
  id: string;
  roomName: string;
  bedsDescription: string;
  imageUrl: string;
  altText: string;
}

export interface Amenity {
  id: string;
  category: string;
  name: string;
  available: boolean;
  icon: string;
}

export interface Policy {
  id: string;
  title: string;
  items: string[];
  icon: 'houseRules' | 'safety' | 'cancellation';
  fullPolicyText?: string;
}

export interface NearbyStay {
  id: string;
  title: string;
  price: string;
  rating: number;
  imageUrl: string;
}

export interface ListingData {
  id: string;
  title: string;
  subtitle: string;
  rating: number;
  reviewCount: number;
  isSuperhost: boolean;
  location: {
    city: string;
    state: string;
    country: string;
    mapUrl: string;
  };
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  pricePerNight: number;
  currency: string;
  /** Default stay shown in sub-nav before user picks dates */
  defaultStayNights: number;
  /** Guest Favourite badge stats shown in Overview box */
  guestFavourite: {
    rating: number;
    reviewCount: number;
  };
  description: string;
  neighbourhoodHighlights: string;
  highlights: Highlight[];
  sleepRooms: SleepRoom[];
  amenities: Amenity[];
  photos: GalleryPhoto[];
  host: {
    name: string;
    /** Full display name shown in the overview host row */
    displayName: string;
    avatarUrl: string;
    isSuperhost: boolean;
    yearsHosting: number;
    /** Link to host profile page */
    profileUrl: string;
    coHosts: Array<{ 
      name: string; 
      avatarUrl: string;
      reviewsCount?: number;
      rating?: number;
      yearsHosting?: number;
      bio?: Array<{ icon: string; text: string }>;
    }>;
    bio: Array<{ icon: string; text: string }>;
    responseRate: string;
    responseTime: string;
  };
  policies: Policy[];
  nearbyStays: NearbyStay[];
}

const listing: ListingData = {
  id: 'mirashya-ug10',
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  subtitle: 'Entire rental unit in Candolim, India',
  rating: 4.97,
  reviewCount: 134,
  isSuperhost: true,
  location: {
    city: 'Candolim',
    state: 'Goa',
    country: 'India',
    mapUrl: 'https://maps.google.com/?q=Candolim,Goa,India',
  },
  guests: 12,
  bedrooms: 4,
  beds: 4,
  baths: 4.5,
  pricePerNight: 8500,
  currency: '₹',
  defaultStayNights: 5,
  guestFavourite: {
    rating: 4.95,
    reviewCount: 134,
  },

  description: `🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️ 🌴`,

  neighbourhoodHighlights: `Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions. You'll find yourself just a short walk away from the main strip, bustling with vibrant energy during the day and serene calmness at night. The neighbourhood is incredibly friendly, offering an authentic Goan experience mixed with modern conveniences. Explore local markets, indulge in seafood delicacies, or simply relax by the pristine coastline—all within a stone's throw from your front door.`,

  // ── Highlights shown below the Overview block ──────────────
  highlights: [
    {
      id: 'hl-pool',
      icon: 'pool',
      title: 'Dive right in',
      description: 'This is one of the few places in the area with a pool.',
    },
    {
      id: 'hl-aircon',
      icon: 'aircon',
      title: 'Breeze through your stay',
      description: 'Enjoy the luxury of air conditioning during your stay.',
    },
    {
      id: 'hl-checkin',
      icon: 'checkin',
      title: 'Self check-in',
      description: 'Check yourself in with the lockbox.',
    },
  ],

  // ── "Where you'll sleep" Rooms ───────────────────────────────
  sleepRooms: [
    {
      id: 'room-1',
      roomName: 'Bedroom',
      bedsDescription: '1 double bed',
      imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop',
      altText: 'Bedroom with double bed',
    },
    {
      id: 'room-2',
      roomName: 'Living room',
      bedsDescription: '1 sofa',
      imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80&auto=format&fit=crop',
      altText: 'Living room with sofa',
    },
  ],

  // ── Amenities ────────────────────────────────────────────────
  amenities: [
    { id: 'a1', category: 'Scenic views', name: 'Courtyard view', available: true, icon: 'view' },
    { id: 'a2', category: 'Bathroom', name: 'Bathtub', available: true, icon: 'bathtub' },
    { id: 'a3', category: 'Bathroom', name: 'Hair dryer', available: true, icon: 'hairdryer' },
    { id: 'a4', category: 'Bedroom and laundry', name: 'Washer', available: true, icon: 'washer' },
    { id: 'a5', category: 'Entertainment', name: 'TV', available: true, icon: 'tv' },
    { id: 'a6', category: 'Heating and cooling', name: 'Air conditioning', available: true, icon: 'aircon' },
    { id: 'a7', category: 'Internet and office', name: 'Wifi', available: true, icon: 'wifi' },
    { id: 'a8', category: 'Internet and office', name: 'Dedicated workspace', available: true, icon: 'workspace' },
    { id: 'a9', category: 'Kitchen and dining', name: 'Kitchen', available: true, icon: 'kitchen' },
    { id: 'a10', category: 'Location features', name: 'Private entrance', available: true, icon: 'entrance' },
    { id: 'a11', category: 'Outdoor', name: 'Private patio or balcony', available: true, icon: 'patio' },
    { id: 'a12', category: 'Parking and facilities', name: 'Free parking on premises', available: true, icon: 'parking' },
    { id: 'a13', category: 'Parking and facilities', name: 'Pool', available: true, icon: 'pool' },
    { id: 'a14', category: 'Parking and facilities', name: 'Private hot tub', available: true, icon: 'hottub' },
    { id: 'a15', category: 'Services', name: 'Pets allowed', available: true, icon: 'pets' },
    { id: 'a16', category: 'Home safety', name: 'Exterior security cameras on property', available: true, icon: 'camera' },
    { id: 'a17', category: 'Home safety', name: 'Carbon monoxide alarm', available: false, icon: 'co2' },
    { id: 'a18', category: 'Home safety', name: 'Smoke alarm', available: false, icon: 'smoke' },
  ],

  // ── Gallery photos (Unsplash – free to use) ──────────────────
  // Index 0 = hero (large left tile); indices 1-4 = 2×2 right grid
  photos: [
    {
      id: 'photo-1',
      url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80&auto=format&fit=crop',
      alt: 'Living room with sea-view balcony and modern furnishings',
      width: 1200,
      height: 800,
    },
    {
      id: 'photo-2',
      url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop',
      alt: 'Luxury bedroom with king-sized bed and ambient lighting',
      width: 800,
      height: 600,
    },
    {
      id: 'photo-3',
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80&auto=format&fit=crop',
      alt: 'Private jacuzzi bathtub with candles and mood lighting',
      width: 800,
      height: 600,
    },
    {
      id: 'photo-4',
      url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop',
      alt: 'Fully equipped modern kitchen with marble countertops',
      width: 800,
      height: 600,
    },
    {
      id: 'photo-5',
      url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80&auto=format&fit=crop',
      alt: 'Pool area and outdoor lounge with tropical garden view',
      width: 800,
      height: 600,
    },
    // Extra photos shown in photo tour / lightbox only
    {
      id: 'photo-6',
      url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80&auto=format&fit=crop',
      alt: 'Sunlit bathroom with rain shower and stone tiles',
      width: 800,
      height: 600,
    },
    {
      id: 'photo-7',
      url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80&auto=format&fit=crop',
      alt: 'Candolim beach view at sunset from the building rooftop',
      width: 800,
      height: 600,
    },
    {
      id: 'photo-8',
      url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&auto=format&fit=crop',
      alt: 'Cosy dining area with rattan chairs and warm lighting',
      width: 800,
      height: 600,
    },
  ],

  // ── Reviews Overview ─────────────────────────────────────────
  reviewsOverview: {
    rating: 4.95,
    totalReviews: 134,
    description: "One of the most loved homes on Airbnb based on ratings, reviews, and reliability.",
    categories: [
      { id: 'cat-clean', name: 'Cleanliness', score: 5.0, icon: 'clean' },
      { id: 'cat-acc', name: 'Accuracy', score: 4.9, icon: 'accuracy' },
      { id: 'cat-check', name: 'Check-in', score: 5.0, icon: 'checkin' },
      { id: 'cat-comm', name: 'Communication', score: 4.9, icon: 'comm' },
      { id: 'cat-loc', name: 'Location', score: 4.8, icon: 'location' },
      { id: 'cat-val', name: 'Value', score: 4.8, icon: 'value' },
    ],
    tags: [
      { id: 'tag-1', icon: '🛋️', label: 'Comfort', count: 6 },
      { id: 'tag-2', icon: '✅', label: 'Accuracy', count: 5 },
      { id: 'tag-3', icon: '🪵', label: 'Hot tub', count: 5 },
      { id: 'tag-4', icon: '🪣', label: 'Condition', count: 4 },
      { id: 'tag-5', icon: '🎁', label: 'Hospitality', count: 8 },
      { id: 'tag-6', icon: '🛍️', label: 'Cleanliness', count: 4 },
      { id: 'tag-7', icon: '🧺', label: 'Amenities', count: 2 },
    ]
  },

  // ── Individual Reviews ───────────────────────────────────────
  reviews: [
    {
      id: 'rev-1',
      authorName: 'Alex',
      authorAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80&auto=format&fit=crop',
      memberSince: '4 years on Airbnb',
      rating: 5,
      date: 'October 2023',
      text: 'Absolutely stunning property. The views of the beach from the rooftop are unparalleled, and the interior is decorated with incredible taste. We spent most of our evenings on the balcony just listening to the waves. Highly recommended for anyone looking for a peaceful getaway. The host was also very responsive to all our queries.'
    },
    {
      id: 'rev-2',
      authorName: 'Sam',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80&auto=format&fit=crop',
      memberSince: '2 years on Airbnb',
      rating: 5,
      date: 'September 2023',
      text: 'Clean, comfortable, and exactly as described. The check-in process was seamless. Would definitely stay here again.'
    },
    {
      id: 'rev-3',
      authorName: 'Jordan',
      authorAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80&auto=format&fit=crop',
      memberSince: '6 months on Airbnb',
      rating: 4,
      date: 'August 2023',
      text: 'The location is fantastic, just a short walk to the main beach and lots of great restaurants nearby. The only minor issue was the Wi-Fi being a bit spotty on our last day, but everything else was wonderful.'
    },
    {
      id: 'rev-4',
      authorName: 'Casey',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop',
      memberSince: '7 years on Airbnb',
      rating: 5,
      date: 'July 2023',
      text: 'Our family had an amazing time here. The pool area is fantastic and the kids loved it. Mirashya was a great host, provided us with a list of local recommendations that we thoroughly enjoyed. The kitchen is fully equipped which made cooking breakfasts really easy.'
    },
    {
      id: 'rev-5',
      authorName: 'Taylor',
      authorAvatar: '', // Test empty avatar for initial fallback
      memberSince: '1 year on Airbnb',
      rating: 5,
      date: 'June 2023',
      text: 'Perfect stay. The bed was incredibly comfortable and the bathroom feels like a spa.'
    },
    {
      id: 'rev-6',
      authorName: 'Riley',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop',
      memberSince: '3 years on Airbnb',
      rating: 5,
      date: 'May 2023',
      text: 'Exceeded all our expectations. The photos really don\'t do this place justice. We will be coming back next summer for sure.'
    }
  ],

  host: {
    name: 'Mirashya',
    displayName: 'Mirashya Homes',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop',
    isSuperhost: true,
    yearsHosting: 2,
    profileUrl: '/host/mirashya',
    coHosts: [
      { 
        name: 'Sharath', 
        avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80&auto=format&fit=crop',
        reviewsCount: 82,
        rating: 4.88,
        yearsHosting: 1,
        bio: [
          { icon: 'balloon', text: 'Born in the 90s' },
          { icon: 'work', text: 'My work: Designer' }
        ]
      },
      { name: 'Aman Dev Pahwa', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80&auto=format&fit=crop' },
      { name: 'Maria Karen Priyanka', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop' },
      { name: 'Simran', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop' },
      { name: 'Pallavi', avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80&auto=format&fit=crop' },
      { name: 'Sanyukta', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop' },
      { name: 'Shruti', avatarUrl: '' },
      { name: 'Amisha', avatarUrl: '' }
    ],
    bio: [
      { icon: 'balloon', text: 'Born in the 80s' },
      { icon: 'graduation', text: 'Where I went to school: NICMAR GOA' },
      { icon: 'work', text: 'My work: Hospitality' }
    ],
    responseRate: '100%',
    responseTime: 'within an hour',
  },

  // ── Policies ──────────────────────────────────────────────────
  policies: [
    {
      id: 'pol-1',
      title: 'House rules',
      icon: 'houseRules',
      items: [
        'Check-in: 2:00 pm – 10:00 pm',
        'Checkout before 11:00 am',
        '12 guests maximum'
      ],
      fullPolicyText: 'Additional rules: No parties or events allowed. Please respect the neighbors and keep noise down after 10 PM. No smoking inside the property.'
    },
    {
      id: 'pol-2',
      title: 'Safety & property',
      icon: 'safety',
      items: [
        'Exterior security cameras on property',
        'Pool/hot tub without a gate or lock',
        'Carbon monoxide alarm not reported'
      ],
      fullPolicyText: 'Please be careful around the pool area as there is no gate. Security cameras are located at the front entrance and facing the driveway. The host has not indicated whether a carbon monoxide alarm is installed, so please take necessary precautions.'
    },
    {
      id: 'pol-3',
      title: 'Cancellation policy',
      icon: 'cancellation',
      items: [
        'Free cancellation for 48 hours.',
        'Review the Host\'s full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.'
      ],
      fullPolicyText: 'After 48 hours, cancel up to 7 days before check-in and get a 50% refund, minus the service fee. Cancel within 7 days of your trip and the reservation is non-refundable.'
    }
  ],

  // ── Nearby Stays ──────────────────────────────────────────────
  nearbyStays: [
    {
      id: 'ns-1',
      title: 'Beautiful Studio with a view to die for',
      price: '₹23,600',
      rating: 4.91,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80&auto=format&fit=crop'
    },
    {
      id: 'ns-2',
      title: 'NAQAB - 1bhk with private pool',
      price: '₹42,218',
      rating: 4.95,
      imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80&auto=format&fit=crop'
    },
    {
      id: 'ns-3',
      title: 'Greentique Luxury Flat with plunge pool, Calangute',
      price: '₹44,506',
      rating: 4.94,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80&auto=format&fit=crop'
    },
    {
      id: 'ns-4',
      title: 'The Tropical Studio | 5 mins to Beach',
      price: '₹22,824',
      rating: 4.96,
      imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80&auto=format&fit=crop'
    },
    {
      id: 'ns-5',
      title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute',
      price: '₹39,942',
      rating: 4.95,
      imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80&auto=format&fit=crop'
    },
    {
      id: 'ns-6',
      title: 'Kanso by Earthen Window | Jacuzzi | Terrace | Pool',
      price: '₹45,648',
      rating: 5.0,
      imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80&auto=format&fit=crop'
    },
    {
      id: 'ns-7',
      title: 'Luxury Apt | Private Pool | 6 Mins from Beach',
      price: '₹48,786',
      rating: 4.93,
      imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80&auto=format&fit=crop'
    },
    {
      id: 'ns-8',
      title: 'Serendipity Cottage - Calm Stay in Calangute-Baga.',
      price: '₹22,824',
      rating: 4.92,
      imageUrl: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=600&q=80&auto=format&fit=crop'
    }
  ],
};

export default listing;
