"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ExperienceTimeline({ userRole }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from("experience")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching experience:", error);
          return;
        }

        if (data) {
          setExperiences(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  // Default data agar koi experience nahi hai
  const displayExperiences = experiences;

  if (loading) {
    return (
      <section id="experience" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Experience
          </h2>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Professional Experience
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          My journey through various roles and companies where Ive honed my
          skills and delivered impactful solutions.
        </p>

        {/* Timeline Design */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 hidden lg:block"></div>

          <div className="space-y-12">
            {displayExperiences.map((exp, index) => (
              <div
                key={exp.id || index}
                className={`relative flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 hidden lg:block"></div>

                {/* Content Card */}
                <div
                  className={`lg:w-1/2 ${
                    index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"
                  } mb-8 lg:mb-0`}
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 mx-2 border border-gray-100">
                    {/* Experience Type Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          exp.type === "work"
                            ? "bg-green-100 text-green-800"
                            : exp.type === "internship"
                            ? "bg-blue-100 text-blue-800"
                            : exp.type === "achievement"
                            ? "bg-purple-100  text-purple-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {exp.type === "work"
                          ? "💼 Work"
                          : exp.type === "internship"
                          ? "🎓 Internship"
                          : exp.type === "achievement"
                          ? "🏆 Achievement"
                          : "🔄 In Progress"}
                      </span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {exp.period}
                      </span>
                    </div>

                    {/* Title and Company */}
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 1112 0A6 6 0 014 10z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M10 6a1 1 0 00-1 1v3a1 1 0 01-1 1H7a1 1 0 100 2h1a3 3 0 003-3V7a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {exp.company}
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Skills/Tags (if available) */}
                    {exp.skills && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.skills.split(",").map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Hover effect border */}
                    <div className="absolute inset-0 rounded-xl border-2 border-transparent hover:border-blue-200 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Date for mobile */}
                <div className="lg:hidden w-full text-center mt-4">
                  <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg inline-block">
                    <span className="font-medium">{exp.period}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative Grid Layout for smaller screens */}
        <div className="lg:hidden mt-8 grid gap-6 md:grid-cols-2">
          {displayExperiences.map((exp, index) => (
            <div
              key={exp.id || index}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    exp.type === "work"
                      ? "bg-green-100 text-green-800"
                      : exp.type === "internship"
                      ? "bg-blue-100 text-blue-800"
                      : exp.type === "achievement"
                      ? "bg-purple-100  text-purple-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {exp.type === "work"
                    ? "💼 Work"
                    : exp.type === "internship"
                    ? "🎓 Internship"
                    : exp.type === "achievement"
                    ? "🏆 Achievement"
                    : "🔄 In Progress"}
                </span>
                <span className="text-sm text-gray-500">{exp.period}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {exp.title}
              </h3>
              <p className="text-lg font-semibold text-blue-600 mb-3">
                {exp.company}
              </p>
              <p className="text-gray-600 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>

        {userRole === "admin" && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Manage Experience
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
