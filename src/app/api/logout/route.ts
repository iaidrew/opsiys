\import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ status: "logged out" });

  response.cookies.set({
    name: "session",
    value: "",
    httpOnly: true,
    secure: false,
    expires: new Date(0),
    path: "/",
  });

  return response;
}