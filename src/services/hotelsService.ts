// Mock hotels data for different cities
const mockHotelsData: Record<string, Hotel[]> = {
  "New York": [
    {
      id: "hotel-001",
      name: "Luxury Grand Hotel",
      city: "New York",
      country: "USA",
      location: "Manhattan",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      description: "5-star luxury hotel in the heart of Manhattan",
      pricePerNight: 250,
      rating: 4.8,
      reviewCount: 450,
      amenities: ["WiFi", "Swimming Pool", "Gym", "Restaurant", "Spa", "Room Service"],
      availableRooms: 5,
      totalRooms: 50,
    },
    {
      id: "hotel-002",
      name: "Budget Inn Express",
      city: "New York",
      country: "USA",
      location: "Brooklyn",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      description: "3-star comfortable hotel in Brooklyn",
      pricePerNight: 85,
      rating: 4.2,
      reviewCount: 320,
      amenities: ["WiFi", "Air Conditioning", "Parking"],
      availableRooms: 12,
      totalRooms: 40,
    },
    {
      id: "hotel-003",
      name: "Mid-Range Comfort Hotel",
      city: "New York",
      country: "USA",
      location: "Midtown",
      image: "https://images.unsplash.com/photo-1520763185298-1b434c919abe?w=800",
      description: "4-star comfort hotel near Times Square",
      pricePerNight: 180,
      rating: 4.5,
      reviewCount: 380,
      amenities: ["WiFi", "Gym", "Restaurant", "Room Service"],
      availableRooms: 8,
      totalRooms: 35,
    },
    {
      id: "hotel-004",
      name: "Boutique Modern Hotel",
      city: "New York",
      country: "USA",
      location: "SoHo",
      image: "https://images.unsplash.com/photo-1551632786-de41ec84a426?w=800",
      description: "Trendy boutique hotel in SoHo district",
      pricePerNight: 220,
      rating: 4.6,
      reviewCount: 210,
      amenities: ["WiFi", "Gym", "Restaurant", "Room Service", "Swimming Pool"],
      availableRooms: 3,
      totalRooms: 20,
    },
    {
      id: "hotel-005",
      name: "Heritage Palace Hotel",
      city: "New York",
      country: "USA",
      location: "Upper West Side",
      image: "https://images.unsplash.com/photo-1559599810-46394a63c48d?w=800",
      description: "Historic 5-star palace hotel with vintage charm",
      pricePerNight: 300,
      rating: 4.9,
      reviewCount: 520,
      amenities: ["WiFi", "Swimming Pool", "Gym", "Restaurant", "Spa", "Room Service", "Parking"],
      availableRooms: 2,
      totalRooms: 15,
    },
    {
      id: "hotel-006",
      name: "Riverside Retreat",
      city: "New York",
      country: "USA",
      location: "Upper East Side",
      image: "https://images.unsplash.com/photo-1618773421028-1bda4ce3e7b7?w=800",
      description: "Peaceful 4-star hotel overlooking the Hudson River",
      pricePerNight: 195,
      rating: 4.4,
      reviewCount: 290,
      amenities: ["WiFi", "Gym", "Restaurant", "Room Service", "Parking"],
      availableRooms: 6,
      totalRooms: 25,
    },
  ],
  "Los Angeles": [
    {
      id: "hotel-la-001",
      name: "Hollywood Star Hotel",
      city: "Los Angeles",
      country: "USA",
      location: "Hollywood",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      description: "Glamorous hotel near Walk of Fame",
      pricePerNight: 280,
      rating: 4.7,
      reviewCount: 380,
      amenities: ["WiFi", "Swimming Pool", "Gym", "Restaurant", "Spa"],
      availableRooms: 8,
      totalRooms: 60,
    },
    {
      id: "hotel-la-002",
      name: "Beach Paradise Resort",
      city: "Los Angeles",
      country: "USA",
      location: "Santa Monica",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      description: "Beachfront resort with ocean views",
      pricePerNight: 350,
      rating: 4.9,
      reviewCount: 520,
      amenities: ["WiFi", "Swimming Pool", "Gym", "Restaurant", "Spa", "Parking"],
      availableRooms: 4,
      totalRooms: 45,
    },
    {
      id: "hotel-la-003",
      name: "Downtown LA Inn",
      city: "Los Angeles",
      country: "USA",
      location: "Downtown",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
      description: "Modern hotel in the business district",
      pricePerNight: 150,
      rating: 4.3,
      reviewCount: 280,
      amenities: ["WiFi", "Gym", "Restaurant", "Air Conditioning"],
      availableRooms: 15,
      totalRooms: 80,
    },
  ],
  "Mumbai": [
    {
      id: "hotel-mum-001",
      name: "Taj Mahal Palace",
      city: "Mumbai",
      country: "India",
      location: "Colaba",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      description: "Iconic heritage luxury hotel",
      pricePerNight: 400,
      rating: 4.9,
      reviewCount: 850,
      amenities: ["WiFi", "Swimming Pool", "Gym", "Restaurant", "Spa", "Room Service", "Parking"],
      availableRooms: 10,
      totalRooms: 100,
    },
    {
      id: "hotel-mum-002",
      name: "Sea View Hotel",
      city: "Mumbai",
      country: "India",
      location: "Marine Drive",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      description: "Beautiful views of Arabian Sea",
      pricePerNight: 180,
      rating: 4.5,
      reviewCount: 420,
      amenities: ["WiFi", "Restaurant", "Room Service", "Air Conditioning"],
      availableRooms: 7,
      totalRooms: 55,
    },
    {
      id: "hotel-mum-003",
      name: "Business Bay Hotel",
      city: "Mumbai",
      country: "India",
      location: "Bandra Kurla Complex",
      image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800",
      description: "Modern business hotel with excellent amenities",
      pricePerNight: 120,
      rating: 4.3,
      reviewCount: 310,
      amenities: ["WiFi", "Gym", "Restaurant", "Parking", "Air Conditioning"],
      availableRooms: 20,
      totalRooms: 120,
    },
  ],
  "London": [
    {
      id: "hotel-lon-001",
      name: "The Royal Westminster",
      city: "London",
      country: "UK",
      location: "Westminster",
      image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800",
      description: "Historic luxury hotel near Big Ben",
      pricePerNight: 350,
      rating: 4.8,
      reviewCount: 680,
      amenities: ["WiFi", "Restaurant", "Spa", "Room Service", "Gym"],
      availableRooms: 6,
      totalRooms: 80,
    },
    {
      id: "hotel-lon-002",
      name: "Covent Garden Boutique",
      city: "London",
      country: "UK",
      location: "Covent Garden",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      description: "Charming boutique hotel in theatre district",
      pricePerNight: 220,
      rating: 4.6,
      reviewCount: 340,
      amenities: ["WiFi", "Restaurant", "Room Service", "Air Conditioning"],
      availableRooms: 4,
      totalRooms: 30,
    },
  ],
  "Paris": [
    {
      id: "hotel-par-001",
      name: "Le Grand Paris",
      city: "Paris",
      country: "France",
      location: "Champs-Élysées",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      description: "Elegant hotel on the famous avenue",
      pricePerNight: 380,
      rating: 4.9,
      reviewCount: 720,
      amenities: ["WiFi", "Restaurant", "Spa", "Room Service", "Gym", "Swimming Pool"],
      availableRooms: 5,
      totalRooms: 70,
    },
    {
      id: "hotel-par-002",
      name: "Montmartre View Hotel",
      city: "Paris",
      country: "France",
      location: "Montmartre",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
      description: "Romantic hotel with Sacré-Cœur views",
      pricePerNight: 180,
      rating: 4.5,
      reviewCount: 390,
      amenities: ["WiFi", "Restaurant", "Air Conditioning"],
      availableRooms: 8,
      totalRooms: 40,
    },
  ],
  "Dubai": [
    {
      id: "hotel-dub-001",
      name: "Burj Al Luxury",
      city: "Dubai",
      country: "UAE",
      location: "Downtown Dubai",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      description: "Ultra-luxury hotel with Burj Khalifa views",
      pricePerNight: 500,
      rating: 4.9,
      reviewCount: 920,
      amenities: ["WiFi", "Swimming Pool", "Gym", "Restaurant", "Spa", "Room Service", "Parking"],
      availableRooms: 3,
      totalRooms: 50,
    },
    {
      id: "hotel-dub-002",
      name: "Palm Beach Resort",
      city: "Dubai",
      country: "UAE",
      location: "Palm Jumeirah",
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800",
      description: "Beachfront paradise on Palm Island",
      pricePerNight: 420,
      rating: 4.8,
      reviewCount: 680,
      amenities: ["WiFi", "Swimming Pool", "Gym", "Restaurant", "Spa", "Parking"],
      availableRooms: 7,
      totalRooms: 80,
    },
  ],
  "Tokyo": [
    {
      id: "hotel-tok-001",
      name: "Shinjuku Grand Hotel",
      city: "Tokyo",
      country: "Japan",
      location: "Shinjuku",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      description: "Modern hotel in the heart of Tokyo",
      pricePerNight: 280,
      rating: 4.7,
      reviewCount: 540,
      amenities: ["WiFi", "Restaurant", "Gym", "Room Service", "Air Conditioning"],
      availableRooms: 10,
      totalRooms: 120,
    },
  ],
};

