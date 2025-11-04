import Link from "next/link";
import { MessageCircle } from "lucide-react";
import {
  Linkedin,
  Github,
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Portfolio</h3>
            <p className="text-gray-300 mb-4">
              Passionate developer creating innovative solutions and beautiful
              experiences. Lets build something amazing together.
            </p>
            <div className="flex space-x-4">
              <div className="flex align-middle justify-center gap-2   text-gray-300  py-3 rounded-lg font-medium hover:cursor-pointer  transition duration-300">
                <MessageCircle className="w-5 h-5 cursor-pointer hover:text-blue-600 " />
                Available for freelance work
              </div>
            </div>
            <div className="flex gap-4 pt-4 text-gray-300">
              <span className="font-medium">Follow me:</span>
              <Link
                href={"https://www.linkedin.com/in/junaid-hassan-58b272321/"}
              >
                <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-600" />
              </Link>
              <Link href={"https://github.com/Mr-Junaid-999"}>
                <Github className="w-5 h-5 cursor-pointer hover:text-black" />
              </Link>
              <Link href={"https://www.facebook.com/junaid.ulhassan.73997"}>
                <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-700" />
              </Link>
              <Link href={"https://www.instagram.com/mr_junaid_999.9/"}>
                <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-500" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/#home"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Home
              </Link>
              <Link
                href="/#about"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                About
              </Link>
              <Link
                href="/#experience"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Experience
              </Link>
              <Link
                href="/#projects"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Projects
              </Link>
              <Link
                href="/#skills"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Skills
              </Link>
              <Link
                href="/#testimonials"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Testimonials
              </Link>
              <Link
                href="/#contact"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className=" gap-2 mb-4">
              <div className="flex  gap-2  mb-3 text-gray-300   rounded-lg font-medium hover:cursor-pointer  transition duration-300">
                <MapPin className="w-5 h-5 cursor-pointer hover:text-blue-600 " />
                Lahore, Pakistan
              </div>
              <div className="flex  gap-2  mb-3 text-gray-300   rounded-lg font-medium hover:cursor-pointer  transition duration-300">
                <Phone className="w-5 h-5 cursor-pointer hover:text-blue-600 " />
                +92 300 0115907
              </div>
              <div className="flex   gap-2  mb-3 text-gray-300   rounded-lg font-medium hover:cursor-pointer  transition duration-300">
                <Mail className="w-5 h-5 cursor-pointer hover:text-blue-600 " />
                mr.junaidulhassan@gmail.com
              </div>
            </div>
            <Link
              href={"/#contact"}
              className="flex gap-2 justify-center text-center align-middle px-6 py-3  bg-gray-300 text-gray-500  rounded-lg font-medium hover:bg-gray-900 transition duration-300"
            >
              <Mail className="w-5 h-5 cursor-pointer hover:text-blue-600 " />
              <div className="mb-2">Lets Work Together</div>
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
