import { redirect } from "next/navigation";
import { getAuth } from "firebase/auth";

export default function ProfilePage() {
  redirect("/dashboard"); // or wherever profile actually is
}