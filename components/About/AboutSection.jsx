"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function AboutSection({ userRole }) {
  const [content, setContent] = useState({
    bio: "",
    education: [],
    skills_overview: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from("about_content")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching about content:", error);
        // Insert default content if not exists
        await insertDefaultContent();
        return;
      }

      if (data) {
        setContent(data);
        setEditData(data);
      } else {
        // Insert default content if not exists
        await insertDefaultContent();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const insertDefaultContent = async () => {
    const { data, error } = await supabase
      .from("about_content")
      .insert()
      .select()
      .single();

    if (!error && data) {
      setContent(data);
      setEditData(data);
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase.from("about_content").upsert({
        ...editData,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      setContent(editData);
      setIsEditing(false);
      await fetchContent(); // Refresh data
    } catch (error) {
      console.error("Error saving about content:", error);
    }
  };

  if (loading) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading about section...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {isEditing && userRole === "admin" ? (
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                About Me
              </h2>
              <input
                type="text"
                value={editData.bio || ""}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, bio: e.target.value }))
                }
                className="w-full text-lg text-gray-700 text-center bg-transparent border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                rows="3"
              />
            </div>
          ) : (
            <>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                About Me
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {content.bio}
              </p>
            </>
          )}
        </div>

        {/* Admin Controls */}
        {userRole === "admin" && (
          <div className="text-center mt-12">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Edit About Section
              </button>
            ) : (
              <div className="space-x-4">
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditData(content);
                  }}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
