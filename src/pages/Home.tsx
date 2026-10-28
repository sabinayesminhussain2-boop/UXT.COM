import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categories, collections, images, products } from "../data/catalog";
import { articles } from "../data/journal";
import {
  ArrowLink,
  ButtonLink,
  Eyebrow,
  Reveal,
  ScrollCue,
} from "../components/Common";
import { ProductGrid } from "../components/ProductCard";
import JournalCard from "../components/JournalCard";
import Principles from "../components/Principles";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero-image"
          src={images.hero}
          alt="A warm, architectural living room with a sculptural sofa and stone table"
        />
        <div className="hero-shade" />
        <div className="hero-content wrap">
          <div className="hero-eyebrow">
            <span className="line" />
            <span>THE ART OF CONSIDERED LIVING</span>
          </div>
          <h1 id="hero-title">
            DESIGNED FOR
            <br />
            <em>THE WAY YOU LIVE.</em>
          </h1>
          <p>
            Thoughtful furniture. Exceptional materials.
            <br className="desktop-break" /> Spaces that feel like home.
          </p>
          <div className="hero-buttons">
            <ButtonLink to="/collections" variant="light">
              EXPLORE COLLECTIONS
            </ButtonLink>
            <ButtonLink to="/about" variant="outline-light">
              DISCOVER OUR PHILOSOPHY
            </ButtonLink>
          </div>
        </div>
        <div className="hero-bottom wrap">
          <ScrollCue />
          <span className="hero-bottom-right">
            FURNITURE FOR CONSIDERED LIVING <span>—</span> UXT.COM
          </span>
        </div>
        <div className="hero-side-note" aria-hidden="true">
          A HOME, BEAUTIFULLY CONSIDERED <span>01 — 01</span>
        </div>
      </section>

      <section id="our-approach" className="editorial section-pad">
        <div className="wrap">
          <Reveal className="editorial-topline">
            <Eyebrow>01 / OUR PHILOSOPHY</Eyebrow>
            <span>SPACES THAT FEEL LIKE YOU</span>
          </Reveal>
          <div className="editorial-layout">
            <Reveal className="editorial-image">
              <img
                src={images.editorial}
                alt="A contemporary living room with natural oak and warm textures"
                loading="lazy"
              />
              <span className="image-caption">
                A STUDY IN QUIET LIVING <span>01 / 10</span>
              </span>
            </Reveal>
            <Reveal className="editorial-copy">
              <div>
                <span className="section-marker">THE UXT APPROACH</span>
                <h2>
                  THE ART OF
                  <br />
                  <em>LIVING WELL.</em>
                </h2>
                <p>
                  Every detail matters. Discover furniture designed to bring
                  balance, character, and quiet sophistication to your space.
                </p>
                <ArrowLink to="/about">DISCOVER OUR STORY</ArrowLink>
              </div>
              <div className="editorial-small-image">
                <img
                  src={images.chair}
                  alt="A sculptural lounge chair in warm light"
                  loading="lazy"
                />
                <span>FORM / FUNCTION / FEELING</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="categories-section section-pad">
        <div className="wrap">
          <Reveal className="section-heading">
            <div>
              <Eyebrow>02 / FIND YOUR SPACE</Eyebrow>
              <h2>
                ROOM TO <em>LIVE.</em>
              </h2>
            </div>
            <div className="section-heading-side">
              <p>
                Thoughtful pieces for every room, every ritual, and every
                version of home.
              </p>
              <ArrowLink to="/shop">SHOP ALL FURNITURE</ArrowLink>
            </div>
          </Reveal>
          <Reveal className="category-grid">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className={`category-tile category-tile--${index + 1}`}
              >
                <img
                  src={category.image}
                  alt={category.imageAlt}
                  style={{ objectPosition: category.position }}
                  loading="lazy"
                />
                <span className="category-index">0{index + 1} / 06</span>
                <span className="category-bottom">
                  <span>{category.name}</span>
                  <span className="round-arrow">
                    <ArrowUpRight size={18} strokeWidth={1.2} />
                  </span>
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="collections-section section-pad">
        <div className="wrap">
          <Reveal className="section-heading">
            <div>
              <Eyebrow>03 / THE COLLECTIONS</Eyebrow>
              <h2>
                FORMS WITH <em>FEELING.</em>
              </h2>
            </div>
            <div className="section-heading-side">
              <p>
                Distinct perspectives, united by a love of beautiful, purposeful
                design.
              </p>
              <ArrowLink to="/collections">EXPLORE THE COLLECTIONS</ArrowLink>
            </div>
          </Reveal>
          <div className="collection-grid">
            {collections.map((collection) => (
              <Reveal className="collection-card" key={collection.id}>
                <Link
                  className="collection-card-image"
                  to={`/shop?collection=${collection.id}`}
                >
                  <img
                    src={collection.image}
                    alt={collection.imageAlt}
                    style={{ objectPosition: collection.position }}
                    loading="lazy"
                  />
                  <span>COLLECTION / {collection.number}</span>
                </Link>
                <div className="collection-card-heading">
                  <h3>{collection.name.replace("The ", "")}</h3>
                  <Link
                    to={`/shop?collection=${collection.id}`}
                    aria-label={`Explore ${collection.name}`}
                  >
                    <ArrowUpRight size={20} strokeWidth={1.2} />
                  </Link>
                </div>
                <p>{collection.description}</p>
                <Link
                  className="micro-link"
                  to={`/shop?collection=${collection.id}`}
                >
                  VIEW THE COLLECTION <span>↗</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section section-pad">
        <div className="wrap">
          <Reveal className="section-heading">
            <div>
              <Eyebrow>04 / THE UXT EDIT</Eyebrow>
              <h2>
                PIECES TO <em>COME HOME TO.</em>
              </h2>
            </div>
            <div className="section-heading-side">
              <p>Considered forms, made for the moments that make a home.</p>
              <ArrowLink to="/shop">VIEW ALL PIECES</ArrowLink>
            </div>
          </Reveal>
          <ProductGrid items={products} />
          <p className="catalog-disclaimer">
            EDITORIAL IMAGERY IS ILLUSTRATIVE, NOT EXACT PRODUCT PHOTOGRAPHY.
            PRODUCTS AND PRICES ARE DEMO EXAMPLES.
          </p>
        </div>
      </section>

      <section className="story-section">
        <div className="story-image">
          <img
            src={images.forma}
            alt="Sculptural furniture in a sunlit architectural interior"
            loading="lazy"
          />
          <span className="story-image-label">
            THE BEAUTY OF LESS <ArrowDown size={14} strokeWidth={1.2} />
          </span>
        </div>
        <div className="story-content">
          <Reveal>
            <Eyebrow>05 / OUR POINT OF VIEW</Eyebrow>
            <h2>
              LESS,
              <br />
              <em>BUT BETTER.</em>
            </h2>
            <p className="story-intro">
              At UXT, we believe exceptional furniture begins with thoughtful
              design. We focus on proportion, material, comfort, and
              craftsmanship to create pieces that feel natural in the spaces
              where life happens.
            </p>
            <Principles />
            <ArrowLink to="/about" light>
              MORE ABOUT UXT
            </ArrowLink>
          </Reveal>
        </div>
      </section>

      <section className="materials-section section-pad">
        <div className="wrap materials-layout">
          <Reveal className="materials-copy">
            <Eyebrow>06 / MATERIAL MATTERS</Eyebrow>
            <h2>
              FEEL THE
              <br />
              <em>DIFFERENCE.</em>
            </h2>
            <p>
              Materials selected for their character, texture, and ability to
              age beautifully.
            </p>
            <div className="materials-list">
              {[
                "Oak",
                "Walnut",
                "Linen",
                "Bouclé",
                "Stone",
                "Brushed metal",
              ].map((item, index) => (
                <div key={item}>
                  <span>0{index + 1}</span>
                  <strong>{item}</strong>
                  <ArrowUpRight size={15} strokeWidth={1.2} />
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="materials-image">
            <img
              src={images.materials}
              alt="Oak, walnut, linen, bouclé, stone and brushed metal samples"
              loading="lazy"
            />
            <span className="image-caption">
              A CLOSER LOOK AT MATERIALITY <span>06 / 10</span>
            </span>
          </Reveal>
        </div>
      </section>

      <section className="campaign">
        <img
          src={images.lifestyle}
          alt="A warm contemporary living room at dusk"
          loading="lazy"
        />
        <div className="campaign-overlay" />
        <Reveal className="campaign-content">
          <Eyebrow>THE UXT WAY OF LIFE</Eyebrow>
          <h2>
            MAKE SPACE FOR
            <br />
            <em>WHAT MATTERS.</em>
          </h2>
          <p>
            Discover pieces that bring comfort, clarity, and character to your
            home.
          </p>
          <ButtonLink to="/collections" variant="light">
            VIEW THE COLLECTION
          </ButtonLink>
        </Reveal>
        <div className="campaign-bottom">
          <span>SPACES FOR LIVING, BEAUTIFULLY.</span>
          <span>UXT / LIVING WELL</span>
        </div>
      </section>

      <section className="journal-section section-pad">
        <div className="wrap">
          <Reveal className="section-heading">
            <div>
              <Eyebrow>07 / THE JOURNAL</Eyebrow>
              <h2>
                NOTES ON <em>LIVING WELL.</em>
              </h2>
            </div>
            <div className="section-heading-side">
              <p>Ideas, inspiration, and stories for a more considered home.</p>
              <ArrowLink to="/journal">EXPLORE THE JOURNAL</ArrowLink>
            </div>
          </Reveal>
          <div className="journal-grid">
            {articles.map((article, index) => (
              <JournalCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        </div>
      </section>
      <Newsletter />
    </main>
  );
}
