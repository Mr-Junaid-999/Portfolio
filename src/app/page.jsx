"use server";
import { supabase } from "../../lib/supabase";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import Hero from "../../components/Home/Hero";
import AboutSection from "../../components/About/AboutSection";
import ExperienceTimeline from "../../components/Experience/ExperienceTimeline";
import ProjectGrid from "../../components/Projects/ProjectGrid";
import SkillsSection from "../../components/Skills/SkillsSection";
import TestimonialCarousel from "../../components/Testimonials/TestimonialCarousel";
import ContactForm from "../../components/Contact/ContactForm";

async function getUserRole() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("email", "mr.junaidulhassan@gmail.com")
      .single();

    if (error) {
      console.error("Error fetching user role:", error);
      return; // Default role on error
    }

    return data;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return; // Default role on error
  }
}

export default async function Home() {
  const userRole = await getUserRole();
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Hero userRole={userRole} />
        <AboutSection userRole={userRole} />
        <ExperienceTimeline userRole={userRole} />
        <ProjectGrid userRole={userRole} />
        <SkillsSection userRole={userRole} />
        <TestimonialCarousel userRole={userRole} />
        <ContactForm userRole={userRole} />
      </main>

      <Footer />
    </div>
  );
}
