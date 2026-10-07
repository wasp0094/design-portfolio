import { profile } from "@/lib/site";

/** Full-bleed footer: the pitch and the ways to reach Aditi, edge to edge. */
export default function Contact() {
  const year = 2026;
  return (
    <footer className="contact" id="contact">
      <div className="wrap">
        <div className="contact-grid">
          <div>
            <h2 className="contact-title">Tell me about your project</h2>
            <p className="contact-text">
              Have a product to design, build or rebrand? I reply to every message, and I’m happy
              to start with a quick intro call to see if it’s a match.
            </p>
            <div className="contact-actions">
              <a
                className="btn btn-primary btn-lg"
                href={profile.booking || `mailto:${profile.email}`}
                {...(profile.booking ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                Say hello <span aria-hidden>↗</span>
              </a>
              <a className="btn btn-lg" href={profile.resume} target="_blank" rel="noopener noreferrer">
                Download resume <span aria-hidden>↓</span>
              </a>
            </div>
          </div>

          <div className="contact-links">
            <div>
              <h3>Email me at</h3>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div>
              <h3>Call</h3>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
            </div>
            <div>
              <h3>Follow</h3>
              <ul>
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label} <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bar">
          <span>© {year} {profile.name} · {profile.role}</span>
          <span>Designed and built with care in {profile.location}</span>
          <a href="#">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
