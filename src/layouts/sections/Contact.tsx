import { ArrowUpRight, MapPin } from "lucide-react";
import { profile } from "../../constants";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", value: "linkedin.com/in/aidilsafwan", href: profile.linkedinUrl },
  { label: "GitHub", value: "github.com/aidilsfwn", href: profile.githubUrl },
  { label: "Résumé", value: "CV-AidilSafwan.pdf", href: profile.resumeUrl },
];

export function Contact() {
  return (
    <div className="contact-scene">
      <div className="contact-scene__statement"><p className="eyebrow">07 / Let's talk</p><h2>Got something<br /><em>in mind?</em></h2><p>Open to new opportunities, collaborations, or just a good conversation about tech, products, or frontend craft.</p><a className="primary-action primary-action--paper" href={`mailto:${profile.email}`}>Send an email <ArrowUpRight aria-hidden="true" /></a></div>
      <div className="contact-ledger"><p className="contact-ledger__label">contact.json / destinations</p>{links.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}><span>{link.label}</span><strong>{link.value}</strong><ArrowUpRight aria-hidden="true" /></a>)}<p className="contact-location"><MapPin aria-hidden="true" /> Based in Kuala Lumpur, MY · Available remotely</p></div>
      <footer className="site-footer"><span>© 2025 Aidil Safwan. All rights reserved.</span><span>Built with React + Vite</span></footer>
    </div>
  );
}
