"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function TestimonialAdminPanel({ testimonials }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteTestimonial = async (testimonialId) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", testimonialId);

      if (error) throw error;

      // Refresh page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Error deleting testimonial: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        💬 Manage Testimonials
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Manage Testimonials
        </h3>
        <div className="space-x-2">
          <button
            onClick={() => (window.location.href = "/admin/testimonials/add")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Add New Testimonial
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">
                {testimonial.client_name}
              </h4>
              <p className="text-gray-600 text-sm">
                {testimonial.position} at {testimonial.company} •{" "}
                {testimonial.rating}⭐
              </p>
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {testimonial.testimonial}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() =>
                  (window.location.href = `/admin/testimonials/edit/${testimonial.id}`)
                }
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTestimonial(testimonial.id)}
                disabled={loading}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
