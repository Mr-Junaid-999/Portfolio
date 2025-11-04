"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import AdminPanel from "../../../components/Admin/AdminPanel";

export default function Admin() {
  const [userRole, setUserRole] = useState("user");
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/signin");
        return;
      }

      const { data } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (data?.role !== "admin") {
        router.push("/");
        return;
      }

      setUserRole(data.role);
    };
    checkAccess();
  }, []);

  if (userRole !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <AdminPanel />;
}
