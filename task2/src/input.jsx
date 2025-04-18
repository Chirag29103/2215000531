import React from "react";

export default function Input({ value, onChange }) {
  return (
    <input
      type="text"
      className="border p-2 w-full rounded-md"
      placeholder="Enter number ID (primes, fibo, even, rand)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