export interface RoomType {
  type: string;
  capacity: number;
  price: number;
  available: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  location: string;
  image: string;
  description: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  availableRooms: number;
  totalRooms: number;
}

export interface HotelDetails extends Hotel {
  fullDescription: string;
  images: string[];
  roomTypes: RoomType[];
  reviews: Review[];
  coordinates: { lat: number; lng: number };
  policies: string[];
  contactEmail: string;
  contactPhone: string;
}

export interface HotelSearchParams {
  city: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  rooms: number;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  amenities: string[];
  sortBy: string;
  page: number;
  limit: number;
}

export interface HotelSearchResponse {
  success: boolean;
  data: {
    total: number;
    page: number;
    limit: number;
    hotels: Hotel[];
  };
  message?: string;
}

export const CITIES = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "London",
  "Paris",
  "Tokyo",
  "Dubai",
];

export const AMENITIES = [
  "WiFi",
  "Swimming Pool",
  "Gym",
  "Parking",
  "Restaurant",
  "Air Conditioning",
  "Room Service",
  "Spa",
];

export async function searchHotels(params: Partial<HotelSearchParams>): Promise<HotelSearchResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const {
    city = "",
    minPrice = 0,
    maxPrice = 500,
    minRating = 0,
    amenities = [],
    sortBy = "recommended",
    page = 1,
    limit = 20,
  } = params;

  // Get hotels for city or return empty if no city
  if (!city) {
    return {
      success: true,
      data: {
        total: 0,
        page: 1,
        limit: 20,
        hotels: [],
      },
      message: "Please select a city to search hotels",
    };
  }

  let hotels = mockHotelsData[city] || [];

  // Apply price filter
  hotels = hotels.filter((h) => h.pricePerNight >= minPrice && h.pricePerNight <= maxPrice);

  // Apply rating filter
  if (minRating > 0) {
    hotels = hotels.filter((h) => h.rating >= minRating);
  }

  // Apply amenities filter
  if (amenities.length > 0) {
    hotels = hotels.filter((h) => amenities.every((a) => h.amenities.includes(a)));
  }

  // Apply sorting
  switch (sortBy) {
    case "price_low":
      hotels = [...hotels].sort((a, b) => a.pricePerNight - b.pricePerNight);
      break;
    case "price_high":
      hotels = [...hotels].sort((a, b) => b.pricePerNight - a.pricePerNight);
      break;
    case "rating":
      hotels = [...hotels].sort((a, b) => b.rating - a.rating);
      break;
    case "most_booked":
      hotels = [...hotels].sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    default:
      // recommended - sort by a combination of rating and reviews
      hotels = [...hotels].sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
  }

  // Apply pagination
  const total = hotels.length;
  const startIndex = (page - 1) * limit;
  const paginatedHotels = hotels.slice(startIndex, startIndex + limit);

  return {
    success: true,
    data: {
      total,
      page,
      limit,
      hotels: paginatedHotels,
    },
  };
}

