"use client";

import { useEffect, useState } from "react";

const slides = [
  { src: "/slides/slide-kids.jpg", alt: "Skill Club admissions" },
  { src: "/slides/slide-mentor.jpg", alt: "Eduin Mentor opportunity" },
  { src: "/slides/slide-skill.jpg", alt: "Join our Skill Club" },
  { src: "/slides/slide-step.jpg", alt: "One big step" }
];

export function PosterSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="slideshow">
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={i === index ? "active" : ""}
        />
      ))}
      <button
        className="slide-nav prev"
        aria-label="Previous poster"
        onClick={() =>
          setIndex((current) => (current - 1 + slides.length) % slides.length)
        }
      >
        ‹
      </button>
      <button
        className="slide-nav next"
        aria-label="Next poster"
        onClick={() => setIndex((current) => (current + 1) % slides.length)}
      >
        ›
      </button>
      <div className="slide-dots">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            className={i === index ? "on" : ""}
            aria-label={`Poster ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
