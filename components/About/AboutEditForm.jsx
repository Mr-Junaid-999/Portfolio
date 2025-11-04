"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AboutEditForm({ initialContent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("about_content").upsert({
        ...editData,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      setIsEditing(false);
      // Page refresh kar dein changes reflect karne ke liye
      window.location.reload();
    } catch (error) {
      console.error("Error saving about content:", error);
      alert("Error saving content: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="text-center mt-12">
        <div className="space-y-4 mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About Me
          </h2>
          <textarea
            value={editData.bio || ""}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, bio: e.target.value }))
            }
            className="w-full max-w-3xl mx-auto text-lg text-gray-700 bg-white border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:border-indigo-500 resize-y"
            rows="4"
            placeholder="Enter your bio here..."
          />
        </div>

        <div className="space-x-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditData(initialContent);
            }}
            disabled={loading}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mt-12">
      <button
        onClick={() => setIsEditing(true)}
        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Edit About Section
      </button>
    </div>
  );
}
