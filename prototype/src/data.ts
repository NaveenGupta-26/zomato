export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text?: string;
  photos?: string[];
  verified: boolean;
}

export interface Activity {
  id: string;
  name: string;
  location: string;
  distance: string;
  price: string;
  offer?: string;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  description: string;
  reviews: Review[];
}

export interface Booking {
  id: string;
  activityId: string;
  date: string;
  status: 'upcoming' | 'completed';
  reviewed: boolean;
}

export interface PlanMember {
  id: string;
  name: string;
  avatar?: string;
  status: 'pending' | 'confirmed' | 'declined';
  ticketCount: number;
  ticketType: 'adult' | 'child';
  paymentStatus: 'pending' | 'paid';
  isHost: boolean;
}

export interface PlanSession {
  id: string;
  sessionCode: string;
  activityId: string;
  hostName: string;
  hostId: string;
  visitDate: string;
  timeSlot: string;
  message?: string;
  deadline: string;
  createdAt: string;
  status: 'planning' | 'booked' | 'completed';
  members: PlanMember[];
  pricePerTicket: number;
}

// Helper: parse numeric price from activity.price string like "₹1200 onwards"
export function parsePrice(priceString: string): number {
  const match = priceString.match(/[\d,]+/);
  if (!match) return 0;
  return parseInt(match[0].replace(/,/g, ''), 10);
}

// ---- Plan Store ----
// All plans are stored in localStorage under this key. The mock Smaaash plan is seeded on first load.
const PLANS_KEY = 'district_plans';

function loadAllPlans(): Record<string, PlanSession> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PLANS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {

    // ignore
  }return {};
}

function persistAllPlans(plans: Record<string, PlanSession>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
}

function ensureSeeded() {
  const plans = loadAllPlans();
  if (!plans[mockActivePlan.id]) {
    plans[mockActivePlan.id] = mockActivePlan;
    persistAllPlans(plans);
  }
}

export function getPlanById(id: string): PlanSession | null {
  ensureSeeded();
  // Always re-seed Smaaash demo plan with fresh mock state so the demo entry point is reliable
  if (id === mockActivePlan.id) {
    const plans = loadAllPlans();
    return plans[id] || mockActivePlan;
  }
  const plans = loadAllPlans();
  return plans[id] || null;
}

export function createPlan(input: {
  activityId: string;
  hostName: string;
  visitDate: string;
  timeSlot: string;
  deadline: string;
  message?: string;
  pricePerTicket: number;
}): PlanSession {
  ensureSeeded();
  const id = `plan-${Date.now()}`;
  const sessionCode = Math.floor(100000 + Math.random() * 900000).toString();
  const newPlan: PlanSession = {
    id,
    sessionCode,
    activityId: input.activityId,
    hostName: 'You',
    hostId: 'user-self',
    visitDate: input.visitDate,
    timeSlot: input.timeSlot,
    message: input.message,
    deadline: input.deadline,
    createdAt: new Date().toISOString(),
    status: 'planning',
    pricePerTicket: input.pricePerTicket,
    members: [
    {
      id: 'user-self',
      name: 'You',
      avatar: 'Y',
      status: 'confirmed',
      ticketCount: 1,
      ticketType: 'adult',
      paymentStatus: 'paid',
      isHost: true
    },
    // Seed a couple of mock invited friends in pending state so the host can see the experience
    {
      id: `friend-${Date.now()}-1`,
      name: 'Aarav',
      avatar: 'A',
      status: 'confirmed',
      ticketCount: 1,
      ticketType: 'adult',
      paymentStatus: 'pending',
      isHost: false
    },
    {
      id: `friend-${Date.now()}-2`,
      name: 'Riya',
      avatar: 'R',
      status: 'pending',
      ticketCount: 0,
      ticketType: 'adult',
      paymentStatus: 'pending',
      isHost: false
    }]

  };
  const plans = loadAllPlans();
  plans[id] = newPlan;
  persistAllPlans(plans);
  return newPlan;
}

export const mockReviews: Review[] = [
{
  id: 'r1',
  author: 'Rahul S.',
  rating: 5,
  date: 'March 2026',
  text: 'Absolutely worth the price! Took my two kids (6 and 9) and we spent the entire day here. The rides are very safe and the staff is attentive. Food inside is a bit pricey but expected. Highly recommend for a family weekend.',
  verified: true,
  photos: [
  'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=300&q=80']

},
{
  id: 'r2',
  author: 'Priya M.',
  rating: 4,
  date: 'April 2026',
  text: 'Great experience overall. The go-karting track is well maintained and the karts are fast. Gets a bit crowded on Sunday evenings so try to go early. Will definitely visit again.',
  verified: true
},
{
  id: 'r3',
  author: 'Arjun K.',
  rating: 3,
  date: 'February 2026',
  text: 'Decent place but half the arcade games were not working. The laser tag was fun though. Good for a one-time visit with friends.',
  verified: true
},
{
  id: 'r4',
  author: 'Neha V.',
  rating: 5,
  date: 'May 2026',
  text: 'Best water park in the city! The wave pool is massive and the new slides are thrilling. Lockers are clean and easily available.',
  verified: true,
  photos: [
  'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=300&q=80']

}];


