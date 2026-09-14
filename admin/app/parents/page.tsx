"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function Parents() {

  const [parents, setParents] =
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
        await api("/parents");

      setParents(data);
    } catch {
      setParents([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create() {

    await api("/parents", {

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
          Parents
        </h1>

        <button
          className="btn"
          onClick={() => setOpen(true)}
        >
          + Add Parent
        </button>

      </div>

      <div className="panel">

        <table className="table">

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Children</th>
            </tr>

          </thead>

          <tbody>

            {parents.map(
              parent => (

                <tr key={parent.id}>

                  <td>
                    <b>
                      {parent.user.name}
                    </b>
                  </td>

                  <td>
                    {parent.user.email}
                  </td>

                  <td>
                    {parent.user.phone || "-"}
                  </td>

                  <td>
                    {parent.children?.length || 0}
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
              Add Parent
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
              Save Parent
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
