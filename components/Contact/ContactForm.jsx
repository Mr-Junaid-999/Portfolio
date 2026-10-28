"use client";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Linkedin, Github, Mail, Phone, MapPin } from "lucide-react";
const initialForm = {
  name: "",
  email: "",
  service: "",
  phone: "",
  company: "",
  budget: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const submittingRef = useRef(false);

  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("service");
    const serviceNames = {
      "nextjs-react": "Next.js / React Development",
      wordpress: "WordPress Development",
      funnels: "AI Funnels / GoHighLevel",
      seo: "On-Page SEO",
      shopify: "Shopify Store Development",
      "meta-ads": "Meta Ads & Paid Social",
    };
    if (selected && serviceNames[selected]) {
      setFormData((current) => ({ ...current, service: serviceNames[selected] }));
    }
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const requiredValues = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      service: formData.service.trim(),
      message: formData.message.trim(),
    };

    if (!requiredValues.name || !requiredValues.email || !requiredValues.service || !requiredValues.message) {
      setStatus({ type: "error", message: "Please complete all required fields." });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(requiredValues.email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const adminTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN;
    const userTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_USER;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !adminTemplateId || !publicKey) {
      setStatus({ type: "error", message: "Email service is not configured yet. Please try again later." });
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    setStatus({ type: "", message: "" });

    const templateParams = {
      from_name: requiredValues.name,
      from_email: requiredValues.email,
      message: requiredValues.message,
      requested_service: requiredValues.service,
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      budget: formData.budget.trim(),
      project_message: requiredValues.message,
      to_name: requiredValues.name,
      to_email: requiredValues.email,
      reply_to: requiredValues.email,
      name: requiredValues.name,
      email: requiredValues.email,
      service: requiredValues.service,
      subject: `New inquiry: ${requiredValues.service}`,
    };

    try {
      await emailjs.send(serviceId, adminTemplateId, templateParams, { publicKey });

      let confirmationWarning = false;
      if (userTemplateId) {
        try {
          await emailjs.send(serviceId, userTemplateId, templateParams, { publicKey });
        } catch {
          confirmationWarning = true;
        }
      }

      setFormData(initialForm);
      setStatus({
        type: "success",
        message: confirmationWarning
          ? "Your inquiry was sent successfully. The automatic confirmation email was unavailable, but I will still receive your message."
          : "Your inquiry was sent successfully. I will get back to you soon.",
      });
    } catch (error) {
      const statusCode = error?.status || error?.statusCode;
      const message = statusCode === 412
        ? "Email delivery is temporarily blocked by the provider. Please try again later or contact me directly by email."
        : "Your inquiry could not be sent. Please try again.";
      setStatus({ type: "error", message });
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#f7f5ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#252923] mb-4">Get In Touch</h2>
        <p className="text-xl text-[#60665d] text-center mb-12 max-w-2xl mx-auto">
          Have a project in mind? Let&apos;s discuss how we can work together to bring your ideas to life.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-[#252923] mb-6">Let&apos;s Connect</h3>
            <p className="text-[#60665d] mb-8">
              I&apos;m always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, I&apos;ll get back to you as soon as possible!
            </p>
            <div className="space-y-4">
              <div className="flex items-center mb-2 gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-[#d9e4d9] rounded-lg flex items-center justify-center text-[#173f35]"><Mail className="w-6 h-6" /></div>
                <div><p className="font-semibold text-[#252923]">Email</p><p className="text-[#60665d]">mr.junaidulhassan@gmail.com</p></div>
              </div>
              <div className="flex items-center mb-2 gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600"><Phone className="w-6 h-6" /></div>
                <div><p className="font-semibold text-[#252923]">Phone</p><p className="text-[#60665d]">+92 300 0115907</p></div>
              </div>
              <div className="flex items-center mb-2 gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-[#d9e4d9] rounded-lg flex items-center justify-center text-[#173f35]"><MapPin className="w-6 h-6" /></div>
                <div><p className="font-semibold text-[#252923]">Location</p><p className="text-[#60665d]">Lahore, Pakistan</p></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-md shadow-sm p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {status.message && (
                <div className={status.type === "success" ? "bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg" : "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"} role="alert">
                  {status.message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Full Name" name="name" value={formData.name} onChange={updateField} placeholder="Enter your full name" required />
                <Field label="Email Address" name="email" type="email" value={formData.email} onChange={updateField} placeholder="Enter your email address" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-[#454b42] mb-2">Requested Service *</label>
                  <select id="service" name="service" value={formData.service} onChange={updateField} required className="w-full px-4 py-3 border border-[#c9cbbf] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c58b55]">
                    <option value="">Select a service</option>
                    <option value="Next.js / React Development">Next.js / React Development</option>
                    <option value="WordPress Development">WordPress Development</option>
                    <option value="AI Funnels / GoHighLevel">AI Funnels / GoHighLevel</option>
                    <option value="On-Page SEO">On-Page SEO</option>
                    <option value="Shopify Store Development">Shopify Store Development</option>
                    <option value="Meta Ads & Paid Social">Meta Ads &amp; Paid Social</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <Field label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={updateField} placeholder="Enter your phone number" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Company" name="company" value={formData.company} onChange={updateField} placeholder="Enter company name" />
                <Field label="Budget" name="budget" value={formData.budget} onChange={updateField} placeholder="Expected budget" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#454b42] mb-2">Project Message *</label>
                <textarea id="message" name="message" rows="6" value={formData.message} onChange={updateField} className="w-full px-4 py-3 border border-[#c9cbbf] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c58b55] resize-vertical" placeholder="Tell me about your project or inquiry..." required />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#173f35] to-[#102e27] text-white py-4 px-6 rounded-lg font-semibold hover:from-[#102e27] hover:to-[#173f35] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
                {loading ? "Sending Inquiry..." : "Send Inquiry"}
              </button>
              <p className="text-center text-gray-500 text-sm">I typically respond within 24 hours</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", value, onChange, placeholder, required = false }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-[#454b42] mb-2">{label}{required ? " *" : ""}</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} required={required} className="w-full px-4 py-3 border border-[#c9cbbf] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c58b55]" placeholder={placeholder} />
    </div>
  );
}
