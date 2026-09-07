"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { TabBar } from "../../components/TabBar";
import { BrandMark } from "../../components/Brand";
import { api } from "../../lib/api";

type Course = {
  id: string;
  title: string;
  description?: string | null;
  programme?: { name?: string; mentor?: { user?: { name?: string } } };
  modules?: { sessions?: { startsAt?: string | null; meetingUrl?: string | null }[] }[];
  enrollments?: unknown[];
};

type Mentor = {
  id: string;
  user: { name: string };
};

const teacherPhotos = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=200&q=80"
];

const tags = ["Hindi", "English", "Bangla", "Arabic"];

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    api("/courses")
      .then(setCourses)
      .catch(() => setCourses([]));
    api("/mentors")
      .then(setMentors)
      .catch(() => setMentors([]));
  }, []);

  const nextCourse = courses[0];
  const nextSession = useMemo(() => {
    const sessions =
      nextCourse?.modules?.flatMap((module) => module.sessions || []) || [];
    return sessions.find((session) => session.startsAt) || sessions[0];
  }, [nextCourse]);

  const start = nextSession?.startsAt ? new Date(nextSession.startsAt) : null;
  const weekday = start
    ? start.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
    : "MON";
  const day = start ? String(start.getDate()).padStart(2, "0") : "24";
  const time = start
    ? start.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    : "14:30 PM";

  return (
    <section className="home">
      <div className="home-top">
        <button className="icon-btn" aria-label="Menu">
          ☰
        </button>
        <BrandMark className="home-brand" />
        <img
          className="avatar"
          alt="You"
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80"
        />
      </div>

      <div className="search">
        <span>⌕</span>
        <input placeholder="Find Best Online School" />
        <div className="search-tools">
          <span>🔍</span>
          <span className="mic">🎤</span>
        </div>
      </div>

      <div className="section-head">
        <h2>Next Class</h2>
        <Link className="view-all" href={nextCourse ? `/courses/${nextCourse.id}` : "/home"}>
          View all
        </Link>
      </div>

      <article className="class-card">
        <div className="class-top">
          <div className="date-badge">
            <small>{weekday}</small>
            {day}
          </div>
          <div className="class-meta">
            {weekday} {time} || Zoom
            <div className="chip">
              {nextCourse?.programme?.name || "UI/UX Design"}
            </div>
          </div>
        </div>
        <h3>
          {nextCourse?.description ||
            nextCourse?.title ||
            "UX & Web Design Course"}
        </h3>
        <div className="class-bottom">
          <div className="faces">
            <img alt="" src={teacherPhotos[0]} />
            <img alt="" src={teacherPhotos[1]} />
            <img alt="" src={teacherPhotos[2]} />
            <span className="more">+8</span>
          </div>
          {nextCourse ? (
            <Link className="join" href={`/courses/${nextCourse.id}`}>
              Join Class
            </Link>
          ) : (
            <span className="join">Join Class</span>
          )}
        </div>
      </article>

      <div className="section-head" style={{ marginTop: 28 }}>
        <h2>Best Teacher</h2>
        <span className="view-all">View all</span>
      </div>

      <div className="teachers">
        {(mentors.length ? mentors : [{ id: "1", user: { name: "Teacher" } }]).map(
          (mentor, index) => (
            <div className="teacher" key={mentor.id}>
              <img alt={mentor.user.name} src={teacherPhotos[index % teacherPhotos.length]} />
              <div className="teacher-tag">{tags[index % tags.length]}</div>
            </div>
          )
        )}
      </div>

      <TabBar />
    </section>
  );
}
