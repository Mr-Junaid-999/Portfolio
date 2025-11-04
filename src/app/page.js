"use client";
import { useState, useEffect } from "react";
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

export default function Home() {
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    const checkUserRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        if (data) {
          setUserRole(data.role);
        }
      }
    };
    checkUserRole();
  }, []);

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
