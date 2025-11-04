"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Layout/Navbar";
import Footer from "../../../components/Layout/Footer";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/signin");
        return;
      }

      setUser(user);

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setUserData(data);
      }
      setLoading(false);
    };
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className=" bg-gray-50 pt-16">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">
                  {userData?.name?.charAt(0).toUpperCase() ||
                    user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                {userData?.name || "User"}
              </h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500 capitalize mt-1">
                {userData?.role}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Full Name
                    </label>
                    <p className="text-gray-800">
                      {userData?.name || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <p className="text-gray-800">{user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Phone Number
                    </label>
                    <p className="text-gray-800">
                      {userData?.phone_number || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Role
                    </label>
                    <p className="text-gray-800 capitalize">{userData?.role}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Account Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Member Since
                    </label>
                    <p className="text-gray-800">
                      {userData?.created_at
                        ? new Date(userData.created_at).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      User ID
                    </label>
                    <p className="text-gray-800 text-sm font-mono truncate">
                      {user?.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => router.push("/")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Back to Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
