import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, PageIntro } from "../components/Common";

type InfoKind = "contact" | "faq" | "privacy" | "terms";
const titles: Record<
  InfoKind,
  { eyebrow: string; title: string; intro: string }
> = {
  contact: {
    eyebrow: "INFORMATION / CONTACT",
    title: "GET IN TOUCH.",
    intro: "A note about this UXT concept demonstration.",
  },
  faq: {
    eyebrow: "INFORMATION / FAQ",
    title: "GOOD TO KNOW.",
    intro: "A few helpful notes about exploring the UXT demo.",
  },
  privacy: {
    eyebrow: "INFORMATION / PRIVACY",
    title: "YOUR PRIVACY.",
    intro: "How this prototype handles information in your browser.",
  },
  terms: {
    eyebrow: "INFORMATION / TERMS",
    title: "THE DETAILS.",
    intro: "A little context for using this demonstration.",
  },
};
const copy: Record<InfoKind, { title: string; text: string }[]> = {
  contact: [
    {
      title: "This is a concept demo",
      text: "UXT is a furniture website demonstration. A customer service channel has not been connected, so messages and order enquiries cannot be received through this site.",
    },
    {
      title: "Explore at your own pace",
      text: "You can browse the collection, save your favourite pieces, and try the shopping bag. These interactions are demonstrations only.",
    },
  ],
  faq: [
    {
      title: "Can I purchase these pieces?",
      text: "No. The products, descriptions and prices are illustrative examples. Checkout is a demonstration and does not place an order or collect payment information.",
    },
    {
      title: "Are the images exact product photos?",
      text: "No. The imagery is an AI-generated editorial image library used to illustrate the aesthetic and mood of the concept. It does not depict verified products.",
    },
    {
      title: "Where are my saved pieces kept?",
      text: "The wishlist and shopping bag are stored locally in your browser on this device. They may be removed if you clear your browser data.",
    },
    {
      title: "Can I subscribe to the newsletter?",
      text: "The newsletter form demonstrates validation only. It does not send or save your email address.",
    },
  ],
  privacy: [
    {
      title: "A local demonstration",
      text: "Your shopping bag and wishlist are stored in local storage in your browser so they remain available when you revisit this demo on the same device. Clearing site data removes them.",
    },
    {
      title: "Forms and checkout",
      text: "The newsletter form does not transmit or save your email address. Checkout is not connected to a payment provider and does not collect payment details.",
    },
    {
      title: "About this notice",
      text: "This is a concise demonstration notice, not a production privacy policy. A real service would need an appropriate policy and implementation before launch.",
    },
  ],
  terms: [
    {
      title: "For demonstration only",
      text: "This website is a concept prototype. Product names, descriptions, dimensions, availability, and prices are illustrative and do not constitute commercial offers.",
    },
    {
      title: "Imagery",
      text: "The images are AI-generated editorial scenes and are not exact photographs of the demo products.",
    },
    {
      title: "No orders or payments",
      text: "The cart and checkout are demonstrations. No order is placed, no payment is taken, and no fulfilment is provided through this site.",
    },
  ],
};

export default function InfoPage({ kind }: { kind: InfoKind }) {
  const info = titles[kind];
  return (
    <main className="inner-page info-page">
      <PageIntro
        eyebrow={info.eyebrow}
        title={
          <>
            {info.title.split(" ")[0]}
            <br />
            <em>{info.title.split(" ").slice(1).join(" ")}</em>
          </>
        }
        text={info.intro}
      />
      <div className="wrap info-layout">
        <div>
          <Eyebrow>UXT.COM / INFORMATION</Eyebrow>
          <p>
            FURNITURE FOR
            <br />
            CONSIDERED LIVING.
          </p>
        </div>
        <div className="info-content">
          {copy[kind].map((item, index) => (
            <section key={item.title}>
              <span>0{index + 1}</span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </section>
          ))}
          <Link to="/shop" className="arrow-link">
            CONTINUE EXPLORING <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
