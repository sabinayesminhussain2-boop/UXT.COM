import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import { formatPrice, products } from "../data/catalog";
import { useStore } from "../store";
import { BackLink, Eyebrow, QuantitySelector } from "../components/Common";
import { ProductGrid, WishlistButton } from "../components/ProductCard";

export default function Product() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(product?.colors[0].name || "");
  useEffect(() => {
    setQuantity(1);
    setColor(product?.colors[0].name || "");
  }, [product]);
  if (!product)
    return (
      <main className="inner-page">
        <div className="wrap empty-state">
          <Eyebrow>NOT FOUND</Eyebrow>
          <h1>This piece is not here.</h1>
          <p>Explore the collection to find something for your space.</p>
          <Link to="/shop" className="button button--dark">
            SHOP ALL <ArrowUpRight size={15} />
          </Link>
        </div>
      </main>
    );
  const related = [
    ...products.filter(
      (item) =>
        item.id !== product.id && item.collection === product.collection,
    ),
    ...products.filter(
      (item) =>
        item.id !== product.id && item.collection !== product.collection,
    ),
  ].slice(0, 4);
  const selectedColor = product.colors.some((item) => item.name === color)
    ? color
    : product.colors[0].name;
  return (
    <main className="inner-page product-page">
      <div className="wrap product-breadcrumb">
        <BackLink to="/shop">ALL PIECES</BackLink>
        <span>/</span>
        <span>{product.categoryLabel.toUpperCase()}</span>
      </div>
      <div className="wrap product-detail-layout">
        <div className="product-detail-image">
          <img
            src={product.image}
            alt={product.imageAlt}
            style={{ objectPosition: product.imagePosition }}
          />
          <span>ILLUSTRATIVE EDITORIAL IMAGE</span>
        </div>
        <div className="product-detail-copy">
          <Eyebrow>
            THE UXT EDIT / {product.categoryLabel.toUpperCase()}
          </Eyebrow>
          <div className="product-detail-title">
            <h1>{product.name}</h1>
            <WishlistButton product={product} />
          </div>
          <div className="detail-price">
            {formatPrice(product.price)} <span>DEMO PRICE</span>
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-material">
            <span>MATERIAL</span>
            <strong>{product.material}</strong>
          </div>
          <div className="color-selector">
            <div>
              <span>FINISH / COLOR</span>
              <strong>{selectedColor}</strong>
            </div>
            <div
              className="swatches"
              role="radiogroup"
              aria-label="Select an illustrative color"
            >
              {product.colors.map((option) => (
                <button
                  type="button"
                  key={option.name}
                  role="radio"
                  aria-checked={selectedColor === option.name}
                  aria-label={option.name}
                  className={selectedColor === option.name ? "selected" : ""}
                  onClick={() => setColor(option.name)}
                >
                  <span style={{ backgroundColor: option.hex }} />
                </button>
              ))}
            </div>
            <small>
              Color selection is illustrative; the editorial image does not
              change.
            </small>
          </div>
          <div className="detail-actions">
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
            <button
              type="button"
              className="button button--dark"
              onClick={() => addToCart(product.id, quantity, selectedColor)}
            >
              ADD TO BAG <Plus size={17} strokeWidth={1.3} />
            </button>
          </div>
          <p className="detail-demo-note">
            A CONCEPT DEMO. ITEM DETAILS AND PRICES ARE ILLUSTRATIVE.
          </p>
          <div className="detail-accordions">
            <details>
              <summary>
                DIMENSIONS <Plus size={15} />
              </summary>
              <p>
                {product.dimensions}. Dimensions are illustrative for this demo.
              </p>
            </details>
            <details>
              <summary>
                MATERIALS & CARE <Plus size={15} />
              </summary>
              <p>
                {product.material}. {product.care}
              </p>
            </details>
            <details>
              <summary>
                ABOUT THIS DEMO <Plus size={15} />
              </summary>
              <p>
                Products, finishes, specifications and prices are illustrative.
                The image is an editorial room scene, not an exact photograph of
                the item. No real orders or payments are processed.
              </p>
            </details>
          </div>
        </div>
      </div>
      <section className="related-section wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>THE UXT EDIT</Eyebrow>
            <h2>
              MORE TO <em>DISCOVER.</em>
            </h2>
          </div>
          <div className="section-heading-side">
            <Link className="arrow-link" to="/shop">
              VIEW ALL PIECES <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <ProductGrid items={related} />
        <p className="catalog-disclaimer">
          EDITORIAL IMAGERY AND PRICES ARE ILLUSTRATIVE.
        </p>
      </section>
    </main>
  );
}
