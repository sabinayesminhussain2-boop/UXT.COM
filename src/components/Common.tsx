import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Minus,
  Plus,
  X,
} from "lucide-react";

export function ArrowLink({
  to,
  children,
  light = false,
  className = "",
}: {
  to: string;
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      className={`arrow-link ${light ? "arrow-link--light" : ""} ${className}`}
      to={to}
    >
      {children}
      <ArrowUpRight size={16} strokeWidth={1.4} aria-hidden="true" />
    </Link>
  );
}

export function ButtonLink({
  to,
  children,
  variant = "dark",
  className = "",
}: {
  to: string;
  children: ReactNode;
  variant?: "dark" | "light" | "outline-light";
  className?: string;
}) {
  return (
    <Link to={to} className={`button button--${variant} ${className}`}>
      {children}
      <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -25px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function QuantitySelector({
  quantity,
  onChange,
  label = "Quantity",
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  label?: string;
}) {
  return (
    <div className="quantity" aria-label={label}>
      <button
        type="button"
        aria-label={`Decrease ${label.toLowerCase()}`}
        disabled={quantity <= 1}
        onClick={() => onChange(quantity - 1)}
      >
        <Minus size={14} />
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        type="button"
        aria-label={`Increase ${label.toLowerCase()}`}
        disabled={quantity >= 99}
        onClick={() => onChange(quantity + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

export function Modal({
  children,
  onClose,
  label,
  className = "",
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
  className?: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          !dialogRef.current.contains(document.activeElement))
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
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={`modal ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={label}
      >
        <button
          ref={closeRef}
          className="modal-close icon-button"
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={21} strokeWidth={1.4} />
        </button>
        {children}
      </div>
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  text,
  count,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  count?: string;
}) {
  return (
    <div className="page-intro wrap">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
      {count && <span className="page-intro-count">{count}</span>}
    </div>
  );
}

export function BackLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link className="back-link" to={to}>
      <ArrowRight size={15} strokeWidth={1.3} aria-hidden="true" /> {children}
    </Link>
  );
}

export function ScrollCue() {
  return (
    <a className="scroll-cue" href="#our-approach">
      <span>SCROLL TO EXPLORE</span>
      <ArrowDown size={15} strokeWidth={1.3} aria-hidden="true" />
    </a>
  );
}
