"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function Batches() {

  const [batches, setBatches] =
    useState<any[]>([]);

  const [open, setOpen] =
    useState(false);

  const [name, setName] =
    useState("");

  const [capacity, setCapacity] =
    useState("25");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  async function load() {

    try {
      const data =
        await api("/batches");

      setBatches(data);
    } catch {
      setBatches([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create() {

    await api("/batches", {

      method: "POST",

      body: JSON.stringify({
        name,
        capacity: Number(capacity) || 25,
        startDate: startDate ? new Date(startDate).toISOString() : null,
        endDate: endDate ? new Date(endDate).toISOString() : null
      })

    });

    setName("");
    setCapacity("25");
    setStartDate("");
    setEndDate("");

    setOpen(false);

    load();
  }

  return (
    <>

      <div className="panel-header">

        <h1 className="page-title">
          Batches
        </h1>

        <button
          className="btn"
          onClick={() => setOpen(true)}
        >
          + Add Batch
        </button>

      </div>

      <div className="panel">

        <table className="table">

          <thead>

            <tr>
              <th>Name</th>
              <th>Capacity</th>
              <th>Start</th>
              <th>End</th>
              <th>Students</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {batches.map(
              batch => (

                <tr key={batch.id}>

                  <td>
                    <b>
                      {batch.name}
                    </b>
                  </td>

                  <td>
                    {batch.capacity}
                  </td>

                  <td>
                    {batch.startDate
                      ? new Date(batch.startDate).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    {batch.endDate
                      ? new Date(batch.endDate).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    {batch.students?.length || 0}
                  </td>

                  <td>
                    <span className="badge">
                      {batch.active ? "Active" : "Inactive"}
                    </span>
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
              Add Batch
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

              <label>Capacity</label>

              <input
                className="input"
                type="number"
                value={capacity}
                onChange={e =>
                  setCapacity(e.target.value)
                }
              />

            </div>

            <div className="form-grid">

              <div className="form-group">

                <label>Start date</label>

                <input
                  className="input"
                  type="date"
                  value={startDate}
                  onChange={e =>
                    setStartDate(e.target.value)
                  }
                />

              </div>

              <div className="form-group">

                <label>End date</label>

                <input
                  className="input"
                  type="date"
                  value={endDate}
                  onChange={e =>
                    setEndDate(e.target.value)
                  }
                />

              </div>

            </div>

            <button
              className="btn"
              onClick={create}
            >
              Save Batch
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
