import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import {
  fetchRequests,
  deleteRequest,
} from "../api/requestsApi";

const MaterialRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchRequests();
      setRequests(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
    );
    if (!confirmed) return;

    try {
    } catch (err) {
      alert(err.message || "Failed to delete request");
    }
  };

  return (
    <section className="card">
      <div className="card__header">
        <div>
          <h2 className="card__title">Material Requests</h2>
          <p className="card__subtitle">
            Create, view, edit, and delete material requests.
          </p>
        </div>

        <Link to="/requests/new" className="btn btn--primary">
          + New Material 
        </Link>
      </div>

      {loading && <p>Loading ...</p>}
      {error && (
        <p style={{ color: "red", marginBottom: "0.75rem" }}>{error}</p>
      )}

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Request No</th>
              <th>Request Date</th>
              <th>Requester</th>
              <th>Department</th>
              <th>Status</th>
              <th>Total Items</th>
              <th style={{ width: "130px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && requests.length === 0 ? (
              <tr>
                <td colSpan={7} className="table__empty">
                  No material requests yet. Click "New Material Request" to
                  create one.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.requestNo}</td>
                  <td>
                    {/* jika backend kirim ISO date, potong 10 char pertama */}
                    {req.requestDate?.slice(0, 10)}
                  </td>
                  <td>{req.requester}</td>
                  <td>{req.department}</td>
                  <td>
                    <StatusBadge status={req.status} />
                  </td>
                  <td>{req.materials?.length ?? 0}</td>
                  <td className="table__actions">
                    <Link
                      to={`/requests/edit/${req.id}`}
                      className="btn btn--ghost btn--xs"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn--danger btn--xs"
                      onClick={() => handleDelete(req.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MaterialRequestList;
