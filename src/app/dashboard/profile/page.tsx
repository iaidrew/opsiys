import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import Link from "next/link";

export default async function ProfilePage() {

  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session?.value) redirect("/login");

  let decoded;

  try {
    decoded = await adminAuth.verifySessionCookie(
      session.value,
      true
    );
  } catch {
    redirect("/login");
  }

  const userId = decoded.uid;

  const startupsSnap = await adminDb
    .collection("users")
    .doc(userId)
    .collection("startups")
    .get();

  const startups = startupsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <div className="min-h-screen bg-black text-white px-10 py-20">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-black mb-12">
          Startup Profiles
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {startups.map((startup) => (
            <Link
              key={startup.id}
              href={`/dashboard/${startup.id}`}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-red-500 transition"
            >
              <h2 className="text-xl font-bold mb-2">
                {startup.name}
              </h2>
              <p className="text-gray-400 text-sm">
                {startup.industry}
              </p>
            </Link>
          ))}

          <Link
            href="/dashboard/profile/create"
            className="bg-red-600/20 border border-red-500 p-8 rounded-2xl text-center hover:bg-red-600/30 transition"
          >
            + Create New Startup
          </Link>
        </div>

      </div>
    </div>
  );
}