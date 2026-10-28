import Junaid from "../../public/JunaidHassan.jpeg";
import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="relative mx-auto max-w-md border border-[#d8d4c7] bg-[#d9e4d9] p-3 rounded-md">
      <Image src={Junaid} alt="Junaid UL Hassan, web developer" className="aspect-[4/5] object-cover object-top rounded-sm" sizes="(max-width: 1024px) 90vw, 420px" priority />
      <div className="absolute -bottom-4 -left-4 bg-[#173f35] text-white px-5 py-3 rounded-md shadow-sm">
        <p className="text-xs uppercase tracking-[0.16em] text-[#d9e4d9]">Specialties</p>
        <p className="font-bold text-sm mt-1">Next.js · WordPress · Funnels</p>
      </div>
    </div>
  );
}
