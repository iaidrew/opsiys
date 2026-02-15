"use client";

import React from "react";

export default function Input(props: {
  type?: string;
  placeholder?: string;
}) {
  return (
    <input
      type={props.type ?? "text"}
      placeholder={props.placeholder}
      className="w-full px-4 py-3 rounded-lg bg-black border border-[var(--border-dark)] text-white placeholder:text-gray-400 focus:outline-none focus:border-red-600"
    />
  );
}
