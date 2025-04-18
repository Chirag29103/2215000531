import React from "react";

export default function Card({ children }) {
  return (
    <div className="bg-gray-400 bg-opacity-30 rounded-2xl shadow-md p-6 space-y-4">
      {children}
    </div>
  );
}
