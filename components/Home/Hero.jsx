import { supabase } from "../../lib/supabase";
import Image from "next/image";
import Junaid from "../../public/JunaidHassan.jpg";
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
import HeroEditForm from "./HeroEditForm";

async function getHomeContent() {
  try {
    const { data, error } = await supabase
      .from("home_content")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching home content:", error);
      // Default content agar fetch na ho sake
      return {
        title: "Hi, I'm Junaid UL Hassan",
        subtitle: "Full Stack Developer & UI/UX Enthusiast",
        description:
          "I create beautiful, functional, and user-centered digital experiences. With 2-year experience in web development, I bring ideas to life through clean code and thoughtful design.",
        video_url: "",
        available: true,
      };
    }

    return data;
  } catch (error) {
    console.error("Error in getHomeContent:", error);
    return {
      title: "Hi, I'm Junaid UL Hassan",
      subtitle: "Full Stack Developer & UI/UX Enthusiast",
      description:
        "I create beautiful, functional, and user-centered digital experiences. With 2-year experience in web development, I bring ideas to life through clean code and thoughtful design.",
      video_url: "",
      available: true,
    };
  }
}

export default async function Hero({ userRole }) {
  const content = await getHomeContent();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-35 lg:pt-4 pb-5 lg:pb-0"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="text-green-500 rounded-sm w-3xs bg-green-200 flex">
          <div>
            <Dot className=" text-green-500" />
          </div>
          Available for freelance work
        </div>

        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            {content.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
            {content.subtitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            {content.description}
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

        {/* Admin edit functionality ke liye separate client component */}
        {userRole === "admin" && <HeroEditForm initialContent={content} />}
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center hidden md:hidden lg:block  ">
        <Image
          src={Junaid}
          alt="Image"
          className="h-[65vh] w-[28vw] rounded-2xl"
          priority
        />
      </div>
    </section>
  );
}
