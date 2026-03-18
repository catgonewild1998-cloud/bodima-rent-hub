import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  images: string[];
  rooms: number;
  baths: number;
  rating: number;
  featured: boolean;
  category: string;
  type: string;
  description: string;
  owner: string;
  ownerPhone: string;
  propertyType: string;
  furnishing: string;
  availability: string;
  floorArea: string;
  floors: number;
  beds: number;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Luxury Studio Apartment",
    location: "Colombo 03",
    price: "Rs. 45,000",
    image: property1,
    images: [property1, property2, property3, property4],
    rooms: 2,
    baths: 2,
    rating: 4.8,
    featured: true,
    category: "Male",
    type: "Apartment",
    description: "A beautiful luxury studio apartment located in the heart of Colombo 03. This fully furnished property features modern amenities, 24/7 security, and is conveniently located near major shopping centers and restaurants.",
    owner: "Abishek Wimalaweera",
    ownerPhone: "076 5 281 125",
    propertyType: "Apartment",
    furnishing: "Furnished",
    availability: "Available Now",
    floorArea: "1302 sq. ft.",
    floors: 2,
    beds: 4,
  },
  {
    id: "2",
    title: "Cozy Boarding Room",
    location: "Kandy",
    price: "Rs. 15,000",
    image: property2,
    images: [property2, property3, property1],
    rooms: 1,
    baths: 1,
    rating: 4.5,
    featured: false,
    category: "Female",
    type: "Shared Room",
    description: "A cozy and affordable boarding room perfect for students near the University of Peradeniya. Includes Wi-Fi, shared kitchen, and laundry facilities.",
    owner: "Kumari Silva",
    ownerPhone: "071 2 345 678",
    propertyType: "Shared Room",
    furnishing: "Furnished",
    availability: "Available Now",
    floorArea: "250 sq. ft.",
    floors: 1,
    beds: 1,
  },
  {
    id: "3",
    title: "Spacious Villa",
    location: "Galle",
    price: "Rs. 120,000",
    image: property3,
    images: [property3, property4, property5, property6],
    rooms: 4,
    baths: 3,
    rating: 4.9,
    featured: true,
    category: "Family",
    type: "Full House",
    description: "An expansive villa with stunning views in the historic city of Galle. Features a private garden, pool area, and modern kitchen with premium appliances.",
    owner: "Rajith Fernando",
    ownerPhone: "077 8 901 234",
    propertyType: "Full House",
    furnishing: "Fully Furnished",
    availability: "Available Now",
    floorArea: "3200 sq. ft.",
    floors: 2,
    beds: 6,
  },
  {
    id: "4",
    title: "Modern Annex",
    location: "Negombo",
    price: "Rs. 25,000",
    image: property4,
    images: [property4, property1, property5],
    rooms: 2,
    baths: 1,
    rating: 4.3,
    featured: false,
    category: "Couple",
    type: "Annex",
    description: "A modern and well-maintained annex in a quiet residential area of Negombo. Close to the beach and public transportation.",
    owner: "Nimal Perera",
    ownerPhone: "072 3 456 789",
    propertyType: "Annex",
    furnishing: "Unfurnished",
    availability: "Available Now",
    floorArea: "800 sq. ft.",
    floors: 1,
    beds: 2,
  },
  {
    id: "5",
    title: "Premium Apartment",
    location: "Colombo 07",
    price: "Rs. 85,000",
    image: property5,
    images: [property5, property1, property2, property3],
    rooms: 3,
    baths: 2,
    rating: 4.7,
    featured: true,
    category: "Family",
    type: "Apartment",
    description: "A premium high-rise apartment with panoramic city views. Features a gym, swimming pool, and covered parking.",
    owner: "Saman Jayawardena",
    ownerPhone: "074 5 678 901",
    propertyType: "Apartment",
    furnishing: "Furnished",
    availability: "Available Now",
    floorArea: "1800 sq. ft.",
    floors: 1,
    beds: 4,
  },
  {
    id: "6",
    title: "Traditional House",
    location: "Anuradhapura",
    price: "Rs. 35,000",
    image: property6,
    images: [property6, property3, property4],
    rooms: 3,
    baths: 2,
    rating: 4.6,
    featured: false,
    category: "Family",
    type: "Full House",
    description: "A charming traditional Sri Lankan house with a beautiful garden. Located in a peaceful neighborhood near the ancient city.",
    owner: "Mala Dissanayake",
    ownerPhone: "075 6 789 012",
    propertyType: "Full House",
    furnishing: "Unfurnished",
    availability: "Available Now",
    floorArea: "2000 sq. ft.",
    floors: 1,
    beds: 4,
  },
];

export const cities = ["Colombo", "Galle", "Kandy", "Trincomalee", "Negombo", "Anuradhapura", "Kotte"];
export const categories = ["Male", "Female", "Couple", "Family"];
export const propertyTypes = ["Annex", "Apartment", "Full House", "Hostel", "Shared Room"];
