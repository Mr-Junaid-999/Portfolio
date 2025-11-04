import emailjs from "@emailjs/browser";

const sendEmail = async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = {
    from_name: form.name.value,
    from_email: form.email.value,
    message: form.message.value,
  };

  try {
    // 1️⃣ Send message to Admin
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN,
      formData,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    // 2️⃣ Send Auto-Reply to User
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_USER,
      formData,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    alert("✅ Message sent successfully!");
  } catch (err) {
    console.error("❌ Error sending email:", err);
    alert("Error sending email. Please try again later.");
  }
};

export default sendEmail;
