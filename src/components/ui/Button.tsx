"use client";

import type { ReactNode } from "react";

export default function Button({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <button className="w-full py-3 rounded-lg bg-red-600 text-black font-medium">
      {children}
    </button>
  );
}
