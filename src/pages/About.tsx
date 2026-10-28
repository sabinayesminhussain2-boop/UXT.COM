import { images } from "../data/catalog";
import {
  ArrowLink,
  ButtonLink,
  Eyebrow,
  PageIntro,
  Reveal,
} from "../components/Common";
import Principles from "../components/Principles";
import Newsletter from "../components/Newsletter";

export default function About() {
  return (
    <main className="inner-page about-page">
      <PageIntro
        eyebrow="THE WORLD OF UXT / OUR STORY"
        title={
          <>
            A MORE CONSIDERED
            <br />
            <em>WAY OF LIVING.</em>
          </>
        }
        text="Furniture that transforms the way you experience space."
        count="OUR PHILOSOPHY / 01"
      />
      <div className="about-hero">
        <img
          src={images.editorial}
          alt="A warm contemporary home with natural oak and thoughtfully placed furniture"
        />
        <span>FURNITURE FOR CONSIDERED LIVING</span>
      </div>
      <section className="wrap about-intro section-pad">
        <Reveal>
          <Eyebrow>OUR PHILOSOPHY</Eyebrow>
          <h2>
            A HOME IS MORE
            <br />
            <em>THAN A PLACE.</em>
          </h2>
        </Reveal>
        <Reveal>
          <p className="about-lead">
            It is where the everyday unfolds — and where the things around us
            quietly shape how we feel.
          </p>
          <p>
            At UXT, we believe exceptional furniture begins with thoughtful
            design. We focus on proportion, material, comfort, and craftsmanship
            to create pieces that feel natural in the spaces where life happens.
          </p>
          <p>
            Our approach is simple: make room for what matters, and choose
            fewer, more meaningful things.
          </p>
          <ArrowLink to="/collections">EXPLORE OUR COLLECTIONS</ArrowLink>
        </Reveal>
      </section>
      <section className="about-principles">
        <div className="wrap about-principles-inner">
          <div>
            <Eyebrow>THE PRINCIPLES</Eyebrow>
            <h2>
              LESS,
              <br />
              <em>BUT BETTER.</em>
            </h2>
            <p>A quieter kind of beauty, grounded in purpose.</p>
          </div>
          <Principles />
        </div>
      </section>
      <section className="wrap about-materials section-pad">
        <Reveal className="about-materials-image">
          <img
            src={images.materials}
            alt="A close composition of timber, linen, bouclé, stone and brushed metal"
            loading="lazy"
          />
        </Reveal>
        <Reveal className="about-materials-copy">
          <Eyebrow>THE FEEL OF A HOME</Eyebrow>
          <h2>
            MATERIALS
            <br />
            <em>THAT MATTER.</em>
          </h2>
          <p>
            We are drawn to the quiet character of natural materials: the grain
            of timber, the softness of linen, the texture of stone. Together,
            they bring depth and warmth to the places we live.
          </p>
          <p>
            These thoughtful material ideas are part of the UXT concept. The
            furniture and specifications shown throughout this site are
            illustrative.
          </p>
          <ButtonLink to="/collections">DISCOVER THE COLLECTIONS</ButtonLink>
        </Reveal>
      </section>
      <Newsletter />
    </main>
  );
}
