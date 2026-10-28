import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { type Article } from "../data/journal";

export default function JournalCard({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  return (
    <article className="journal-card">
      <Link to={`/journal/${article.slug}`} className="journal-card-image">
        <img
          src={article.image}
          alt={article.imageAlt}
          style={{ objectPosition: article.imagePosition }}
          loading="lazy"
        />
        <span>0{index + 1}</span>
      </Link>
      <div className="journal-meta">
        <span>{article.category}</span>
        <span>{article.readTime}</span>
      </div>
      <Link to={`/journal/${article.slug}`} className="journal-title">
        <h3>{article.title}</h3>
        <ArrowUpRight size={20} strokeWidth={1.2} />
      </Link>
      <p>{article.intro}</p>
    </article>
  );
}
