"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

interface Startup {
  id: string;
  name: string;
}

export default function StartupSwitcher() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const activeStartupId = params?.startupId as string | undefined;

  const [startups, setStartups] = useState<Startup[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStartups = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "users", user.uid, "startups")
        );

        const data: Startup[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));

        setStartups(data);
      } catch (error) {
        console.error("Startup Switcher Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, [user]);

  if (!user || loading || startups.length === 0) return null;

  const activeStartup = startups.find(
    (s) => s.id === activeStartupId
  );

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-white/5 border border-red-500/20 rounded-xl text-sm hover:bg-white/10 transition flex items-center gap-2"
      >
        <span className="text-red-500 font-semibold">
          {activeStartup?.name || "Select Startup"}
        </span>
        <span className="text-gray-400 text-xs">▼</span>
      </button>

      {open && (
        <div className="absolute mt-3 w-56 bg-black border border-red-500/20 rounded-xl shadow-2xl overflow-hidden z-50">

          {startups.map((startup) => (
            <button
              key={startup.id}
              onClick={() => {
                setOpen(false);
                router.push(`/dashboard/${startup.id}`);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition
                ${
                  startup.id === activeStartupId
                    ? "bg-red-600 text-white"
                    : "text-gray-300 hover:bg-white/5"
                }
              `}
            >
              {startup.name}
            </button>
          ))}

        </div>
      )}
    </div>
  );
}