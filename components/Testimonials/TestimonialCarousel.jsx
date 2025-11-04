"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function TestimonialCarousel({ userRole }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching testimonials:", error);
          return;
        }

        if (data) {
          setTestimonials(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  // Default testimonials agar koi data nahi hai
  const displayTestimonials =
    testimonials.length > 0
      ? testimonials
      : [
          {
            id: 1,
            client_name: "Sarah Johnson",
            position: "CEO",
            company: "Tech Innovations",
            testimonial:
              "Working with this developer was an absolute pleasure. They delivered our project ahead of schedule and the quality exceeded our expectations. The attention to detail and problem-solving skills are exceptional.",
            rating: 5,
          },
          {
            id: 2,
            client_name: "Michael Chen",
            position: "Product Manager",
            company: "StartUp Grid",
            testimonial:
              "Outstanding work! The developer transformed our vision into a beautiful, functional reality. Their communication was excellent throughout the project, and they were always available to discuss ideas and improvements.",
            rating: 5,
          },
          {
            id: 3,
            client_name: "Emily Rodriguez",
            position: "Marketing Director",
            company: "Digital Solutions Inc",
            testimonial:
              "I'm thoroughly impressed with the professionalism and technical expertise. The final product not only met but exceeded our requirements. Looking forward to working together on future projects!",
            rating: 4,
          },
          {
            id: 4,
            client_name: "David Wilson",
            position: "CTO",
            company: "Cloud Systems",
            testimonial:
              "Rarely do you find a developer who combines technical skill with such strong business acumen. They understood our needs perfectly and delivered a solution that has significantly improved our workflow.",
            rating: 5,
          },
        ];

  // Auto-rotate carousel
  useEffect(() => {
    if (displayTestimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === displayTestimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [displayTestimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex(
      currentIndex === displayTestimonials.length - 1 ? 0 : currentIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      currentIndex === 0 ? displayTestimonials.length - 1 : currentIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex justify-center gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-6 h-6 ${
              index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Get random avatar color
  const getAvatarColor = (name) => {
    const colors = [
      "bg-gradient-to-r from-blue-500 to-cyan-500",
      "bg-gradient-to-r from-purple-500 to-pink-500",
      "bg-gradient-to-r from-green-500 to-emerald-500",
      "bg-gradient-to-r from-orange-500 to-red-500",
      "bg-gradient-to-r from-indigo-500 to-purple-500",
      "bg-gradient-to-r from-teal-500 to-blue-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Loading kind words from clients...
          </p>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

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

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {displayTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id || index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 md:p-12 border border-gray-100">
                    {/* Quote Icon */}
                    <div className="text-6xl text-blue-100 mb-6 text-center">
                      ❝
                    </div>

                    {/* Rating */}
                    <StarRating rating={testimonial.rating} />

                    {/* Testimonial Text */}
                    <blockquote className="text-lg md:text-xl text-gray-700 text-center leading-relaxed mb-8 italic">
                      {testimonial.testimonial}
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex items-center justify-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-full ${getAvatarColor(
                          testimonial.client_name
                        )} flex items-center justify-center text-white font-bold text-xl`}
                      >
                        {testimonial.client_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-gray-800 text-lg">
                          {testimonial.client_name}
                        </p>
                        <p className="text-gray-600">
                          {testimonial.position} at{" "}
                          <span className="text-blue-600 font-semibold">
                            {testimonial.company}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-blue-100 rounded-full opacity-50"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-blue-100 rounded-full opacity-30"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {displayTestimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-gray-600 hover:text-blue-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-gray-600 hover:text-blue-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {displayTestimonials.length > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {displayTestimonials.length}
            </div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {displayTestimonials.filter((t) => t.rating === 5).length}
            </div>
            <div className="text-gray-600">5-Star Reviews</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {(
                displayTestimonials.reduce((acc, t) => acc + t.rating, 0) /
                  displayTestimonials.length || 0
              ).toFixed(1)}
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
        {userRole === "admin" && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
              💬 Manage Testimonials
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
