import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { collections, images } from "../data/catalog";
import { ArrowLink, Eyebrow, PageIntro, Reveal } from "../components/Common";
import Newsletter from "../components/Newsletter";

export default function Collections() {
  return (
    <main className="inner-page collections-page">
      <PageIntro
        eyebrow="A WORLD OF UXT / 01"
        title={
          <>
            COLLECTIONS WITH
            <br />
            <em>CHARACTER.</em>
          </>
        }
        text="Three distinct perspectives on considered living. One shared appreciation for the beauty of everyday life."
        count="THREE PERSPECTIVES / ONE HOME"
      />
      <div className="collections-banner">
        <img
          src={images.forma}
          alt="Sculptural seating in an architectural living room"
        />
        <span>
          FOR SPACES THAT FEEL LIKE YOU <ArrowUpRight size={15} />
        </span>
      </div>
      <div className="wrap collection-page-list">
        {collections.map((collection, index) => (
          <Reveal
            className={`collection-feature ${index % 2 ? "collection-feature--reverse" : ""}`}
            key={collection.id}
          >
            <div className="collection-feature-image">
              <img
                src={collection.image}
                alt={collection.imageAlt}
                style={{ objectPosition: collection.position }}
                loading="lazy"
              />
              <span>THE UXT COLLECTION / {collection.number}</span>
            </div>
            <div className="collection-feature-copy" id={collection.id}>
              <Eyebrow>COLLECTION / {collection.number}</Eyebrow>
              <h2>
                THE{" "}
                {collection.name
                  .replace("The ", "")
                  .replace(" Collection", "")
                  .toUpperCase()}
                <br />
                <em>COLLECTION.</em>
              </h2>
              <p className="collection-feature-lead">
                {collection.description}
              </p>
              <p>{collection.detail}</p>
              <ArrowLink to={`/shop?collection=${collection.id}`}>
                EXPLORE THE COLLECTION
              </ArrowLink>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="collection-end wrap">
        <span>FORM / FUNCTION / FEELING</span>
        <Link to="/shop">
          EXPLORE ALL PIECES <ArrowUpRight size={16} />
        </Link>
      </div>
      <Newsletter />
    </main>
  );
}
