"use client";
import { useState } from "react";

export default function ProjectFilters() {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Development" },
    { id: "mobile", name: "Mobile Apps" },
  ];

  const handleFilter = (categoryId) => {
    setActiveFilter(categoryId);

    // Filter projects using JavaScript
    const projectElements = document.querySelectorAll("[data-category]");
    projectElements.forEach((element) => {
      if (
        categoryId === "all" ||
        element.getAttribute("data-category") === categoryId
      ) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleFilter(category.id)}
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
  );
}
