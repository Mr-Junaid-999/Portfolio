import React from "react";

export default async function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className=" mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            About Me
          </h2>
          <p className="text-lg md:text-xl lg:text-xl text-gray-600 max-w-6xl mx-auto   text-center">
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
            <br />
            <strong>Key Achievement:</strong>
          </p>
          <ul className="text-lg md:text-xl lg:text-xl  list-disc list-inside mt-2 text-left max-w-6xl mx-auto text-gray-600">
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
          <p className="text-lg md:text-xl lg:text-xl text-gray-600 max-w-6xl mx-auto text-start pt-5">
            <strong>Technical Skills:</strong> Next.js, React, Node.js,
            TypeScript (learning), Supabase, PostgreSQL, MongoDB , WordPress,
            Tailwind CSS, Git, Server Actions, REST APIs
          </p>
        </div>
      </div>
    </section>
  );
}
