import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import Hero from "../../components/Home/Hero";
import ServicesSection from "../../components/Services/ServicesSection";
import ProjectGrid from "../../components/Projects/ProjectGrid";
import AboutSection from "../../components/About/AboutSection";
import ExperienceTimeline from "../../components/Experience/ExperienceTimeline";
import ProcessSection from "../../components/Process/ProcessSection";
import ContactForm from "../../components/Contact/ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f5ef]">
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <ProjectGrid />
        <AboutSection />
        <ExperienceTimeline />
        <ProcessSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
