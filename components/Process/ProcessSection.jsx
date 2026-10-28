import { processSteps, deliveryOptions } from "../../lib/portfolio-data";

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 bg-[#102e27] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c58b55] mb-3">Process</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">A clear, practical path from idea to delivery</h2>
            <p className="text-[#d9e4d9] leading-7">Each project starts with the right questions so scope, priorities, and expectations stay aligned.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-[#315348] border border-[#315348]">
            {processSteps.map((step) => (
              <article key={step.number} className="bg-[#102e27] p-6 md:p-8">
                <span className="text-sm font-bold text-[#c58b55]">{step.number}</span>
                <h3 className="text-xl font-bold mt-3 mb-3">{step.title}</h3>
                <p className="text-[#d9e4d9] leading-7 text-sm">{step.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-[#315348]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
            <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c58b55] mb-2">Typical delivery</p><h3 className="text-2xl md:text-3xl font-bold">Target timelines</h3></div>
            <p className="text-[#b7c2b2] text-sm max-w-xl">Final delivery depends on complexity, functionality, available content, integrations, and revision scope.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {deliveryOptions.map((option) => (
              <article key={option.title} className="border border-[#315348] rounded-xl p-6 bg-[#173f35]/40">
                <h4 className="font-bold mb-2">{option.title}</h4>
                <p className="text-[#c58b55] font-bold text-sm mb-3">{option.timing}</p>
                <p className="text-[#b7c2b2] text-sm leading-6">{option.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
