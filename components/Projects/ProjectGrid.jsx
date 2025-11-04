// // components/Projects/ProjectGrid.jsx
// import { supabase } from "../../lib/supabase";
// import ChatApp from "../ChatApp.png";
// import Creditsplit from "../Creditsplit.png";
// import TaskZone from "../TaskZone.png";
// import Image from "next/image";
// import ProjectFilters from "./ProjectFilters";
// import ProjectAdminPanel from "./ProjectAdminPanel";

// async function getProjects() {
//   try {
//     const { data, error } = await supabase
//       .from("projects")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.error("Error fetching projects:", error);
//       return [];
//     }

//     return data || [];
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     return [];
//   }
// }

// export default async function ProjectGrid({ userRole }) {
//   const projects = await getProjects();

//   // Project images array
//   const projectImages = [TaskZone, ChatApp, Creditsplit];

//   // Default projects agar koi data nahi hai
//   const displayProjects = projects;

//   return (
//     <section
//       id="projects"
//       className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//             My Projects
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
//             A collection of projects Ive worked on, showcasing my skills in web
//             development, mobile apps, and open-source contributions.
//           </p>

//           {/* Client-side Filters */}
//           <ProjectFilters />
//         </div>

//         {/* Projects Grid - Server rendered */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {displayProjects.map((project, index) => {
//             // Har project ke liye different image select karo
//             const projectImage = projectImages[index % projectImages.length];

//             return (
//               <div
//                 key={project.id || index}
//                 className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
//                 data-category={project.category || "web"}
//               >
//                 {/* Project Image */}
//                 <div className="relative h-48 overflow-hidden bg-gray-100">
//                   {projectImage && (
//                     <div className="w-full h-full">
//                       <Image
//                         src={projectImage}
//                         alt={`${project.title} project image`}
//                         width={400}
//                         height={192}
//                         className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                         priority={index < 3} // First 3 images ko priority do
//                       />
//                     </div>
//                   )}
//                   {/* Hover Overlay */}
//                   <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition duration-300 flex items-center justify-center">
//                     <div className="opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-4 group-hover:translate-y-0">
//                       {project.project_url && (
//                         <a
//                           href={project.project_url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition duration-300 shadow-lg"
//                         >
//                           View Project →
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Project Content */}
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition duration-300">
//                     {project.title}
//                   </h3>

//                   <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
//                     {project.description}
//                   </p>

//                   {/* Technologies */}
//                   {project.technologies && (
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {project.technologies.map((tech, techIndex) => (
//                         <span
//                           key={techIndex}
//                           className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-blue-100 hover:text-blue-700 transition duration-300"
//                         >
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   {/* Action Buttons */}
//                   <div className="flex gap-3 pt-4 border-t border-gray-100">
//                     {project.project_url && (
//                       <a
//                         href={project.project_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-medium text-sm"
//                       >
//                         Live Demo
//                       </a>
//                     )}
//                     <button className="flex-1 bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300 font-medium text-sm">
//                       Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* No Projects Message */}
//         {displayProjects.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">🔍</div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-2">
//               No Projects Found
//             </h3>
//             <p className="text-gray-600">
//               No projects available at the moment.
//             </p>
//           </div>
//         )}

//         {/* Admin Controls */}
//         {userRole === "admin" && (
//           <div className="text-center mt-12">
//             <ProjectAdminPanel projects={displayProjects} />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
import { supabase } from "../../lib/supabase";
import Image from "next/image";
import ProjectFilters from "./ProjectFilters";
import ProjectAdminPanel from "./ProjectAdminPanel";

async function getProjects() {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
}

export default async function ProjectGrid({ userRole }) {
  const projects = await getProjects();

  // Public folder se direct image paths
  const projectImages = ["/TaskZone.png", "/ChatApp.png", "/Creditsplit.png"];

  // Default projects agar koi data nahi hai
  const displayProjects = projects;

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

          {/* Client-side Filters */}
          <ProjectFilters />
        </div>

        {/* Projects Grid - Server rendered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => {
            // Har project ke liye different image select karo
            const projectImage = projectImages[index % projectImages.length];

            return (
              <div
                key={project.id || index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                data-category={project.category || "web"}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {projectImage && (
                    <div className="w-full h-full">
                      <Image
                        src={projectImage}
                        alt={`${project.title} project image`}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        priority={index < 3} // First 3 images ko priority do
                      />
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition duration-300 flex items-center justify-center">
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
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-blue-100 hover:text-blue-700 transition duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

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
            );
          })}
        </div>

        {/* No Projects Message */}
        {displayProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Projects Found
            </h3>
            <p className="text-gray-600">
              No projects available at the moment.
            </p>
          </div>
        )}

        {/* Admin Controls */}
        {userRole === "admin" && (
          <div className="text-center mt-12">
            <ProjectAdminPanel projects={displayProjects} />
          </div>
        )}
      </div>
    </section>
  );
}
