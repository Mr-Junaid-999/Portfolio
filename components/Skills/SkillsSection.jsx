import { supabase } from "../../lib/supabase";
import SkillsFilters from "./SkillsFilters";
import SkillsAdminPanel from "./SkillsAdminPanel";

async function getSkills() {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("proficiency", { ascending: false });

    if (error) {
      console.error("Error fetching skills:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
}

// Get proficiency color (server-side compatible)
const getProficiencyColor = (proficiency) => {
  if (proficiency >= 90) return "from-green-500 to-emerald-600";
  if (proficiency >= 80) return "from-blue-500 to-cyan-600";
  if (proficiency >= 70) return "from-purple-500 to-indigo-600";
  if (proficiency >= 60) return "from-orange-500 to-red-500";
  return "from-gray-500 to-gray-600";
};

// Get proficiency level text (server-side compatible)
const getProficiencyLevel = (proficiency) => {
  if (proficiency >= 90) return "Expert";
  if (proficiency >= 80) return "Advanced";
  if (proficiency >= 70) return "Intermediate";
  if (proficiency >= 60) return "Beginner";
  return "Novice";
};

// Get category icon (server-side compatible)
const getCategoryIcon = (category) => {
  const icons = {
    frontend: "⚡",
    backend: "🔧",
    database: "🗄️",
    tools: "🛠️",
    programming: "💻",
    styling: "🎨",
    cloud: "☁️",
  };
  return icons[category] || "💡";
};

export default async function SkillsSection({ userRole }) {
  const skills = await getSkills();

  // Default skills agar koi data nahi hai
  const displaySkills = skills;

  // Categories data client component ko pass karenge
  const categoriesData = [
    { id: "all", name: "All Skills", icon: "⭐", count: displaySkills.length },
    {
      id: "frontend",
      name: "Frontend",
      icon: "🎨",
      count: displaySkills.filter((s) => s.category === "frontend").length,
    },
    {
      id: "backend",
      name: "Backend",
      icon: "⚙️",
      count: displaySkills.filter((s) => s.category === "backend").length,
    },
    {
      id: "database",
      name: "Database",
      icon: "🗄️",
      count: displaySkills.filter((s) => s.category === "database").length,
    },
    {
      id: "tools",
      name: "Tools",
      icon: "🛠️",
      count: displaySkills.filter((s) => s.category === "tools").length,
    },
    {
      id: "programming",
      name: "Programming",
      icon: "💡",
      count: displaySkills.filter((s) => s.category === "programming").length,
    },
  ];

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here a comprehensive overview of my technical skills and proficiency
            levels across different technologies.
          </p>
        </div>

        {/* Category Filters - Client Component */}
        <SkillsFilters categories={categoriesData} skills={displaySkills} />

        {/* Skills Grid - Server Rendered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySkills.map((skill, index) => (
            <div
              key={skill.id || index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-6 border border-gray-100"
              data-category={skill.category || "programming"}
            >
              {/* Skill Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition duration-300">
                    <span className="text-xl">
                      {getCategoryIcon(skill.category)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {skill.category}
                    </p>
                  </div>
                </div>

                {/* Proficiency Badge */}
                <div className="text-right">
                  <div
                    className={`text-2xl font-bold bg-gradient-to-r ${getProficiencyColor(
                      skill.proficiency
                    )} bg-clip-text text-transparent`}
                  >
                    {skill.proficiency}%
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {getProficiencyLevel(skill.proficiency)}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Proficiency</span>
                  <span>{skill.proficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${getProficiencyColor(
                      skill.proficiency
                    )}`}
                    style={{
                      width: `${skill.proficiency}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Experience Level Indicator */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
                <span>Expert</span>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* No Skills Message */}
        {displaySkills.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Skills Found
            </h3>
            <p className="text-gray-600">No skills available at the moment.</p>
          </div>
        )}

        {/* Admin Controls */}
        {userRole === "admin" && <SkillsAdminPanel skills={displaySkills} />}
      </div>
    </section>
  );
}
