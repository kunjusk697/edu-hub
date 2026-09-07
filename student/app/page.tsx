import Link from "next/link";

export default function WelcomePage() {
  return (
    <section className="welcome">
      <div className="hero-brand">
        <img src="/logo.jpg" alt="Eduin Global Skill Club" />
      </div>
      <h1>
        Learning
        <br />
        can be fun!
      </h1>
      <p>Free course for students</p>
      <Link href="/home" className="welcome-next" aria-label="Continue">
        →
      </Link>
    </section>
  );
}
