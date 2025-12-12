import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchRequestById,
  createRequest,
  updateRequest,
} from "../api/requestsApi";

const EMPTY_MATERIAL_ROW = {
  materialCode: "",
  materialDescription: "",
  materialType: "",
  quantity: "",
  unit: "",
  uom: "",
  neededDate: "",
  remarks: "",
};

const MaterialRequestForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(params.id);


  useEffect(() => {
    const loadRequest = async () => {
      if (!isEdit) return;
      try {
        setLoading(true);
        setError("");
        const data = await fetchRequestById(params.id);

        setHeader({
          requestNo: data.requestNo || "",
          requestDate: data.requestDate?.slice(0, 10) || "",
          requester: data.requester || "",
          department: data.department || "",
          remarks: data.remarks || "",
        });

        const mappedMaterials =
          data.materials && data.materials.length > 0
            ? data.materials.map((m) => ({
                materialCode: m.materialCode || "",
                materialType: m.materialType || "",
                quantity: m.quantity?.toString() || "",
                unit: m.unit || "",
                uom: m.uom || "",
                neededDate: m.neededDate?.slice(0, 10) || "",
              }))
            : [{ ...EMPTY_MATERIAL_ROW }];

        setMaterials(mappedMaterials);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load request data");
      } finally {
        setLoading(false);
      }
    };

    loadRequest();
  }, [isEdit, params.id]);

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeader((prev) => ({ ...prev, [name]: value }));
  };

  const handleMaterialChange = (index, field, value) => {
    const updated = [...materials];
    updated[index] = { ...updated[index], [field]: value };
    setMaterials(updated);
  };

  const addMaterialRow = () => {
    setMaterials((prev) => [...prev, { ...EMPTY_MATERIAL_ROW }]);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      const cleanedMaterials = materials.map((m) => ({
        materialCode: m.materialCode || undefined,
        materialDescription: m.materialDescription,
        materialType: m.materialType,
        quantity: Number(m.quantity || 0),
        unit: m.unit,
        uom: m.uom || undefined,
        neededDate: m.neededDate,
        remarks: m.remarks || undefined,
      }));

      const payload = {
        requestNo: header.requestNo,
        requestDate: header.requestDate,
        requester: header.requester,
        department: header.department,
        remarks: header.remarks || undefined,
        materials: cleanedMaterials,
      };

      if (isEdit) {
        await updateRequest(params.id, payload);
        alert("Request updated successfully");
      } else {
        await createRequest(payload);
        alert("Request created successfully");
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  const pageTitle = isEdit ? "Edit Material Request" : "Create Material Request";

  return (
    <section className="card">
      <div className="card__header">
        <div>
          <h2 className="card__title">{pageTitle}</h2>
          <p className="card__subtitle">
            Fill in the request header and material details.
          </p>
        </div>

        <Link to="/" className="btn btn--ghost">
          ← Back to List
        </Link>
      </div>

      {loading ? (
        <p>Loading request data...</p>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          {error && (
            <p style={{ color: "red", marginBottom: "0.75rem" }}>{error}</p>
          )}

          {/* Header Section */}
          <div className="form__section">
            <h3 className="form__section-title">Request Information</h3>
            <div className="form__grid">
              <div className="form__field">
                <label htmlFor="requestNo">Request No</label>
                <input
                  id="requestNo"
                  name="requestNo"
                  type="text"
                  value={header.requestNo}
                  onChange={handleHeaderChange}
                  placeholder="e.g. MR-001"
                  required
                />
              </div>
              <div className="form__field">
                <label htmlFor="requestDate">Request Date</label>
                <input
                  id="requestDate"
                  name="requestDate"
                  type="date"
                  value={header.requestDate}
                  onChange={handleHeaderChange}
                  required
                />
              </div>
              <div className="form__field">
                <label htmlFor="requester">Requester</label>
                <input
                  id="requester"
                  name="requester"
                  type="text"
                  value={header.requester}
                  onChange={handleHeaderChange}
                  placeholder="Requester name"
                  required
                />
              </div>
              <div className="form__field">
                <label htmlFor="department">Department</label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  value={header.department}
                  onChange={handleHeaderChange}
                  placeholder="e.g. Engineering"
                  required
                />
              </div>
            </div>

            
          </div>

          {/* Material Details */}
          <div className="form__section">
            <div className="form__section-header">
              <h3 className="form__section-title">Material Details</h3>
              <button
                type="button"
                className="btn btn--secondary btn--sm"
                onClick={addMaterialRow}
              >
                + Add Material
              </button>
            </div>

            <div className="table-wrapper table-wrapper--scroll">
              <table className="table table--compact">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Material Code</th>
                    <th>Material Description</th>
                    <th>Type</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>UoM</th>
                    <th>Needed Date</th>
                    <th>Remarks</th>
                    <th style={{ width: "60px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((m, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="text"
                          value={m.materialCode}
                          onChange={(e) =>
                            handleMaterialChange(
                              index,
                              "materialCode",
                              e.target.value
                            )
                          }
                          placeholder="Code"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={m.materialDescription}
                          onChange={(e) =>
                            handleMaterialChange(
                              index,
                              "materialDescription",
                              e.target.value
                            )
                          }
                          placeholder="Description"
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={m.materialType}
                          onChange={(e) =>
                            handleMaterialChange(
                              index,
                              "materialType",
                              e.target.value
                            )
                          }
                          placeholder="Type"
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          value={m.quantity}
                          onChange={(e) =>
                            handleMaterialChange(
                              index,
                              "quantity",
                              e.target.value
                            )
                          }
                          placeholder="Qty"
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={m.unit}
                          onChange={(e) =>
                            handleMaterialChange(index, "unit", e.target.value)
                          }
                          placeholder="Unit"
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={m.uom}
                          onChange={(e) =>
                            handleMaterialChange(index, "uom", e.target.value)
                          }
                          placeholder="UoM"
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={m.neededDate}
                          onChange={(e) =>
                            handleMaterialChange(
                              index,
                              "neededDate",
                              e.target.value
                            )
                          }
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={m.remarks}
                          onChange={(e) =>
                            handleMaterialChange(
                              index,
                              "remarks",
                              e.target.value
                            )
                          }
                          placeholder="Optional"
                        />
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="hint-text">
              At least one material is required. You can add or remove rows as
              needed.
            </p>
          </div>

          <div className="form__actions">
            <Link to="/" className="btn btn--ghost">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={submitting}
            >
              {submitting
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                ? "Update Request"
                : "Create Request"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default MaterialRequestForm;
