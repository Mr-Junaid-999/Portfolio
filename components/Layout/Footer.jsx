import Link from "next/link";
import { Linkedin, Github, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#102e27] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[1.4fr_0.6fr_0.8fr] gap-10">
          <div>
            <h3 className="text-xl font-bold mb-3">Junaid UL Hassan</h3>
            <p className="text-[#b7c2b2] max-w-md leading-7 mb-5">Web Developer & Digital Solutions Specialist providing website development, WordPress, GoHighLevel funnels, SEO, and Shopify services.</p>
            <div className="flex gap-4"><Link href="https://www.linkedin.com/in/junaid-hassan-58b272321/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></Link><Link href="https://github.com/Mr-Junaid-999" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={20} /></Link></div>
          </div>
          <div><h4 className="font-bold mb-4">Navigation</h4><div className="space-y-3 text-sm text-[#b7c2b2]"><Link className="block hover:text-white" href="/#services">Services</Link><Link className="block hover:text-white" href="/#projects">Projects</Link><Link className="block hover:text-white" href="/#about">About</Link><Link className="block hover:text-white" href="/#process">Process</Link></div></div>
          <div><h4 className="font-bold mb-4">Contact</h4><div className="space-y-3 text-sm text-[#b7c2b2]"><p className="flex gap-2"><MapPin size={16} /> Lahore, Pakistan</p><p className="flex gap-2"><Phone size={16} /> +92 300 0115907</p><a className="flex gap-2 hover:text-white" href="mailto:mr.junaidulhassan@gmail.com"><Mail size={16} />mr.junaidulhassan@gmail.com</a></div></div>
        </div>
        <div className="border-t border-[#315348] mt-10 pt-6 text-sm text-[#9aaa99]">© {new Date().getFullYear()} Junaid UL Hassan. All rights reserved.</div>
      </div>
    </footer>
  );
}
