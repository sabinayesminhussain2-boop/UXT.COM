import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "./Common";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(true);
      setMessage("Please enter a valid email address.");
      return;
    }
    setError(false);
    setMessage(
      "Thank you for your interest. This demo does not send or save email addresses.",
    );
    setEmail("");
  }
  return (
    <section className="newsletter">
      <div className="wrap newsletter-inner">
        <div>
          <Eyebrow>NOTES FROM UXT</Eyebrow>
          <h2>
            LET GOOD DESIGN
            <br />
            <em>FIND YOU.</em>
          </h2>
        </div>
        <div className="newsletter-form-wrap">
          <p>
            Receive new collection releases, design inspiration, and stories
            from the world of UXT.
          </p>
          <form onSubmit={submit} noValidate className="newsletter-form">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
                setError(false);
              }}
              aria-invalid={error}
              aria-describedby="newsletter-note newsletter-message"
            />
            <button type="submit" aria-label="Subscribe to newsletter">
              SUBSCRIBE <ArrowUpRight size={16} strokeWidth={1.4} />
            </button>
          </form>
          <p className="form-note" id="newsletter-note">
            DEMO ONLY — NO EMAIL IS SENT OR SAVED.
          </p>
          <p
            className={`form-message ${error ? "form-message--error" : ""}`}
            id="newsletter-message"
            role="status"
          >
            {message}
          </p>
        </div>
      </div>
    </section>
  );
}
