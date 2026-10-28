import Link from "next/link";
import { Code2, PanelsTopLeft, Workflow, SearchCheck, ShoppingBag, Megaphone } from "lucide-react";
import { services } from "../../lib/portfolio-data";

const icons = { "nextjs-react": Code2, wordpress: PanelsTopLeft, funnels: Workflow, seo: SearchCheck, shopify: ShoppingBag, "meta-ads": Megaphone };

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[1fr_0.75fr] gap-6 items-end mb-12 pb-8 border-b border-[#d8d4c7]">
          <div><p className="text-sm font-bold text-[#c58b55] mb-3">Services</p><h2 className="text-3xl md:text-5xl font-bold text-[#252923] leading-tight">Digital work with a clear business purpose</h2></div>
          <p className="text-[#60665d] leading-7 md:pb-1">Website, funnel, storefront, and search support informed by practical development experience.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-px bg-[#d8d4c7] border border-[#d8d4c7]">
          {services.map((service, index) => {
            const Icon = icons[service.id];
            return <article key={service.id} className="lg:col-span-2 bg-white p-7 lg:p-8 flex flex-col">
              <div className="flex items-start justify-between mb-10"><Icon size={24} strokeWidth={1.7} className="text-[#173f35]" /><span className="text-xs font-bold text-[#9a9f92]">0{index + 1}</span></div>
              <h3 className="text-xl font-bold text-[#252923] mb-3">{service.title}</h3>
              <p className="text-[#60665d] leading-7 mb-6">{service.description}</p>
              <ul className="space-y-2 mb-8 text-sm text-[#454b42]">{service.deliverables.map((item) => <li key={item}>— {item}</li>)}</ul>
              <Link href={`/?service=${encodeURIComponent(service.id)}#contact`} className="mt-auto text-sm font-bold text-[#173f35] hover:text-[#c58b55] underline underline-offset-4">Discuss this service</Link>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}