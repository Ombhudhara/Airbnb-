// src/data/photoTourData.js
// 43 real property photos grouped into 9 exact categories in ground-truth order:
// Living room 1 -> Living room 2 -> Full kitchen -> Bedroom -> Full bathroom -> Gym -> Exterior -> Pool -> Additional photos

export const photoTourData = [
  {
    id: 'cat-living-room-1',
    category: 'Living room 1',
    amenities: ['Sofa', 'Air conditioning', 'Ceiling fan', 'TV'],
    images: [
      {
        id: 'lr1-1',
        src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80&auto=format&fit=crop',
        alt: 'Living room 1 - Main seating area with sea-view balcony and luxury furnishings',
        width: 1600,
        height: 1067,
      },
      {
        id: 'lr1-2',
        src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80&auto=format&fit=crop',
        alt: 'Living room 1 - Designer sofa and warm ambient ceiling lights',
        width: 1200,
        height: 800,
      },
      {
        id: 'lr1-3',
        src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80&auto=format&fit=crop',
        alt: 'Living room 1 - Wall-mounted 4K smart TV and modern entertainment unit',
        width: 1200,
        height: 800,
      },
      {
        id: 'lr1-4',
        src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format&fit=crop',
        alt: 'Living room 1 - Sunlit lounge seating with tropical garden view',
        width: 1200,
        height: 800,
      },
      {
        id: 'lr1-5',
        src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop',
        alt: 'Living room 1 - High ceiling with modern ceiling fan and curated art',
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: 'cat-living-room-2',
    category: 'Living room 2',
    amenities: ['Ceiling fan', 'Hot tub'],
    images: [
      {
        id: 'lr2-1',
        src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80&auto=format&fit=crop',
        alt: 'Living room 2 - Private indoor jacuzzi lounge with romantic mood lighting',
        width: 1600,
        height: 1067,
      },
      {
        id: 'lr2-2',
        src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop',
        alt: 'Living room 2 - Relaxing corner seating adjacent to the hot tub area',
        width: 1200,
        height: 800,
      },
      {
        id: 'lr2-3',
        src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1200&q=80&auto=format&fit=crop',
        alt: 'Living room 2 - Custom hardwood details and silent ceiling fan',
        width: 1200,
        height: 800,
      },
      {
        id: 'lr2-4',
        src: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80&auto=format&fit=crop',
        alt: 'Living room 2 - Evening view showing intimate jacuzzi illumination',
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: 'cat-full-kitchen',
    category: 'Full kitchen',
    amenities: ['Refrigerator', 'Microwave', 'Dishes and silverware', 'Cooking basics', 'Oven', 'Stove'],
    images: [
      {
        id: 'kit-1',
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80&auto=format&fit=crop',
        alt: 'Full kitchen - Fully equipped modern kitchen with premium marble countertops',
        width: 1600,
        height: 1067,
      },
      {
        id: 'kit-2',
        src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&q=80&auto=format&fit=crop',
        alt: 'Full kitchen - Gas stove top and custom contemporary cabinets',
        width: 1200,
        height: 800,
      },
      {
        id: 'kit-3',
        src: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&q=80&auto=format&fit=crop',
        alt: 'Full kitchen - Refrigerator and coffee maker setup',
        width: 1200,
        height: 800,
      },
      {
        id: 'kit-4',
        src: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1600&q=80&auto=format&fit=crop',
        alt: 'Full kitchen - Island counter with breakfast bar seating',
        width: 1600,
        height: 1067,
      },
      {
        id: 'kit-5',
        src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80&auto=format&fit=crop',
        alt: 'Full kitchen - Complete set of dishes, wine glasses and cookware',
        width: 1200,
        height: 800,
      },
      {
        id: 'kit-6',
        src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80&auto=format&fit=crop',
        alt: 'Full kitchen - Dining table adjoining the open-concept cooking zone',
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: 'cat-bedroom',
    category: 'Bedroom',
    amenities: ['Double bed', 'Air conditioning', 'Ceiling fan', 'Wardrobe'],
    images: [
      {
        id: 'bed-1',
        src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80&auto=format&fit=crop',
        alt: 'Bedroom - Luxury master bedroom with plush king-sized bed and city vista',
        width: 1600,
        height: 1067,
      },
      {
        id: 'bed-2',
        src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80&auto=format&fit=crop',
        alt: 'Bedroom - Warm bedside lamps, reading nook, and soft linens',
        width: 1200,
        height: 800,
      },
      {
        id: 'bed-3',
        src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80&auto=format&fit=crop',
        alt: 'Bedroom - Spacious built-in wardrobe with hangers and safe',
        width: 1200,
        height: 800,
      },
      {
        id: 'bed-4',
        src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80&auto=format&fit=crop',
        alt: 'Bedroom - Premium bedding texture and quiet whisper AC unit',
        width: 1200,
        height: 800,
      },
      {
        id: 'bed-5',
        src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80&auto=format&fit=crop',
        alt: 'Bedroom - Natural morning light through blackout drapery',
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: 'cat-full-bathroom',
    category: 'Full bathroom',
    amenities: ['Hair dryer', 'Shampoo', 'Hot water', 'Shower gel'],
    images: [
      {
        id: 'bath-1',
        src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80&auto=format&fit=crop',
        alt: 'Full bathroom - Spa-like glass rain shower with imported stone tiles',
        width: 1600,
        height: 1067,
      },
      {
        id: 'bath-2',
        src: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1200&q=80&auto=format&fit=crop',
        alt: 'Full bathroom - Deep soaking tub and polished chrome fixtures',
        width: 1200,
        height: 800,
      },
      {
        id: 'bath-3',
        src: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80&auto=format&fit=crop',
        alt: 'Full bathroom - Illuminated vanity mirror and complimentary toiletries',
        width: 1200,
        height: 800,
      },
      {
        id: 'bath-4',
        src: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=80&auto=format&fit=crop',
        alt: 'Full bathroom - Fresh plush white towels and bathrobes',
        width: 1200,
        height: 800,
      },
      {
        id: 'bath-5',
        src: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?w=1200&q=80&auto=format&fit=crop',
        alt: 'Full bathroom - Clean modern design with vanity storage and hair dryer',
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: 'cat-gym',
    category: 'Gym',
    amenities: ['Exercise equipment', 'Weights'],
    images: [
      {
        id: 'gym-1',
        src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80&auto=format&fit=crop',
        alt: 'Gym - Community fitness center with cardio and strength equipment',
        width: 1600,
        height: 1067,
      },
      {
        id: 'gym-2',
        src: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1200&q=80&auto=format&fit=crop',
        alt: 'Gym - Dumbbells rack and free weights area',
        width: 1200,
        height: 800,
      },
      {
        id: 'gym-3',
        src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&q=80&auto=format&fit=crop',
        alt: 'Gym - Treadmills with outdoor view and yoga mats',
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: 'cat-exterior',
    category: 'Exterior',
    amenities: ['Patio', 'Balcony', 'Outdoor dining area'],
    images: [
      {
        id: 'ext-1',
        src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80&auto=format&fit=crop',
        alt: 'Exterior - Stunning modern villa architecture and landscaped entrance',
        width: 1600,
        height: 1067,
      },
      {
        id: 'ext-2',
        src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80&auto=format&fit=crop',
        alt: 'Exterior - Rooftop terrace with panoramic sunset views over Candolim',
        width: 1200,
        height: 800,
      },
      {
        id: 'ext-3',
        src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80&auto=format&fit=crop',
        alt: 'Exterior - Private balcony with lounge chairs and tropical greenery',
        width: 1200,
        height: 800,
      },
      {
        id: 'ext-4',
        src: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&q=80&auto=format&fit=crop',
        alt: 'Exterior - Peaceful courtyard garden and paved walkway',
        width: 1200,
        height: 800,
      },
      {
        id: 'ext-5',
        src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80&auto=format&fit=crop',
        alt: 'Exterior - Outdoor dining patio sheltered by modern pergola',
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: 'cat-pool',
    category: 'Pool',
    amenities: ['Pool'],
    images: [
      {
        id: 'pool-1',
        src: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80&auto=format&fit=crop',
        alt: 'Pool - Expansive swimming pool surrounded by sunbeds and palms',
        width: 1600,
        height: 1067,
      },
      {
        id: 'pool-2',
        src: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80&auto=format&fit=crop',
        alt: 'Pool - Crystal clear water and pool steps for easy access',
        width: 1200,
        height: 800,
      },
      {
        id: 'pool-3',
        src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80&auto=format&fit=crop',
        alt: 'Pool - Sun lounger deck ideal for afternoon relaxation',
        width: 1200,
        height: 800,
      },
      {
        id: 'pool-4',
        src: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=1200&q=80&auto=format&fit=crop',
        alt: 'Pool - Illuminated pool water at dusk creating magical atmosphere',
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: 'cat-additional-photos',
    category: 'Additional photos',
    amenities: [],
    images: [
      {
        id: 'add-1',
        src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&q=80&auto=format&fit=crop',
        alt: 'Additional photos - Thoughtful interior details and potted plants',
        width: 1600,
        height: 1067,
      },
      {
        id: 'add-2',
        src: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200&q=80&auto=format&fit=crop',
        alt: 'Additional photos - Warm decorative lighting and handcrafted accents',
        width: 1200,
        height: 800,
      },
      {
        id: 'add-3',
        src: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&q=80&auto=format&fit=crop',
        alt: 'Additional photos - Welcoming entrance foyer with key drop table',
        width: 1200,
        height: 800,
      },
      {
        id: 'add-4',
        src: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80&auto=format&fit=crop',
        alt: 'Additional photos - Quiet reading corner with bohemian textiles',
        width: 1200,
        height: 800,
      },
      {
        id: 'add-5',
        src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80&auto=format&fit=crop',
        alt: 'Additional photos - Sunlight beaming across the polished stone floor',
        width: 1200,
        height: 800,
      },
      {
        id: 'add-6',
        src: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=1200&q=80&auto=format&fit=crop',
        alt: 'Additional photos - Candolim neighbourhood setting near the coast',
        width: 1200,
        height: 800,
      },
    ],
  },
];

// Pre-flatten array of all 43 photos with globalIndex and category reference
export const allPhotosFlat = photoTourData.flatMap((catGroup) =>
  catGroup.images.map((img) => ({
    ...img,
    category: catGroup.category,
    categoryId: catGroup.id,
  }))
).map((img, globalIndex) => ({
  ...img,
  globalIndex, // 0 to 42
  displayIndex: globalIndex + 1, // 1 to 43
  totalPhotos: 43,
}));

// Enriched categories: same structure as photoTourData but each image has globalIndex + displayIndex
let _counter = 0;
export const enrichedCategories = photoTourData.map((cat) => ({
  ...cat,
  images: cat.images.map((img) => {
    const globalIndex = _counter++;
    return {
      ...img,
      globalIndex,
      displayIndex: globalIndex + 1,
    };
  }),
}));
