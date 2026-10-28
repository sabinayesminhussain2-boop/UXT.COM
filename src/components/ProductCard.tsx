import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, Plus } from "lucide-react";
import { type Product, formatPrice } from "../data/catalog";
import { useStore } from "../store";
import { Modal } from "./Common";

export function WishlistButton({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { wishlist, toggleWishlist } = useStore();
  const saved = wishlist.includes(product.id);
  return (
    <button
      type="button"
      className={`wish-button ${saved ? "is-saved" : ""} ${className}`}
      aria-label={`${saved ? "Remove" : "Add"} ${product.name} ${saved ? "from" : "to"} wishlist`}
      aria-pressed={saved}
      onClick={() => toggleWishlist(product.id)}
    >
      <Heart
        size={19}
        strokeWidth={1.35}
        fill={saved ? "currentColor" : "none"}
      />
    </button>
  );
}

function QuickView({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addToCart } = useStore();
  return (
    <Modal
      onClose={onClose}
      label={`Quick view: ${product.name}`}
      className="quick-view"
    >
      <div className="quick-view-image">
        <img
          src={product.image}
          alt={product.imageAlt}
          style={{ objectPosition: product.imagePosition }}
        />
      </div>
      <div className="quick-view-copy">
        <span className="eyebrow">
          A CLOSER LOOK / {product.categoryLabel.toUpperCase()}
        </span>
        <h2>{product.name}</h2>
        <p className="quick-price">
          {formatPrice(product.price)} <small>DEMO PRICE</small>
        </p>
        <p>{product.description}</p>
        <p className="quick-material">{product.material}</p>
        <button
          className="button button--dark full-button"
          type="button"
          onClick={() => addToCart(product.id)}
        >
          ADD TO BAG <Plus size={16} strokeWidth={1.4} />
        </button>
        <Link
          className="arrow-link"
          to={`/product/${product.id}`}
          onClick={onClose}
        >
          VIEW PRODUCT DETAILS <ArrowUpRight size={16} strokeWidth={1.4} />
        </Link>
        <small className="illustration-note">
          Editorial imagery is illustrative, not an exact product photograph.
        </small>
      </div>
    </Modal>
  );
}

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index?: number;
}) {
  const [quickOpen, setQuickOpen] = useState(false);
  const { addToCart } = useStore();
  const closeQuick = useCallback(() => setQuickOpen(false), []);
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link
          className="product-image-link"
          to={`/product/${product.id}`}
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.imageAlt}
            style={{ objectPosition: product.imagePosition }}
            loading="lazy"
          />
        </Link>
        {index !== undefined && (
          <span className="product-number">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <WishlistButton product={product} />
        <div className="product-image-actions">
          <button type="button" onClick={() => setQuickOpen(true)}>
            QUICK VIEW <ArrowUpRight size={14} />
          </button>
          <button type="button" onClick={() => addToCart(product.id)}>
            ADD TO BAG <Plus size={14} />
          </button>
        </div>
      </div>
      <div className="product-info">
        <div>
          <Link className="product-name" to={`/product/${product.id}`}>
            {product.name}
          </Link>
          <p>{product.material}</p>
        </div>
        <span className="product-price">{formatPrice(product.price)}</span>
      </div>
      {quickOpen && <QuickView product={product} onClose={closeQuick} />}
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="product-grid">
      {items.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
