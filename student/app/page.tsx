import Link from "next/link";

import { PosterSlideshow } from "../components/PosterSlideshow";

export default function WelcomePage() {
  return (
    <section className="welcome">
      <img className="welcome-mark" src="/logo.jpg" alt="Eduin Global Skill Club" />
      <PosterSlideshow />
      <Link href="/home" className="welcome-next" aria-label="Continue">
        →
      </Link>
    </section>
  );
}
