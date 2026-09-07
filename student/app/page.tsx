import Link from "next/link";

export default function WelcomePage() {
  return (
    <section className="welcome">
      <div className="hero-ring">
        <img
          className="hero-photo"
          alt="Student"
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
        />
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
