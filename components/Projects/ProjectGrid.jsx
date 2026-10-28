"use client";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { projects } from "../../lib/portfolio-data";
import ProjectCover from "./ProjectCover";

const filters = [
  { id: "all", name: "All work" }, { id: "wordpress", name: "WordPress" },
  { id: "nextjs", name: "Next.js" }, { id: "funnels", name: "Funnels" }, { id: "html", name: "HTML / CSS / JS" },
];

export default function ProjectGrid() {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? projects : projects.filter((project) => project.category === active);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 mb-10">
          <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c58b55] mb-3">Selected work</p><h2 className="text-3xl md:text-5xl font-bold text-[#252923]">Projects across websites, funnels, and applications</h2></div>
          <div className="flex flex-wrap gap-2">{filters.map((filter) => <button key={filter.id} type="button" onClick={() => setActive(filter.id)} className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${active === filter.id ? "bg-[#173f35] text-white border-[#173f35]" : "bg-white text-[#60665d] border-[#d8d4c7] hover:border-[#173f35]"}`}>{filter.name}</button>)}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((project) => (
            <article key={project.id} className="group border border-[#d8d4c7] rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
              <ProjectCover
                title={project.title}
                label={project.coverLabel}
                variant={project.coverVariant}
              />
              <div className="p-6">
                {project.badge && <span className="inline-block mb-3 text-xs font-bold uppercase tracking-wider text-[#c58b55]">{project.badge}</span>}
                <h3 className="text-xl font-bold text-[#252923] mb-2">{project.title}</h3>
                <p className="text-[#60665d] leading-7 text-sm mb-5">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">{project.technologies.map((technology) => <span key={technology} className="text-xs font-semibold text-[#454b42] bg-[#f7f5ef] px-2.5 py-1 rounded-full">{technology}</span>)}</div>
                <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#173f35] font-bold text-sm hover:text-[#c58b55]">{project.representativeUrl ? "View representative page" : "Visit website"}<ExternalLink size={15} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
