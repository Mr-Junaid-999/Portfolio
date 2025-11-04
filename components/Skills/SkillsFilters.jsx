"use client";
import { useState } from "react";

export default function SkillsFilters({ categories, skills }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleFilter = (categoryId) => {
    setActiveCategory(categoryId);

    // Filter skills using JavaScript
    const skillElements = document.querySelectorAll("[data-category]");
    skillElements.forEach((element) => {
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
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleFilter(category.id)}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
            activeCategory === category.id
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md"
          }`}
        >
          <span className="text-lg">{category.icon}</span>
          <span>{category.name}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              activeCategory === category.id
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
}
