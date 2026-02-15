"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: ReactNode;
  requiredRole?: "ADMIN" | "USER";
}

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      }

      if (requiredRole && role !== requiredRole) {
        router.replace("/dashboard");
      }
    }
  }, [user, role, loading, router, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Authenticating...
      </div>
    );
  }

  if (!user) return null;

  if (requiredRole && role !== requiredRole) return null;

  return <>{children}</>;
}