export const activitiesData: Activity[] = [
{
  id: 'wow-001',
  name: 'Worlds of Wonder',
  location: 'Noida',
  distance: '15 km',
  price: '₹1200 onwards',
  offer: 'Flat 20% off on family packs',
  rating: 4.3,
  reviewCount: 218,
  image:
  'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=800&q=80',
  category: 'Amusement Parks',
  description:
  'Worlds of Wonder is a world-class amusement park featuring over 20 thrilling rides, a massive water park, and dedicated kids zones. Perfect for a full day of family fun.',
  reviews: [mockReviews[0], mockReviews[3]]
},
{
  id: 'hopup-001',
  name: 'HopUp | Jaipur',
  location: 'Jaipur',
  distance: '54 km',
  price: '₹175 onwards',
  offer: 'Flat 30% off on select tickets',
  rating: 4.5,
  reviewCount: 142,
  image: "./WhatsApp_Image_2026-05-12_at_8.24.35_AM.jpg",

  category: 'Game Zones',
  description:
  'The ultimate entertainment destination with trampoline parks, VR gaming, bowling, and arcade games. The only rule is to have fun!',
  reviews: [mockReviews[1]]
},
{
  id: 'fun-001',
  name: 'Fun Kingdom',
  location: 'Jaipur',
  distance: '49 km',
  price: '₹500 onwards',
  offer: 'Flat 20% off on select tickets',
  rating: 4.1,
  reviewCount: 89,
  image:
  'https://images.unsplash.com/photo-1505832018823-50331d70d237?auto=format&fit=crop&w=800&q=80',
  category: 'Amusement Parks',
  description:
  "Jaipur's biggest amusement and adventure park featuring dinosaur exhibits, thrilling rides, and family attractions.",
  reviews: []
},
{
  id: 'snow-001',
  name: 'Snow Kingdom | Mumbai',
  location: 'Mumbai',
  distance: '8 km',
  price: '₹700 onwards',
  offer: 'Upto ₹150 OFF',
  rating: 4.6,
  reviewCount: 356,
  image: "./WhatsApp_Image_2026-05-12_at_8.24.37_AM.jpg",

  category: 'Theme Parks',
  description:
  "Experience -8°C in Mumbai! India's largest snow theme park with real snow, slides, and winter activities.",
  reviews: [mockReviews[0], mockReviews[1], mockReviews[2]]
},
{
  id: 'imagicaa-001',
  name: 'Imagicaa Water Park',
  location: 'Khopoli',
  distance: '77 km',
  price: '₹578 onwards',
  offer: 'Buy 2, Get 1 Free on select tickets',
  rating: 4.4,
  reviewCount: 512,
  image:
  'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=800&q=80',
  category: 'Water Parks',
  description:
  'Go with the flow at Imagicaa Water Park. Featuring thrilling slides, wave pools, and lazy rivers for the perfect summer escape.',
  reviews: [mockReviews[3]]
},
{
  id: 'smaash-001',
  name: 'Smaaash | Utopia City',
  location: 'Mumbai',
  distance: '20 km',
  price: '₹299 onwards',
  rating: 0,
  reviewCount: 0,
  image:
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
  category: 'Go Karting',
  description:
  'Game on! Experience world-class bowling, VR games, and arcade entertainment at Smaaash.',
  reviews: []
},
{
  id: 'zoreko-001',
  name: 'Zoreko | Jaipur',
  location: 'Jaipur',
  distance: '52 km',
  price: '₹1500 onwards',
  rating: 4.2,
  reviewCount: 67,
  image: "./WhatsApp_Image_2026-05-12_at_8.24.35_AM_(1).jpg",

  category: 'Game Zones',
  description:
  'Original Gamers destination. Premium bowling, VR experiences, and high-end arcade games.',
  reviews: [mockReviews[2]]
}];


export const mockBookings: Booking[] = [
{
  id: 'b1',
  activityId: 'wow-001',
  date: 'Yesterday',
  status: 'completed',
  reviewed: false
},
{
  id: 'b2',
  activityId: 'snow-001',
  date: '12 May 2026',
  status: 'completed',
  reviewed: true
},
{
  id: 'b3',
  activityId: 'imagicaa-001',
  date: '25 May 2026',
  status: 'upcoming',
  reviewed: false
}];


export const mockActivePlan: PlanSession = {
  id: 'plan-smaaash-001',
  sessionCode: '482917',
  activityId: 'smaash-001',
  hostName: 'Rohan',
  hostId: 'user-rohan',
  visitDate: 'Sat, 24 May 2026',
  timeSlot: '5:00 PM',
  message: 'Bhai Saturday karting, ₹999 per head, confirm by Thursday',
  deadline: 'Thu, 11:59 PM',
  createdAt: '2026-05-20T10:00:00Z',
  status: 'planning',
  pricePerTicket: 999,
  members: [
  {
    id: 'user-rohan',
    name: 'Rohan (You)',
    avatar: 'R',
    status: 'confirmed',
    ticketCount: 1,
    ticketType: 'adult',
    paymentStatus: 'paid',
    isHost: true
  },
  {
    id: 'user-sneha',
    name: 'Sneha',
    avatar: 'S',
    status: 'confirmed',
    ticketCount: 1,
    ticketType: 'adult',
    paymentStatus: 'pending',
    isHost: false
  },
  {
    id: 'user-vikram',
    name: 'Vikram',
    avatar: 'V',
    status: 'pending',
    ticketCount: 0,
    ticketType: 'adult',
    paymentStatus: 'pending',
    isHost: false
  },
  {
    id: 'user-arjun',
    name: 'Arjun',
    avatar: 'A',
    status: 'confirmed',
    ticketCount: 1,
    ticketType: 'adult',
    paymentStatus: 'pending',
    isHost: false
  },
  {
    id: 'user-neha',
    name: 'Neha',
    avatar: 'N',
    status: 'declined',
    ticketCount: 0,
    ticketType: 'adult',
    paymentStatus: 'pending',
    isHost: false
  }]

};