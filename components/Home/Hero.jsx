import HeroImage from "./Image";
import { Dot } from "lucide-react";
import {
  Linkedin,
  Github,
  Facebook,
  Instagram,
  Calendar,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default async function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col-reverse md:flex-row  lg:flex-row items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-35 lg:pt-8 pb-5 lg:pb-0"
    >
      <div className="max-w-full md:max-w-[60%] lg:max-w-4xl mx-auto px-4 text-center ">
        <div className="text-green-500 rounded-sm w-3xs bg-green-200 flex mt-10 md:mt-0 lg:mt-0 ">
          <div>
            <Dot className=" text-green-500" />
          </div>
          Available for freelance work
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Hi, I'm Junaid UL Hassan
          </h1>
          <h2 className="text-xl md:text-xl lg:text-2xl text-gray-600 mb-6">
            Full-Stack Developer (Next.js / React)
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Full-Stack Developer (Next.js / React) with 2 years of experience in
            Next.js, React, and Supabase. Strong foundation in C++ and
            Object-Oriented Programming, which helps me write efficient,
            scalable backend logic.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="flex align-middle justify-center gap-2  bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
            <MapPin className="w-5 h-5 text-white" />
            <span>Lahore, Pakistan</span>
          </div>
          <div className="flex align-middle justify-center gap-2 border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:cursor-pointer  transition duration-300">
            <Calendar className="w-5 h-5 cursor-pointer hover:text-blue-600 " />
            Available Now
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={"/#projects"}
            className="text-gray-700 hover:text-indigo-600 transition duration-300 font-medium"
          >
            View Projects
          </Link>
          <Link
            href={"/#contact"}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition duration-300"
          >
            Lets Work Together
          </Link>
        </div>

        <div className="flex  gap-4 pt-8 justify-center items-center text-gray-600">
          <span className="font-medium">Follow me:</span>
          <Link href={"https://www.linkedin.com/in/junaid-hassan-58b272321/"}>
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

      <HeroImage />
    </section>
  );
}
