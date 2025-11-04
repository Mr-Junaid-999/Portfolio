import { supabase } from "../../lib/supabase";
import AboutEditForm from "./AboutEditForm";

async function getAboutContent() {
  try {
    const { data, error } = await supabase
      .from("about_content")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching about content:", error);
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

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content.bio}
          </p>
        </div>

        {/* Admin Controls */}
        {userRole === "admin" && <AboutEditForm initialContent={content} />}
      </div>
    </section>
  );
}
