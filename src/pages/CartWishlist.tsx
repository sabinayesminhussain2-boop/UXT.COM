import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShoppingBag, X } from "lucide-react";
import { formatPrice, products } from "../data/catalog";
import { useStore } from "../store";
import {
  ButtonLink,
  Eyebrow,
  PageIntro,
  QuantitySelector,
} from "../components/Common";
import { ProductGrid } from "../components/ProductCard";

export function WishlistPage() {
  const { wishlist } = useStore();
  const saved = wishlist.flatMap((id) => {
    const product = products.find((item) => item.id === id);
    return product ? [product] : [];
  });
  return (
    <main className="inner-page wishlist-page">
      <PageIntro
        eyebrow="YOUR UXT / THE WISHLIST"
        title={
          <>
            SAVED FOR
            <br />
            <em>ANOTHER DAY.</em>
          </>
        }
        text="A little collection of the pieces you love."
        count={`${String(saved.length).padStart(2, "0")} SAVED ${saved.length === 1 ? "PIECE" : "PIECES"}`}
      />
      <div className="wrap wishlist-content">
        {saved.length ? (
          <>
            <div className="page-rule-label">
              <span>YOUR WISHLIST</span>
              <span>{String(saved.length).padStart(2, "0")} PIECES</span>
            </div>
            <ProductGrid items={saved} />
            <p className="catalog-disclaimer">
              EDITORIAL IMAGERY AND PRICES ARE ILLUSTRATIVE. YOUR WISHLIST IS
              SAVED IN THIS BROWSER.
            </p>
          </>
        ) : (
          <div className="empty-state">
            <Eyebrow>A SPACE FOR YOUR FAVOURITES</Eyebrow>
            <h2>
              Nothing saved, <em>yet.</em>
            </h2>
            <p>
              Keep the pieces that speak to you close. Select the heart on any
              piece to add it here.
            </p>
            <ButtonLink to="/shop">EXPLORE THE COLLECTION</ButtonLink>
          </div>
        )}
      </div>
    </main>
  );
}

export function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useStore();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const items = cart.flatMap((item) => {
    const product = products.find(
      (candidate) => candidate.id === item.productId,
    );
    return product ? [{ ...item, product }] : [];
  });
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  return (
    <main className="inner-page cart-page">
      <PageIntro
        eyebrow="YOUR UXT / SHOPPING BAG"
        title={
          <>
            A LITTLE MORE
            <br />
            <em>TO LOVE.</em>
          </>
        }
        text="Thoughtful pieces, chosen by you."
        count={`${String(items.reduce((sum, item) => sum + item.quantity, 0)).padStart(2, "0")} ITEMS`}
      />
      <div className="wrap cart-content">
        {items.length ? (
          <div className="cart-layout">
            <div className="cart-items">
              <div className="page-rule-label">
                <span>YOUR SELECTION</span>
                <span>DEMO PRICE</span>
              </div>
              {items.map((item) => (
                <article
                  className="cart-item"
                  key={`${item.productId}-${item.color}`}
                >
                  <Link
                    to={`/product/${item.product.id}`}
                    className="cart-item-image"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.imageAlt}
                      style={{ objectPosition: item.product.imagePosition }}
                    />
                  </Link>
                  <div className="cart-item-main">
                    <div className="cart-item-title">
                      <div>
                        <span className="eyebrow">
                          {item.product.categoryLabel.toUpperCase()}
                        </span>
                        <Link to={`/product/${item.product.id}`}>
                          <h2>{item.product.name}</h2>
                        </Link>
                      </div>
                      <strong>
                        {formatPrice(item.product.price * item.quantity)}
                      </strong>
                    </div>
                    <p>
                      {item.product.material}
                      <br />
                      {item.color} · {formatPrice(item.product.price)} each
                    </p>
                    <div className="cart-item-actions">
                      <QuantitySelector
                        quantity={item.quantity}
                        onChange={(quantity) =>
                          updateQuantity(item.productId, item.color, quantity)
                        }
                        label={`Quantity of ${item.product.name}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.productId, item.color)
                        }
                      >
                        REMOVE <X size={13} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
              <Link className="arrow-link continue-link" to="/shop">
                CONTINUE SHOPPING <ArrowUpRight size={15} />
              </Link>
            </div>
            <aside className="cart-summary">
              <Eyebrow>YOUR SELECTION</Eyebrow>
              <h2>Order summary</h2>
              <div>
                <span>Subtotal</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <p>
                Demo prices only. Shipping, taxes, and real orders are not
                available in this prototype.
              </p>
              <button
                type="button"
                className="button button--dark full-button"
                onClick={() => setCheckoutOpen(true)}
              >
                DEMO CHECKOUT <ArrowUpRight size={16} />
              </button>
              <span className="secure-note">
                <ShoppingBag size={15} strokeWidth={1.3} /> NO PAYMENT WILL BE
                COLLECTED
              </span>
              {checkoutOpen && (
                <div className="checkout-notice" role="status">
                  <strong>Checkout is a demonstration.</strong>
                  <p>
                    A real payment provider would need to be connected before an
                    order could be placed. No payment information is collected.
                  </p>
                </div>
              )}
            </aside>
          </div>
        ) : (
          <div className="empty-state">
            <Eyebrow>ROOM FOR SOMETHING BEAUTIFUL</Eyebrow>
            <h2>
              Your bag is <em>empty.</em>
            </h2>
            <p>
              Consider this a blank canvas. Discover pieces that make a space
              feel like yours.
            </p>
            <ButtonLink to="/shop">EXPLORE THE COLLECTION</ButtonLink>
          </div>
        )}
      </div>
    </main>
  );
}
