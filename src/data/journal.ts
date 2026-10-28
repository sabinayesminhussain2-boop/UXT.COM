import { images } from "./catalog";

export type Article = {
  slug: string;
  category: string;
  title: string;
  intro: string;
  readTime: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "timeless-living-room",
    category: "The art of living",
    title: "How to Design a Timeless Living Room",
    intro:
      "Create a space that feels considered, comfortable, and unmistakably yours.",
    readTime: "5 min read",
    image: images.journal,
    imageAlt: "A serene living room with thoughtful furniture placement",
    imagePosition: "50% 55%",
    sections: [
      {
        heading: "Begin with how you live",
        paragraphs: [
          "The most enduring rooms are not designed around a trend; they are shaped by the rituals of the people who use them. Think about where you like to read, gather, rest, or simply watch the light change throughout the day.",
          "Give each activity room to happen naturally. A generous sofa, a comfortable chair and a clear path through the space can do more than a room full of objects.",
        ],
      },
      {
        heading: "Let materials bring the warmth",
        paragraphs: [
          "Natural textures have a way of making a space feel layered without making it feel busy. Combine linen with timber, stone with soft upholstery, and smooth surfaces with a little texture.",
          "A restrained palette need not feel flat. Choose a few shades that sit comfortably together, then let their different grains and weaves provide the character.",
        ],
      },
      {
        heading: "Make space for the personal",
        paragraphs: [
          "A well-loved book, a piece of art or a branch gathered on a walk can tell a more interesting story than a perfectly styled shelf. Leave some breathing room, and allow the space to evolve with you.",
        ],
      },
    ],
  },
  {
    slug: "choosing-the-right-sofa",
    category: "A considered home",
    title: "Choosing the Right Sofa for Your Space",
    intro:
      "A thoughtful guide to proportion, comfort, and finding your perfect place to land.",
    readTime: "4 min read",
    image: images.sofa,
    imageAlt: "A generous neutral sofa styled in a light-filled room",
    imagePosition: "50% 57%",
    sections: [
      {
        heading: "Start with the room",
        paragraphs: [
          "Before choosing a silhouette, measure the space and consider the way you move through it. Marking a sofa’s footprint on the floor can help you understand how it will feel alongside doors, windows and other furniture.",
          "A generous piece can anchor an open room, while a lighter profile may bring balance to a smaller one. The best proportion is the one that leaves the room easy to live in.",
        ],
      },
      {
        heading: "Think about comfort",
        paragraphs: [
          "Consider how you actually sit. A deep seat invites you to curl up; a more upright seat can be better for conversation. Look for a shape that feels right for your everyday routines, not just for a photograph.",
        ],
      },
      {
        heading: "Choose texture with intention",
        paragraphs: [
          "Soft neutrals create a versatile foundation, while the texture of a weave adds depth. Take time with material and colour choices, and think about how they will work with the light and life in your home.",
        ],
      },
    ],
  },
  {
    slug: "understanding-natural-materials",
    category: "Materials & craft",
    title: "Understanding Natural Materials",
    intro:
      "From expressive grain to tactile weaves, a closer look at the beauty of natural character.",
    readTime: "6 min read",
    image: images.materials,
    imageAlt: "A tactile arrangement of wood, linen, stone, bouclé and metal",
    imagePosition: "50% 50%",
    sections: [
      {
        heading: "The beauty of variation",
        paragraphs: [
          "The grain of wood, the surface of stone and the weave of linen all hold their own quiet character. Their subtle variations are part of what gives an interior depth and makes it feel individual.",
          "Rather than asking every surface to match, look for materials that complement one another. A contrast between smooth and textured, light and dark, can create a pleasing sense of balance.",
        ],
      },
      {
        heading: "A palette you can feel",
        paragraphs: [
          "Oak and walnut bring warmth in different registers; linen feels relaxed and soft; bouclé adds a gentle, dimensional texture. Stone offers weight and stillness, while brushed metal adds a quieter gleam.",
          "Begin with one material you love and build around it. Repetition, used sparingly, can make even a simple room feel complete.",
        ],
      },
      {
        heading: "Care for the things you keep",
        paragraphs: [
          "A little thoughtful care helps the things in your home remain beautiful through everyday use. Follow the guidance for each material, use gentle cleaning methods, and embrace the character that comes with living.",
        ],
      },
    ],
  },
];
