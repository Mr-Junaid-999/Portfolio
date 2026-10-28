import { ArrowDown, MapPin } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[680px] items-center overflow-hidden bg-[#f7f5ef] pb-16 pt-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl border-l border-[#c9cbbf] pl-6 sm:pl-10">
          <div className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#173f35]">
            <span className="h-2 w-2 rounded-full bg-[#c58b55]" aria-hidden="true" />
            Available for freelance work
          </div>
          <h1 className="mb-7 max-w-[850px] text-4xl font-bold leading-[1.04] tracking-[-0.045em] text-[#252923] sm:text-6xl lg:text-[72px]">
            Websites and digital marketing built for business growth
          </h1>
          <p className="mb-9 max-w-2xl text-lg leading-8 text-[#60665d] sm:text-xl">
            I create focused websites, WordPress builds, GoHighLevel funnels, Shopify storefronts, Meta Ads campaigns, and SEO strategies for serious businesses.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/#contact" className="rounded-md bg-[#173f35] px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#102e27] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#c58b55] active:bg-[#102e27]">
              Discuss Your Project
            </Link>
            <Link href="/#projects" className="rounded-md border border-[#aeb4a5] bg-white px-6 py-3.5 text-center text-sm font-semibold text-[#252923] transition-colors hover:border-[#173f35] hover:bg-[#d9e4d9] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#c58b55] active:bg-[#c9d7c7]">
              View My Work
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-[#d8d4c7] pt-5 text-sm text-[#60665d] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2"><MapPin size={16} /> Lahore, Pakistan · Remote collaboration</div>
          <Link href="/#services" className="inline-flex items-center gap-2 font-semibold text-[#173f35] transition-colors hover:text-[#c58b55] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#c58b55]">
            Explore services <ArrowDown size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
