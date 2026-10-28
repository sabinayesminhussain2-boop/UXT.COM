import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { articles } from "../data/journal";
import { BackLink, Eyebrow, PageIntro } from "../components/Common";
import JournalCard from "../components/JournalCard";
import Newsletter from "../components/Newsletter";

export function JournalPage() {
  return (
    <main className="inner-page journal-page">
      <PageIntro
        eyebrow="THE UXT JOURNAL / 01"
        title={
          <>
            A LITTLE SPACE
            <br />
            <em>FOR INSPIRATION.</em>
          </>
        }
        text="Ideas, inspiration, and stories for a more considered home."
        count="STORIES / 03"
      />
      <div className="wrap journal-listing">
        <div className="page-rule-label">
          <span>THE LATEST STORIES</span>
          <span>ON LIVING WELL</span>
        </div>
        <div className="journal-grid">
          {articles.map((article, index) => (
            <JournalCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      </div>
      <Newsletter />
    </main>
  );
}

export function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  if (!article)
    return (
      <main className="inner-page">
        <div className="wrap empty-state">
          <Eyebrow>NOT FOUND</Eyebrow>
          <h1>This story is not here.</h1>
          <Link to="/journal" className="button button--dark">
            EXPLORE THE JOURNAL <ArrowUpRight size={15} />
          </Link>
        </div>
      </main>
    );
  return (
    <main className="inner-page article-page">
      <div className="wrap article-intro">
        <BackLink to="/journal">THE JOURNAL</BackLink>
        <div className="article-intro-inner">
          <Eyebrow>
            {article.category.toUpperCase()} / {article.readTime.toUpperCase()}
          </Eyebrow>
          <h1>{article.title}</h1>
          <p>{article.intro}</p>
        </div>
      </div>
      <div className="article-hero">
        <img
          src={article.image}
          alt={article.imageAlt}
          style={{ objectPosition: article.imagePosition }}
        />
        <span>THE UXT JOURNAL / ON LIVING WELL</span>
      </div>
      <article className="article-body">
        <p className="article-opening">{article.intro}</p>
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        <div className="article-end">
          <span>THE ART OF CONSIDERED LIVING.</span>
          <Link to="/shop">
            EXPLORE THE UXT EDIT <ArrowUpRight size={15} />
          </Link>
        </div>
      </article>
      <section className="related-journal wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>MORE FROM THE JOURNAL</Eyebrow>
            <h2>
              KEEP <em>READING.</em>
            </h2>
          </div>
          <div className="section-heading-side">
            <Link className="arrow-link" to="/journal">
              ALL STORIES <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="journal-grid">
          {articles
            .filter((item) => item.slug !== article.slug)
            .map((item, index) => (
              <JournalCard key={item.slug} article={item} index={index} />
            ))}
        </div>
      </section>
      <Newsletter />
    </main>
  );
}
