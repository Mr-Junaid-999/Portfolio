"use server";
import { supabase } from "../../lib/supabase";
import TestimonialClient from "./TestimonialClient";

async function getTestimonials() {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching testimonials:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
}

// Get random avatar color (server-side compatible)
// const getAvatarColor = (name) => {
//   const colors = [
//     "bg-gradient-to-r from-blue-500 to-cyan-500",
//     "bg-gradient-to-r from-purple-500 to-pink-500",
//     "bg-gradient-to-r from-green-500 to-emerald-500",
//     "bg-gradient-to-r from-orange-500 to-red-500",
//     "bg-gradient-to-r from-indigo-500 to-purple-500",
//     "bg-gradient-to-r from-teal-500 to-blue-500",
//   ];
//   const index = name.charCodeAt(0) % colors.length;
//   return colors[index];
// };

// Calculate statistics (server-side compatible)
const calculateStatistics = (testimonials) => {
  const totalTestimonials = testimonials.length;
  const fiveStarReviews = testimonials.filter((t) => t.rating === 5).length;
  const averageRating =
    testimonials.length > 0
      ? (
          testimonials.reduce((acc, t) => acc + t.rating, 0) /
          testimonials.length
        ).toFixed(1)
      : "0.0";

  return {
    totalTestimonials,
    fiveStarReviews,
    averageRating,
  };
};

export default async function TestimonialCarousel({ userRole }) {
  const testimonials = await getTestimonials();

  // Default testimonials agar koi data nahi hai
  const displayTestimonials = testimonials;

  const statistics = calculateStatistics(displayTestimonials);

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here what my clients have to say about working with me and the
            results we will achieved together.
          </p>
        </div>

        {/* Testimonials Carousel - Client Component */}
        <TestimonialClient
        // testimonials={displayTestimonials}
        // getAvatarColor={getAvatarColor}
        />

        {/* Statistics - Server Rendered */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {statistics.totalTestimonials}
            </div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {statistics.fiveStarReviews}
            </div>
            <div className="text-gray-600">5-Star Reviews</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {statistics.averageRating}
            </div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
            <div className="text-gray-600">Satisfaction</div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">
            TRUSTED BY COMPANIES WORLDWIDE
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            {displayTestimonials.slice(0, 4).map((testimonial, index) => (
              <div key={index} className="text-gray-400 font-semibold text-lg">
                {testimonial.company}
              </div>
            ))}
          </div>
        </div>

        {/* Admin Controls */}
        {/* {userRole === "admin" && (
          <div className="text-center mt-12">
            <TestimonialAdminPanel testimonials={displayTestimonials} />
          </div>
        )} */}
      </div>
    </section>
  );
}
