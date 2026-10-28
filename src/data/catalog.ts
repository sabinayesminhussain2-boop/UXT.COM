export const images = {
  hero: "/images/hero-interior.jpg",
  editorial: "/images/editorial-interior.jpg",
  sofa: "/images/sofa-category.jpg",
  chair: "/images/lounge-chair.jpg",
  dining: "/images/dining-category.jpg",
  bedroom: "/images/bedroom-category.jpg",
  forma: "/images/forma-collection.jpg",
  materials: "/images/materials-craft.jpg",
  lifestyle: "/images/lifestyle-campaign.jpg",
  journal: "/images/design-journal.jpg",
} as const;

export type Color = { name: string; hex: string };
export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  categoryLabel: string;
  room: "living" | "dining" | "bedroom";
  collection: "forma" | "atelier" | "still" | "element";
  image: string;
  imageAlt: string;
  imagePosition?: string;
  material: string;
  description: string;
  dimensions: string;
  care: string;
  colors: Color[];
};

// These pieces, specifications and prices are illustrative; the photographs are editorial scenes.
export const products: Product[] = [
  {
    id: "forma-modular-sofa",
    name: "Forma Modular Sofa",
    price: 2490,
    category: "sofas",
    categoryLabel: "Sofas & Sectionals",
    room: "living",
    collection: "forma",
    image: images.sofa,
    imageAlt: "Editorial living room with a generous neutral modular sofa",
    imagePosition: "50% 58%",
    material: "Textured linen · Natural oak",
    description:
      "Generous proportions and soft, architectural lines make this modular sofa a natural place to settle in. A considered centerpiece for the everyday.",
    dimensions: 'Approx. 110" W × 38" D × 28" H',
    care: "Vacuum gently with an upholstery attachment. Blot spills promptly and consult a professional for deep cleaning.",
    colors: [
      { name: "Oatmeal", hex: "#cbbdaa" },
      { name: "Warm grey", hex: "#8c857b" },
      { name: "Charcoal", hex: "#4b4843" },
    ],
  },
  {
    id: "atelier-lounge-chair",
    name: "Atelier Lounge Chair",
    price: 890,
    category: "chairs",
    categoryLabel: "Lounge Chairs",
    room: "living",
    collection: "atelier",
    image: images.chair,
    imageAlt: "Editorial scene of a sculptural upholstered lounge chair",
    imagePosition: "50% 65%",
    material: "Bouclé · Dark walnut",
    description:
      "A quietly expressive lounge chair balancing inviting upholstery with a beautifully grounded silhouette. Made for slow mornings and longer conversations.",
    dimensions: 'Approx. 31" W × 33" D × 30" H',
    care: "Vacuum fabric gently and dust the frame with a soft, dry cloth. Avoid direct, prolonged sunlight.",
    colors: [
      { name: "Taupe", hex: "#978779" },
      { name: "Ivory", hex: "#e4dbcb" },
      { name: "Espresso", hex: "#51443c" },
    ],
  },
  {
    id: "still-coffee-table",
    name: "Still Coffee Table",
    price: 650,
    category: "tables",
    categoryLabel: "Coffee Tables",
    room: "living",
    collection: "still",
    image: images.forma,
    imageAlt: "Editorial interior with a low, rounded stone coffee table",
    imagePosition: "50% 72%",
    material: "Natural stone · Honed finish",
    description:
      "Low, balanced and quietly sculptural. The Still coffee table brings the natural character of stone into the heart of a room.",
    dimensions: 'Approx. 42" W × 30" D × 14" H',
    care: "Wipe with a soft damp cloth. Use coasters and avoid abrasive or acidic cleaners on stone surfaces.",
    colors: [
      { name: "Travertine", hex: "#c9bba5" },
      { name: "Warm stone", hex: "#a89a86" },
    ],
  },
  {
    id: "element-dining-table",
    name: "Element Dining Table",
    price: 1850,
    category: "dining",
    categoryLabel: "Dining Furniture",
    room: "dining",
    collection: "element",
    image: images.dining,
    imageAlt:
      "Editorial dining room with a dark timber table and upholstered chairs",
    imagePosition: "50% 64%",
    material: "Oak · Dark natural finish",
    description:
      "A simple, generous form designed to bring people together. The Element dining table lets the warmth and grain of timber take the lead.",
    dimensions: 'Approx. 84" W × 38" D × 29" H',
    care: "Wipe with a soft, slightly damp cloth. Use coasters and avoid placing hot objects directly on the surface.",
    colors: [
      { name: "Dark oak", hex: "#665246" },
      { name: "Natural oak", hex: "#b89d7b" },
    ],
  },
  {
    id: "forma-dining-chair",
    name: "Forma Dining Chair",
    price: 420,
    category: "dining",
    categoryLabel: "Dining Furniture",
    room: "dining",
    collection: "forma",
    image: images.dining,
    imageAlt: "Editorial dining space with softly upholstered chairs",
    imagePosition: "75% 78%",
    material: "Upholstery · Oak",
    description:
      "A softer take on the dining chair, with a calm silhouette and a comfortably supportive seat. Equally at home at the table or on its own.",
    dimensions: 'Approx. 22" W × 22" D × 31" H',
    care: "Vacuum upholstery gently and wipe wooden surfaces with a soft, dry cloth.",
    colors: [
      { name: "Sand", hex: "#c7b8a4" },
      { name: "Walnut", hex: "#70594a" },
    ],
  },
  {
    id: "atelier-sideboard",
    name: "Atelier Sideboard",
    price: 1290,
    category: "storage",
    categoryLabel: "Storage",
    room: "living",
    collection: "atelier",
    image: images.editorial,
    imageAlt:
      "Editorial living room with warm oak cabinetry and considered furniture",
    imagePosition: "35% 52%",
    material: "Walnut · Brushed metal",
    description:
      "Simple lines and a warm timber character make the Atelier sideboard a versatile home for the objects you want close, and the ones you do not.",
    dimensions: 'Approx. 72" W × 18" D × 30" H',
    care: "Dust regularly with a soft cloth. Keep away from excessive moisture and direct heat.",
    colors: [
      { name: "Walnut", hex: "#6a5140" },
      { name: "Natural oak", hex: "#b89d7b" },
    ],
  },
  {
    id: "still-bed-frame",
    name: "Still Bed Frame",
    price: 1690,
    category: "bedroom",
    categoryLabel: "Bedroom",
    room: "bedroom",
    collection: "still",
    image: images.bedroom,
    imageAlt: "Serene editorial bedroom with a softly upholstered bed",
    imagePosition: "50% 64%",
    material: "Natural linen · Upholstered frame",
    description:
      "A soft, grounded frame that creates a peaceful starting point for the bedroom. Its understated form makes room for rest.",
    dimensions: 'Approx. 67" W × 87" D × 38" H (queen)',
    care: "Vacuum upholstery gently. Blot spills immediately and keep out of strong direct sunlight.",
    colors: [
      { name: "Oatmeal", hex: "#cbbdaa" },
      { name: "Warm grey", hex: "#99928a" },
    ],
  },
  {
    id: "element-floor-lamp",
    name: "Element Floor Lamp",
    price: 380,
    category: "lighting",
    categoryLabel: "Lighting & Objects",
    room: "living",
    collection: "element",
    image: images.lifestyle,
    imageAlt: "Warm editorial interior featuring a sculptural floor lamp",
    imagePosition: "75% 50%",
    material: "Linen shade · Brushed metal",
    description:
      "A gentle pool of light, a simple silhouette. Element is a finishing touch that brings warmth and atmosphere to the spaces you use most.",
    dimensions: 'Approx. 17" W × 17" D × 60" H',
    care: "Dust with a clean, dry cloth. Disconnect from power before cleaning.",
    colors: [
      { name: "Natural", hex: "#c7b8a4" },
      { name: "Bronze", hex: "#6a594a" },
    ],
  },
];

