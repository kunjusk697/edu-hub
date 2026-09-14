"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function Mentors() {

  const [mentors, setMentors] =
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
        await api("/mentors");

      setMentors(data);
    } catch {
      setMentors([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create() {

    await api("/mentors", {

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
          Mentors / Trainers
        </h1>

        <button
          className="btn"
          onClick={() => setOpen(true)}
        >
          + Add Mentor
        </button>

      </div>

      <div className="panel">

        <table className="table">

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Programmes</th>
            </tr>

          </thead>

          <tbody>

            {mentors.map(
              mentor => (

                <tr key={mentor.id}>

                  <td>
                    <b>
                      {mentor.user.name}
                    </b>
                  </td>

                  <td>
                    {mentor.user.email}
                  </td>

                  <td>
                    {mentor.user.phone || "-"}
                  </td>

                  <td>
                    {mentor.programmes?.length || 0}
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
              Add Mentor
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
              Save Mentor
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
