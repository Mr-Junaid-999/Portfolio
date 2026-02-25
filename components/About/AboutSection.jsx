import { supabase } from "../../lib/supabase";
import AboutEditForm from "./AboutEditForm";

async function getAboutContent() {
  try {
    const { data, error } = await supabase
      .from("about_content")
      .select("*")
      .single();

    if (error) {
      // Insert default content if not exists
      return await insertDefaultContent();
    }

    if (data) {
      return data;
    } else {
      // Insert default content if not exists
      return await insertDefaultContent();
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    // Return default content on error
    return {
      bio: "I'm a passionate full-stack developer with expertise in modern web technologies...",
      education: [],
      skills_overview: "",
    };
  }
}

async function insertDefaultContent() {
  try {
    const defaultContent = {
      bio: "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable, and user-friendly applications.",
      education: [],
      skills_overview: "",
    };

    const { data, error } = await supabase
      .from("about_content")
      .insert(defaultContent)
      .select()
      .single();

    if (!error && data) {
      return data;
    }
    return defaultContent;
  } catch (error) {
    console.error("Error inserting default content:", error);
    return {
      bio: "I'm a passionate full-stack developer with expertise in modern web technologies...",
      education: [],
      skills_overview: "",
    };
  }
}

export default async function AboutSection({ userRole }) {
  const content = await getAboutContent();
  console.log("userRole in AboutSection:", userRole);

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className=" mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            About Me
          </h2>
          <p className="text-lg md:text-xl lg:text-xl text-gray-600 max-w-3xl mx-auto   text-center">
            <strong>Full-Stack Developer (Next.js / React / Node.js)</strong>{" "}
            with a strong foundation in backend logic and system design. My
            journey began with C++, where I developed multiple desktop
            applications including School Management, Cafe Management, and Car
            Rental systems. This early exposure to OOP concepts and complex
            algorithms shaped my approach to writing clean, efficient, and
            scalable code. <br />
            In my current role as a <strong>Junior React Developer</strong>, I
            work on both WordPress and Next.js projects. I develop custom
            WordPress themes, while simultaneously building modern web
            applications with Next.js 16 (App Router) and Supabase. <br />
            <strong>Key Achievement:</strong>
          </p>
          <ul className="list-disc list-inside mt-2 text-left max-w-2xl mx-auto text-center">
            <li>
              Built a production-ready e-commerce platform from scratch using
              Next.js 16, Supabase, and Server Actions.
            </li>
            <li>
              Implemented complex business logic including multi-step order
              processing, stock validation, and role-based authentication
              (admin/customer).
            </li>
            <li>
              Integrated Supabase for authentication, real-time database, and
              file storage.
            </li>
            <li>
              Developed custom admin dashboard with protected routes and
              role-based access control.
            </li>
            <li>
              Created RESTful API routes for file uploads and media management.
            </li>
          </ul>
          <p className="text-lg md:text-xl lg:text-xl text-gray-600 max-w-3xl mx-auto text-start pt-5">
            <strong>Technical Skills:</strong> Next.js, React, Node.js,
            TypeScript (learning), Supabase, PostgreSQL, MongoDB , WordPress,
            Tailwind CSS, Git, Server Actions, REST APIs
          </p>
        </div>

        {/* Admin Controls */}
        {userRole === "admin" && <AboutEditForm initialContent={content} />}
      </div>
    </section>
  );
}
