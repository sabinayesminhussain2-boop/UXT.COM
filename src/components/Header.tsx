import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useStore } from "../store";

export function Logo({ onClick }: { onClick?: () => void }) {
  const { pathname } = useLocation();
  function goHome() {
    onClick?.();
    if (pathname === "/")
      window.requestAnimationFrame(() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        }),
      );
  }
  return (
    <Link to="/" onClick={goHome} className="logo" aria-label="UXT.com home">
      <span>UXT</span>
      <small>.com</small>
    </Link>
  );
}

const links = [
  { label: "Collections", to: "/collections" },
  { label: "Living", to: "/shop?category=living" },
  { label: "Dining", to: "/shop?category=dining" },
  { label: "Bedroom", to: "/shop?category=bedroom" },
  { label: "Journal", to: "/journal" },
];

export default function Header() {
  const { cartCount, wishlist } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(window.scrollY > 40);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const home = location.pathname === "/";
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);
  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const previous = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const focusTimer = searchOpen
      ? window.setTimeout(() => searchRef.current?.focus(), 50)
      : undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const container = searchOpen ? searchPanelRef.current : menuRef.current;
      if (!container) return;
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), input:not([disabled])",
        ),
      );
      if (menuOpen && menuToggleRef.current)
        focusable.unshift(menuToggleRef.current);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          !focusable.includes(document.activeElement as HTMLElement))
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      if (focusTimer) window.clearTimeout(focusTimer);
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus();
    };
  }, [menuOpen, searchOpen]);
  function submitSearch(event: FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    setSearchOpen(false);
    navigate(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : "/shop");
  }
  return (
    <>
      <header
        className={`header ${!home || scrolled || menuOpen || searchOpen ? "header--solid" : ""}`}
      >
        <div className="header-inner">
          <button
            ref={menuToggleRef}
            className="icon-button mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setSearchOpen(false);
            }}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <Logo
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen(false);
            }}
          />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  isActive && !link.to.includes("?")
                    ? "nav-link nav-link--active"
                    : "nav-link"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <button
              type="button"
              className="icon-button"
              aria-label="Search products"
              aria-expanded={searchOpen}
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMenuOpen(false);
              }}
            >
              <Search size={19} strokeWidth={1.45} />
            </button>
            <Link
              to="/wishlist"
              className="icon-button wishlist-header"
              aria-label={`Wishlist, ${wishlist.length} saved ${wishlist.length === 1 ? "item" : "items"}`}
            >
              <Heart size={19} strokeWidth={1.45} />
              {wishlist.length > 0 && (
                <span className="header-count">{wishlist.length}</span>
              )}
            </Link>
            <Link
              to="/cart"
              className="icon-button cart-header"
              aria-label={`Shopping bag, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
            >
              <ShoppingBag size={19} strokeWidth={1.45} />
              <span className="cart-count">{cartCount}</span>
            </Link>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div ref={menuRef} className="nav-overlay" id="mobile-nav">
          <nav aria-label="Mobile navigation">
            <span className="eyebrow">EXPLORE UXT</span>
            {[
              { label: "Shop All", to: "/shop" },
              ...links,
              { label: "About UXT", to: "/about" },
              { label: "Wishlist", to: "/wishlist" },
            ].map((link, index) => (
              <Link
                to={link.to}
                key={link.label}
                onClick={() => setMenuOpen(false)}
              >
                <span>
                  <small>0{index + 1}</small>
                  {link.label}
                </span>
                <ArrowUpRight size={19} strokeWidth={1.2} />
              </Link>
            ))}
          </nav>
          <p>FURNITURE FOR CONSIDERED LIVING.</p>
        </div>
      )}
      {searchOpen && (
        <div
          className="search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Search the collection"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSearchOpen(false);
          }}
        >
          <div ref={searchPanelRef} className="search-panel">
            <div className="search-panel-top">
              <span className="eyebrow">FIND SOMETHING BEAUTIFUL</span>
              <button
                className="icon-button"
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={22} strokeWidth={1.4} />
              </button>
            </div>
            <h2>What are you looking for?</h2>
            <form role="search" onSubmit={submitSearch}>
              <label className="sr-only" htmlFor="site-search">
                Search products
              </label>
              <input
                ref={searchRef}
                id="site-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search furniture, materials..."
              />
              <button type="submit" aria-label="Submit search">
                <Search size={21} strokeWidth={1.4} />
              </button>
            </form>
            <p>
              POPULAR: <Link to="/shop?category=sofas">SOFAS</Link>
              <Link to="/shop?category=chairs">LOUNGE CHAIRS</Link>
              <Link to="/shop?category=dining">DINING</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