// Detailed hotel data for the details page
const hotelDetailsData: Record<string, HotelDetails> = {
  "hotel-001": {
    id: "hotel-001",
    name: "Luxury Grand Hotel",
    city: "New York",
    country: "USA",
    location: "Manhattan",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    description: "5-star luxury hotel in the heart of Manhattan",
    fullDescription: `Welcome to the Luxury Grand Hotel, a magnificent 5-star establishment nestled in the vibrant heart of Manhattan. Our hotel offers an unparalleled blend of classic elegance and modern sophistication, providing guests with an unforgettable New York experience.

From the moment you step into our grand marble lobby, you'll be enveloped in an atmosphere of refined luxury. Our 50 exquisitely appointed rooms and suites feature floor-to-ceiling windows with breathtaking views of the Manhattan skyline, premium bedding with Egyptian cotton linens, and state-of-the-art amenities.

Indulge in world-class dining at our award-winning restaurant, unwind at our rooftop bar with panoramic city views, or rejuvenate at our full-service spa. Our dedicated concierge team is available 24/7 to ensure your every need is met with the utmost attention to detail.

Located just steps from Central Park, Fifth Avenue shopping, and Broadway theaters, the Luxury Grand Hotel is your perfect base for exploring the best of New York City.`,
    pricePerNight: 250,
    rating: 4.8,
    reviewCount: 450,
    amenities: ["WiFi", "Swimming Pool", "Gym", "Restaurant", "Spa", "Room Service", "Bar", "Concierge", "Valet Parking", "Business Center"],
    availableRooms: 5,
    totalRooms: 50,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    ],
    roomTypes: [
      { type: "Standard Room", capacity: 2, price: 250, available: 2 },
      { type: "Deluxe Room", capacity: 2, price: 350, available: 1 },
      { type: "Executive Suite", capacity: 3, price: 500, available: 1 },
      { type: "Presidential Suite", capacity: 4, price: 800, available: 1 },
    ],
    reviews: [
      {
        id: "rev-001",
        userName: "Sarah M.",
        rating: 5,
        date: "2024-11-15",
        comment: "Absolutely stunning hotel! The views from our room were incredible, and the staff went above and beyond to make our anniversary special. The spa was heavenly!",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      },
      {
        id: "rev-002",
        userName: "James R.",
        rating: 5,
        date: "2024-11-10",
        comment: "Best hotel experience in New York. The location is perfect, rooms are immaculate, and the restaurant serves amazing food. Will definitely return!",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      },
      {
        id: "rev-003",
        userName: "Emily T.",
        rating: 4,
        date: "2024-10-28",
        comment: "Beautiful hotel with excellent amenities. Only minor issue was the wait time for room service during peak hours. Otherwise perfect!",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      },
      {
        id: "rev-004",
        userName: "Michael D.",
        rating: 5,
        date: "2024-10-20",
        comment: "The Presidential Suite exceeded all expectations. Stunning Manhattan views, impeccable service, and the most comfortable bed I've ever slept in.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      },
      {
        id: "rev-005",
        userName: "Lisa W.",
        rating: 5,
        date: "2024-10-15",
        comment: "We celebrated our wedding anniversary here and it was magical. The concierge arranged a surprise champagne and roses in our room. Truly exceptional!",
      },
    ],
    coordinates: { lat: 40.7580, lng: -73.9855 },
    policies: [
      "Check-in: 3:00 PM | Check-out: 11:00 AM",
      "Free cancellation up to 48 hours before check-in",
      "Children of all ages welcome",
      "Pets allowed (additional fee applies)",
      "Non-smoking rooms available",
    ],
    contactEmail: "reservations@luxurygrand.com",
    contactPhone: "+1 (212) 555-0100",
  },
};

