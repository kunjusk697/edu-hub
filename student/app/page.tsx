import Link from "next/link";

export default function WelcomePage() {
  return (
    <section className="welcome">
      <img className="welcome-mark" src="/logo.jpg" alt="Eduin Global Skill Club" />
      <div className="hero-flyer">
        <img src="/hero.jpg" alt="Skill Club admissions" />
      </div>
      <p className="welcome-tag">Building skills for life</p>
      <Link href="/home" className="welcome-next" aria-label="Continue">
        →
      </Link>
    </section>
  );
}
