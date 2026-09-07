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
};

type Mentor = {
  id: string;
  user: { name: string };
};

const skills = [
  "Speak",
  "Lead",
  "Create",
  "Code",
  "English",
  "Maths",
  "Art",
  "Sport",
  "Values",
  "Money",
  "Science",
  "Life"
];

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
    : "SAT";
  const day = start ? String(start.getDate()).padStart(2, "0") : "12";
  const time = start
    ? start.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    : "10:00 AM";

  return (
    <section className="home">
      <div className="home-top">
        <button className="icon-btn" aria-label="Menu">
          ☰
        </button>
        <BrandMark className="home-brand" />
        <img className="avatar" alt="Skill Club" src="/hero.jpg" />
      </div>

      <div className="search">
        <span>⌕</span>
        <input placeholder="Find a skill for your child" />
        <div className="search-tools">
          <span className="mic">🎤</span>
        </div>
      </div>

      <div className="club-banner">
        <img src="/hero.jpg" alt="Skill Club kids" />
      </div>

      <div className="club-stats">
        <div>
          <b>365</b>
          <span>Days</span>
        </div>
        <div>
          <b>12</b>
          <span>Core skills</span>
        </div>
        <div>
          <b>100+</b>
          <span>Life skills</span>
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
            <div className="chip">Ages 6–12</div>
          </div>
        </div>
        <h3>
          {nextCourse?.title || "Skill Club"}
        </h3>
        <p className="class-sub">Building skills for life</p>
        <div className="class-bottom">
          <div className="faces">
            <img alt="" src="/hero.jpg" />
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
        <h2>12 Core Skills</h2>
        <span className="view-all">View all</span>
      </div>

      <div className="skill-grid">
        {skills.map((skill) => (
          <span className="skill-pill" key={skill}>
            {skill}
          </span>
        ))}
      </div>

      <div className="section-head" style={{ marginTop: 28 }}>
        <h2>Trainers</h2>
        <span className="view-all">View all</span>
      </div>

      <div className="teachers">
        {(mentors.length ? mentors : [{ id: "1", user: { name: "Trainer" } }]).map(
          (mentor) => (
            <div className="teacher" key={mentor.id}>
              <img alt={mentor.user.name} src="/logo.jpg" />
              <div className="teacher-tag">{mentor.user.name.split(" ")[0]}</div>
            </div>
          )
        )}
      </div>

      <TabBar />
    </section>
  );
}
