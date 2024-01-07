import z from 'zod';

export const signupSchema = z.object({
  firstName: z.string().min(1).trim(),
  lastName: z.string().min(1).trim(),
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(4).trim(),
});

export const signinSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(4).trim(),
});

export const messageSchema = z
  .object({
    title: z.string(),
    text: z.string(),
    date: z.string(),
    archive: z.boolean(),
  })
  .optional();

const messagesSchema = z.array(messageSchema);

export const userSchema = z.object({
  firstName: z.string().min(1).trim().optional(),
  lastName: z.string().min(1).trim().optional(),
  email: z.string().trim().email().toLowerCase(),
  sex: z.enum(['male', 'female']).default('male'),
  location: z.string().optional(),
  mobile: z.string().optional(),
  avatar: z.string(),
  thumb: z.string(),
  about: z.string().optional(),
  job: z.string().optional(),
  education: z.string().optional(),
  languages: z.array(z.string()).optional(),
  verifiedInfo: z.string().optional(),
  verified: z.boolean().default(false),
  registerDate: z.string().optional(),
  reviewsCount: z.number().optional(),
  overallRate: z.number().optional(),
  likes: z.array(z.string()),
  trips: z.array(z.string()),
  messages: messagesSchema,
});

export const privacySchema = z
  .object({
    text: z.string().min(1).trim(),
  })
  .optional();

export const reportUserSchema = z.object({
  userId: z.string().min(1),
  hostId: z.string().min(1),
  reportType: z.number().min(1),
});

export const feedbackSchema = z.object({
  userId: z.string().min(1),
  text: z.string(),
});

const promotedCitySchema = z.object({
  name: z.string(),
  image: z.string(),
  province: z.string(),
});

export const exploreSchema = z.object({
  specialOffers: z.array(z.string()),
  promotedCities: z.array(promotedCitySchema),
});

export const reviewSchema = z.object({
  userId: z.string(),
  parent: z.string(),
  comment: z.string(),
  userFullName: z.string(),
  avatar: z.string(),
  rate: z.number(),
});

export const reserveSchema = z.object({
  homeId: z.string(),
  hostId: z.string(),
  guestId: z.string(),
  homeTitle: z.string(),
  hostName: z.string(),
  guestName: z.string(),
  adults: z.number(),
  children: z.number(),
  pets: z.boolean(),
  reservedDays: z.array(z.array(z.string())),
  price: z.number(),
  totalNights: z.number(),
  totalPrice: z.number(),
  reservedDate: z.string(),
  message: z.string().optional(),
});

export const homeSchema = z.object({
  title: z.string(),
  images: z.array(z.string()),
  host: z.object({
    id: z.string(),
    fullName: z.string(),
    avatar: z.string(),
    verified: z.boolean(),
  }),
  homeType: z.object({
    entire: z.boolean().default(true),
    privateRoom: z.boolean().default(false),
    sharedRoom: z.boolean().default(false),
  }),
  capacity: z.object({
    adults: z.number().default(1),
    children: z.number().default(0),
  }),
  rooms: z.number().default(1),
  beds: z.number().default(1),
  bathrooms: z.number().default(1),
  about: z.object({
    details: z.string(),
    guestAccessibility: z.string(),
    neighborhood: z.string(),
    accessToCityGoods: z.string(),
  }),
  price: z.number(),
  minimumNights: z.number().default(1),
  amenities: z.object({
    wifi: z.boolean().default(false),
    heat: z.boolean().default(false),
    washingMachine: z.boolean().default(false),
    fireplace: z.boolean().default(false),
    iron: z.boolean().default(false),
    laptopFriendly: z.boolean().default(false),
    accessories: z.boolean().default(false),
    cooler: z.boolean().default(false),
    tv: z.boolean().default(false),
    parkingLot: z.boolean().default(false),
    kitchen: z.boolean().default(false),
    hairDryer: z.boolean().default(false),
    firstAids: z.boolean().default(false),
    smokeDetector: z.boolean().default(false),
  }),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    latitudeDelta: z.number(),
    longitudeDelta: z.number(),
  }),
  province: z.string(),
  visitHours: z.tuple([z.number(), z.number()]),
  homeRules: z.object({
    celebrationAllowed: z.boolean().default(false),
    petsAllowed: z.boolean().default(false),
    smokingAllowed: z.boolean().default(false),
    description: z.string(),
  }),
  cancelation: z.number().default(1),
  instanceReserve: z.boolean().default(false),
  reservedDays: z.array(z.array(z.string())),
  overallRate: z.number().default(0),
  reviewsCount: z.number().default(0),
  verified: z.boolean().default(false),
  luxury: z.boolean().default(false),
  popular: z.boolean().default(false),
});