export const categories = [
  {
    id: "sofas",
    name: "Sofas & Sectionals",
    image: images.sofa,
    imageAlt: "A neutral modular sofa in a warm living room",
    position: "50% 56%",
  },
  {
    id: "chairs",
    name: "Lounge Chairs",
    image: images.chair,
    imageAlt: "A sculptural upholstered lounge chair",
    position: "50% 68%",
  },
  {
    id: "dining",
    name: "Dining Furniture",
    image: images.dining,
    imageAlt: "A dark timber dining table with upholstered chairs",
    position: "50% 65%",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    image: images.bedroom,
    imageAlt: "An upholstered bed in a peaceful bedroom",
    position: "50% 60%",
  },
  {
    id: "tables",
    name: "Coffee Tables",
    image: images.forma,
    imageAlt: "A low stone coffee table in an architectural room",
    position: "50% 68%",
  },
  {
    id: "lighting",
    name: "Lighting & Objects",
    image: images.lifestyle,
    imageAlt: "A warm interior lit by a sculptural floor lamp",
    position: "78% 50%",
  },
] as const;

export const collections = [
  {
    id: "forma",
    number: "01",
    name: "The Forma Collection",
    description: "Sculptural silhouettes and architectural simplicity.",
    image: images.forma,
    imageAlt: "A sculptural sofa and stone table in an architectural space",
    position: "50% 55%",
    detail:
      "Forma explores the balance between presence and restraint. Fluid silhouettes and thoughtful proportions give every space a sense of ease.",
  },
  {
    id: "atelier",
    number: "02",
    name: "The Atelier Collection",
    description: "Thoughtful craftsmanship and rich natural materials.",
    image: images.chair,
    imageAlt: "A textured lounge chair in a warm, light-filled room",
    position: "50% 63%",
    detail:
      "A study in texture and tactility. Atelier brings rich natural materials and considered details together in forms that invite you in.",
  },
  {
    id: "still",
    number: "03",
    name: "The Still Collection",
    description: "Quiet forms designed for peaceful interiors.",
    image: images.bedroom,
    imageAlt: "An inviting upholstered bed in a serene bedroom",
    position: "50% 60%",
    detail:
      "A little less noise, a little more room to breathe. Still is an invitation to create a home that feels calm, personal and entirely your own.",
  },
] as const;

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
