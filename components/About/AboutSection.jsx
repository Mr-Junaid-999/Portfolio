export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#f7f5ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.75fr_1.25fr] gap-12 items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c58b55] mb-3">About</p>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-950 leading-tight">Direct communication, practical development</h2>
        </div>
        <div>
          <p className="text-lg text-slate-700 leading-8 mb-6">
            I am a Computer Science graduate with hands-on experience building Next.js and React applications, WordPress websites, GoHighLevel funnels, and SEO-focused content systems. My work includes full-stack storefront and dashboard functionality, REST API integration, and database-backed workflows.
          </p>
          <p className="text-slate-600 leading-8 mb-8">
            Clients work directly with me from the initial discussion through design, development, review, and delivery. You can expect clear scope, straightforward communication, and implementation tailored to the project rather than a one-size-fits-all template.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 border-y border-slate-200 py-6">
            {[{ label: "Core stack", value: "Next.js, React, JavaScript" }, { label: "Web platforms", value: "WordPress, GoHighLevel" }, { label: "Growth services", value: "On-page SEO, Shopify" }].map((item) => (
              <div key={item.label}><p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">{item.label}</p><p className="font-semibold text-slate-800 text-sm">{item.value}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
