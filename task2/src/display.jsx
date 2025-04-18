import React from "react";

export default function display({ prev, curr, average }) {
  return (
    <div className="space-y-2">
      <p><strong>Average:</strong> {average.toFixed(2)}</p>
    </div>
  );
}
