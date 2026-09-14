"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { api } from "../../../lib/api";

type Course = {
  id: string;
  title: string;
  enrollments?: unknown[];
  modules?: { sessions?: { startsAt?: string | null }[] }[];
  programme?: {
    name?: string;
    mentor?: { user?: { name?: string; phone?: string | null } };
  };
};

export default function CoursePage() {
  const params = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (!params.id) return;
    api(`/courses/${params.id}`)
      .then(setCourse)
      .catch(() => setCourse(null));
  }, [params.id]);

  const start = useMemo(() => {
    const session = course?.modules
      ?.flatMap((module) => module.sessions || [])
      .find((item) => item.startsAt);
    return session?.startsAt ? new Date(session.startsAt) : null;
  }, [course]);

  const now = new Date();
  const diff = start ? Math.max(0, start.getTime() - now.getTime()) : 0;
  const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
  const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
  const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");

  return (
    <section className="course">
      <div className="course-top">
        <Link className="icon-btn" href="/home" aria-label="Back">
          ←
        </Link>
        <button className="icon-btn" aria-label="Save">
          🔖
        </button>
      </div>

      <h1>{course?.title || "Skill Club — Building Skills for Life"}</h1>
      <div>
        <span className="stars">★★★★★</span>
        <span className="reviews">Ages 6–12</span>
      </div>

      <div className="instructor">
        <img alt="" src="/logo.jpg" />
        <div>
          <b>{course?.programme?.mentor?.user?.name || "Eduin Global"}</b>
          <small>Skill Club trainer</small>
        </div>
        <span className="chat">💬</span>
      </div>

      <div className="stats">
        <div className="stat orange">
          365
          <span>Days of growth</span>
        </div>
        <div className="stat tan">
          12
          <span>Core skills</span>
        </div>
      </div>

      <div className="section-head" style={{ marginTop: 24 }}>
        <h2>Upcoming Class</h2>
        <span className="view-all">View all</span>
      </div>

      <div className="countdown">
        <p>Ready for next class?</p>
        <div className="timer">
          <div>
            <strong>{days[0]}</strong>
          </div>
          <div>
            <strong>{days[1]}</strong>
            <small>Days</small>
          </div>
          <div>
            <strong>{hours}</strong>
            <small>Hours</small>
          </div>
          <div>
            <strong>{minutes}</strong>
            <small>Minutes</small>
          </div>
        </div>
      </div>

      <Link className="prev-class" href="/home">
        Previous Class
      </Link>
    </section>
  );
}
