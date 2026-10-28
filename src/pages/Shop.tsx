import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { categories, collections, products } from "../data/catalog";
import { Eyebrow, PageIntro } from "../components/Common";
import { ProductGrid } from "../components/ProductCard";

const filters = [
  { id: "all", name: "All pieces" },
  { id: "living", name: "Living" },
  ...categories.map(({ id, name }) => ({ id, name })),
  { id: "storage", name: "Storage" },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "all";
  const collection = params.get("collection") || "";
  const query = params.get("q") || "";
  const sort = params.get("sort") || "featured";
  const selectedCollection = collections.find((item) => item.id === collection);
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return products
      .filter((product) => {
        const categoryMatches =
          category === "all" ||
          (category === "living"
            ? product.room === "living"
            : product.category === category);
        const collectionMatches =
          !collection || product.collection === collection;
        const searchMatches =
          !search ||
          [
            product.name,
            product.categoryLabel,
            product.material,
            product.description,
            product.collection,
          ]
            .join(" ")
            .toLowerCase()
            .includes(search);
        return categoryMatches && collectionMatches && searchMatches;
      })
      .sort((a, b) =>
        sort === "price-low"
          ? a.price - b.price
          : sort === "price-high"
            ? b.price - a.price
            : 0,
      );
  }, [category, collection, query, sort]);
  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (
      !value ||
      (key === "category" && value === "all") ||
      (key === "sort" && value === "featured")
    )
      next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: key === "q" });
  }
  const hasFilters =
    category !== "all" || !!collection || !!query || sort !== "featured";
  return (
    <main className="inner-page shop-page">
      <PageIntro
        eyebrow="THE UXT EDIT / 01"
        title={
          <>
            FIND YOUR
            <br />
            <em>EVERYDAY BEAUTIFUL.</em>
          </>
        }
        text="Thoughtful pieces for the spaces and moments that matter most."
        count="THE COLLECTION / 08 PIECES"
      />
      <div className="wrap shop-content">
        <div className="shop-toolbar-top">
          <div>
            <Eyebrow>EXPLORE BY CATEGORY</Eyebrow>
            <span className="filter-icon">
              <SlidersHorizontal size={15} strokeWidth={1.5} /> FILTER
            </span>
          </div>
          <span>FURNITURE FOR CONSIDERED LIVING</span>
        </div>
        <div className="filter-chips" aria-label="Filter by category">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter.id}
              className={category === filter.id ? "active" : ""}
              aria-pressed={category === filter.id}
              onClick={() => update("category", filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>
        {selectedCollection && (
          <div className="active-collection">
            COLLECTION: {selectedCollection.name.toUpperCase()}{" "}
            <button
              type="button"
              onClick={() => update("collection", "")}
              aria-label="Remove collection filter"
            >
              <X size={15} />
            </button>
          </div>
        )}
        <div className="shop-controls">
          <p aria-live="polite">
            SHOWING <strong>{String(filtered.length).padStart(2, "0")}</strong>{" "}
            {filtered.length === 1 ? "PIECE" : "PIECES"}
            {hasFilters && (
              <button type="button" onClick={() => setParams({})}>
                CLEAR FILTERS <X size={13} />
              </button>
            )}
          </p>
          <div className="shop-control-fields">
            <label className="shop-search">
              <Search size={16} strokeWidth={1.4} />
              <span className="sr-only">Search products</span>
              <input
                type="search"
                placeholder="Search pieces"
                value={query}
                onChange={(event) => update("q", event.target.value)}
              />
            </label>
            <label className="sort-label">
              <span>SORT BY</span>
              <select
                value={sort}
                onChange={(event) => update("sort", event.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to high</option>
                <option value="price-high">Price: High to low</option>
              </select>
            </label>
          </div>
        </div>
        {filtered.length ? (
          <ProductGrid items={filtered} />
        ) : (
          <div className="empty-state shop-empty">
            <span className="eyebrow">A LITTLE MORE ROOM TO EXPLORE</span>
            <h2>No pieces found.</h2>
            <p>
              Try a different search or clear your filters to see the whole
              collection.
            </p>
            <button
              className="button button--dark"
              type="button"
              onClick={() => setParams({})}
            >
              CLEAR FILTERS <X size={15} />
            </button>
          </div>
        )}
        <p className="catalog-disclaimer">
          EDITORIAL IMAGERY IS ILLUSTRATIVE, NOT EXACT PRODUCT PHOTOGRAPHY.
          PRODUCTS AND PRICES ARE DEMO EXAMPLES.
        </p>
      </div>
    </main>
  );
}
