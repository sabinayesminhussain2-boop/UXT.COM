import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Collections from "./pages/Collections";
import About from "./pages/About";
import { JournalPage, ArticlePage } from "./pages/Journal";
import { CartPage, WishlistPage } from "./pages/CartWishlist";
import InfoPage from "./pages/Info";
import { articles } from "./data/journal";
import { products } from "./data/catalog";

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      window.setTimeout(
        () => document.getElementById(hash.slice(1))?.scrollIntoView(),
        50,
      );
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);
  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const labels: Record<string, string> = {
      shop: "Shop All",
      collections: "Collections",
      about: "About UXT",
      journal: "The Journal",
      wishlist: "Wishlist",
      cart: "Shopping Bag",
      contact: "Contact",
      faq: "FAQ",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
    };
    let title = segments.length
      ? labels[segments[0]] || "Explore UXT"
      : "Furniture for considered living";
    let description =
      "Discover thoughtful furniture, exceptional materials, and spaces that feel like home. UXT is a luxury furniture website demonstration.";
    if (segments[0] === "product" && segments[1]) {
      const product = products.find((item) => item.id === segments[1]);
      if (product) {
        title = product.name;
        description = `${product.description} Product details and price are illustrative.`;
      }
    } else if (segments[0] === "journal" && segments[1]) {
      const article = articles.find((item) => item.slug === segments[1]);
      if (article) {
        title = article.title;
        description = article.intro;
      }
    }
    document.title = `${title} | UXT.com`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div id="top">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <RouteEffects />
      <Header />
      <div id="content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/journal/:slug" element={<ArticlePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<InfoPage kind="contact" />} />
          <Route path="/faq" element={<InfoPage kind="faq" />} />
          <Route path="/privacy" element={<InfoPage kind="privacy" />} />
          <Route path="/terms" element={<InfoPage kind="terms" />} />
          <Route
            path="*"
            element={
              <main className="inner-page">
                <div className="empty-state wrap">
                  <span className="eyebrow">A WRONG TURN</span>
                  <h1>
                    There is nothing here, <em>yet.</em>
                  </h1>
                  <p>Let us take you back to the good stuff.</p>
                  <Link to="/" className="button button--dark">
                    BACK TO HOME ↗
                  </Link>
                </div>
              </main>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
