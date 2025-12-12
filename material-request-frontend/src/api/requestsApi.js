const API_BASE_URL = "http://localhost:3001";

async function handleResponse(res) {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) {
        message = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message;
      }
    } catch (e) {
      // ignore parse error
    }
    throw new Error(message);
  }
  return res.json();
}

export async function fetchRequests() {
  const res = await fetch(`${API_BASE_URL}/requests`);
  return handleResponse(res);
}

export async function fetchRequestById(id) {
  const res = await fetch(`${API_BASE_URL}/requests/${id}`);
  return handleResponse(res);
}

export async function createRequest(payload) {
  const res = await fetch(`${API_BASE_URL}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateRequest(id, payload) {
  const res = await fetch(`${API_BASE_URL}/requests/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteRequest(id) {
  const res = await fetch(`${API_BASE_URL}/requests/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete request with id ${id}`);
  }
  return true;
}
