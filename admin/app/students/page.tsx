"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function Students() {

  const [students, setStudents] =
    useState<any[]>([]);

  const [open, setOpen] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  async function load() {

    try {
      const data =
        await api("/students");

      setStudents(data);
    } catch {
      setStudents([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create() {

    await api("/students", {

      method: "POST",

      body: JSON.stringify({
        name,
        email,
        phone
      })

    });

    setName("");
    setEmail("");
    setPhone("");

    setOpen(false);

    load();
  }

  return (
    <>

      <div className="panel-header">

        <h1 className="page-title">
          Students
        </h1>

        <button
          className="btn"
          onClick={() => setOpen(true)}
        >
          + Add Student
        </button>

      </div>

      <div className="panel">

        <table className="table">

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Courses</th>
              <th>Batches</th>
            </tr>

          </thead>

          <tbody>

            {students.map(
              student => (

                <tr key={student.id}>

                  <td>
                    <b>
                      {student.user.name}
                    </b>
                  </td>

                  <td>
                    {student.user.email}
                  </td>

                  <td>
                    {student.user.phone || "-"}
                  </td>

                  <td>
                    {student.enrollments?.length || 0}
                  </td>

                  <td>
                    {student.batches?.length || 0}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      {open && (

        <div className="modal-bg">

          <div className="modal">

            <h2>
              Add Student
            </h2>

            <div className="form-group">

              <label>Name</label>

              <input
                className="input"
                value={name}
                onChange={e =>
                  setName(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>Email</label>

              <input
                className="input"
                type="email"
                value={email}
                onChange={e =>
                  setEmail(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>Phone</label>

              <input
                className="input"
                value={phone}
                onChange={e =>
                  setPhone(e.target.value)
                }
              />

            </div>

            <button
              className="btn"
              onClick={create}
            >
              Save Student
            </button>

            {" "}

            <button
              className="btn secondary"
              onClick={() =>
                setOpen(false)
              }
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </>
  );
}
