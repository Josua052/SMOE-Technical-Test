import React from "react";

const StatusBadge = ({ status }) => {
  if (!status) return null;

  const lower = status.toLowerCase(); 

  return (
    <span className={`status-badge status-badge--${lower}`}>{status}</span>
  );
};

export default StatusBadge;
