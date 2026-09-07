"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { api } from "../lib/api";

export default function HomePage() {

  const [counts, setCounts] = useState({
    students: 0,
    parents: 0,
    mentors: 0,
    batches: 0
  });

  useEffect(() => {
    Promise.all([
      api("/students").catch(() => []),
      api("/parents").catch(() => []),
      api("/mentors").catch(() => []),
      api("/batches").catch(() => [])
    ]).then(([students, parents, mentors, batches]) => {
      setCounts({
        students: students.length,
        parents: parents.length,
        mentors: mentors.length,
        batches: batches.length
      });
    });
  }, []);

  return (
    <>
      <h1 className="page-title">Dashboard</h1>
      <div className="cards">
        <Link href="/students" className="card">
          <div className="card-title">Students</div>
          <div className="card-value">{counts.students}</div>
        </Link>
        <Link href="/parents" className="card">
          <div className="card-title">Parents</div>
          <div className="card-value">{counts.parents}</div>
        </Link>
        <Link href="/mentors" className="card">
          <div className="card-title">Mentors</div>
          <div className="card-value">{counts.mentors}</div>
        </Link>
        <Link href="/batches" className="card">
          <div className="card-title">Batches</div>
          <div className="card-value">{counts.batches}</div>
        </Link>
      </div>
    </>
  );
}
