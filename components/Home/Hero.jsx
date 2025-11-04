// components/Home/Hero.jsx
import { useState, useEffect } from "react";
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
export default function Hero({ userRole }) {
  const [content, setContent] = useState({
    title: "Hi, I'm Junaid UL Hassan",
    subtitle: "Full Stack Developer & UI/UX Enthusiast",
    description:
      "I create beautiful, functional, and user-centered digital experiences. With 2-year experience in web development, I bring ideas to life through clean code and thoughtful design.",
    video_url: "",
    available: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("home_content")
        .select("*")
        .single();

      if (data) {
        setContent(data);
        setEditData(data);
      }
    };
    fetchContent();
  }, []);

  const handleSave = async () => {
    const { error } = await supabase.from("home_content").upsert(editData);

    if (!error) {
      setContent(editData);
      setIsEditing(false);
    }
  };

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
        {isEditing && userRole === "admin" ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="w-full text-4xl font-bold text-center bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              value={editData.subtitle}
              onChange={(e) =>
                setEditData({ ...editData, subtitle: e.target.value })
              }
              className="w-full text-xl text-gray-600 text-center bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              className="w-full text-lg text-gray-700 text-center bg-transparent border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
              rows="3"
            />
          </div>
        ) : (
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
        )}

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

        {userRole === "admin" && (
          <div className="mt-8">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                Edit Content
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditData(content);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center hidden lg:block">
        <Image
          src={Junaid}
          alt="Image"
          className="h-[65vh] w-[28vw] rounded-2xl"
        />
      </div>
    </section>
  );
}
