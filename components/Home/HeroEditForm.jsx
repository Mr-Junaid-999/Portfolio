"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function HeroEditForm({ initialContent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(initialContent);

  const handleSave = async () => {
    const { error } = await supabase.from("home_content").upsert(editData);

    if (!error) {
      setIsEditing(false);
      // Page refresh kar dein changes reflect karne ke liye
      window.location.reload();
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-4 mt-8">
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          className="w-full text-4xl font-bold text-center bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        <input
          type="text"
          value={editData.subtitle}
          onChange={(e) =>
            setEditData({ ...editData, subtitle: e.target.value })
          }
          className="w-full text-xl text-gray-600 text-center bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        <textarea
          value={editData.description}
          onChange={(e) =>
            setEditData({ ...editData, description: e.target.value })
          }
          className="w-full text-lg text-gray-700 text-center bg-transparent border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
          rows="3"
        />
        <div className="space-x-2">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditData(initialContent);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsEditing(true)}
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
      >
        Edit Content
      </button>
    </div>
  );
}
