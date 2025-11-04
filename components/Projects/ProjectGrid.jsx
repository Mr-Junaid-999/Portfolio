"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ProjectGrid({ userRole }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching projects:", error);
          return;
        }

        if (data) {
          setProjects(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  // Default projects agar koi data nahi hai
  const displayProjects = projects;

  // Categories filter
  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Development" },
    { id: "mobile", name: "Mobile Apps" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? displayProjects
      : displayProjects.filter((project) => project.category === activeFilter);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            My Projects
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Loading amazing projects...
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
      id="projects"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A collection of projects Ive worked on, showcasing my skills in web
            development, mobile apps, and open-source contributions.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id || index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                {project.image_url &&
                project.image_url !== "/api/placeholder/400/250" ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {project.category === "web" && "🌐"}
                        {project.category === "mobile" && "📱"}
                        {project.category === "open-source" && "🔧"}
                      </div>
                      <p className="text-sm font-medium">{project.title}</p>
                    </div>
                  </div>
                )}

                {/* Category Badge */}

                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
                      project.category === "web"
                        ? "bg-green-500"
                        : project.category === "mobile"
                        ? "bg-blue-500"
                        : "bg-purple-500"
                    }`}
                  >
                    {project.category === "web" && "🌐 Web"}
                    {project.category === "mobile" && "📱 Mobile"}
                    {project.category === "open-source" && "🔧 Open Source"}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-4 group-hover:translate-y-0">
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition duration-300 shadow-lg"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies &&
                    project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-blue-100 hover:text-blue-700 transition duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-medium text-sm"
                    >
                      Live Demo
                    </a>
                  )}
                  <button className="flex-1 bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300 font-medium text-sm">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Projects Found
            </h3>
            <p className="text-gray-600">
              No projects match the selected category.
            </p>
          </div>
        )}

        {/* Admin Controls */}
        {userRole === "admin" && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
              ✨ Manage Projects
            </button>
          </div>
        )}
      </div>

      {/* Add custom styles for line clamp */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