// Function to get all hotels as a flat array for lookup
function getAllHotels(): Hotel[] {
  return Object.values(mockHotelsData).flat();
}

export async function getHotelById(hotelId: string): Promise<{ success: boolean; data?: HotelDetails; message?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check if we have detailed data
  if (hotelDetailsData[hotelId]) {
    return { success: true, data: hotelDetailsData[hotelId] };
  }

  // Fallback: find in mock data and generate details
  const allHotels = getAllHotels();
  const hotel = allHotels.find((h) => h.id === hotelId);

  if (!hotel) {
    return { success: false, message: "Hotel not found" };
  }

  // Generate mock details for hotels without detailed data
  const generatedDetails: HotelDetails = {
    ...hotel,
    fullDescription: `${hotel.description}\n\nExperience exceptional hospitality at ${hotel.name}, located in the beautiful ${hotel.location} area of ${hotel.city}. Our hotel offers a perfect blend of comfort and convenience, making it an ideal choice for both business and leisure travelers.\n\nEach of our ${hotel.totalRooms} rooms is thoughtfully designed to provide maximum comfort, featuring modern amenities and elegant décor. Our dedicated staff is committed to ensuring your stay is memorable and enjoyable.`,
    images: [
      hotel.image,
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
    ],
    roomTypes: [
      { type: "Standard Room", capacity: 2, price: hotel.pricePerNight, available: Math.floor(hotel.availableRooms / 2) || 1 },
      { type: "Deluxe Room", capacity: 2, price: Math.round(hotel.pricePerNight * 1.4), available: Math.ceil(hotel.availableRooms / 2) },
    ],
    reviews: [
      {
        id: `${hotelId}-rev-1`,
        userName: "Guest User",
        rating: hotel.rating,
        date: "2024-11-01",
        comment: `Great stay at ${hotel.name}. The location in ${hotel.location} was perfect and the amenities were excellent.`,
      },
    ],
    coordinates: { lat: 40.7128 + Math.random() * 0.1, lng: -74.006 + Math.random() * 0.1 },
    policies: [
      "Check-in: 3:00 PM | Check-out: 11:00 AM",
      "Free cancellation up to 24 hours before check-in",
      "Children welcome",
    ],
    contactEmail: `info@${hotel.name.toLowerCase().replace(/\s+/g, "")}.com`,
    contactPhone: "+1 (555) 000-0000",
  };

  return { success: true, data: generatedDetails };
}
