import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-main">
        <div className="footer-brand">
          <Logo />
          <p>
            Furniture for
            <br />
            considered living.
          </p>
          <span>DESIGNED FOR THE WAY YOU LIVE.</span>
        </div>
        <div className="footer-column">
          <h2>EXPLORE</h2>
          <Link to="/shop">
            Shop all <ArrowUpRight />
          </Link>
          <Link to="/collections">
            Collections <ArrowUpRight />
          </Link>
          <Link to="/about">
            About UXT <ArrowUpRight />
          </Link>
          <Link to="/journal">
            The Journal <ArrowUpRight />
          </Link>
        </div>
        <div className="footer-column">
          <h2>INFORMATION</h2>
          <Link to="/contact">
            Contact <ArrowUpRight />
          </Link>
          <Link to="/faq">
            FAQ <ArrowUpRight />
          </Link>
          <Link to="/privacy">
            Privacy policy <ArrowUpRight />
          </Link>
          <Link to="/terms">
            Terms & conditions <ArrowUpRight />
          </Link>
        </div>
        <div className="footer-column footer-social">
          <h2>FOLLOW ALONG</h2>
          <span>Instagram</span>
          <span>Pinterest</span>
          <small>Social channels not connected in this demo.</small>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} UXT.COM. A FURNITURE CONCEPT DEMO.
        </span>
        <span>MADE FOR A MORE CONSIDERED EVERYDAY.</span>
        <a href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
