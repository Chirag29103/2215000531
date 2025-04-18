import React from "react";

export default function Button({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
    >
      Submit
    </button>
  );
}