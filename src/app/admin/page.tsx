import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <div className="min-h-screen bg-black text-white p-10">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-gray-400 mt-4">
          Only ADMIN can see this.
        </p>
      </div>
    </ProtectedRoute>
  );
}
