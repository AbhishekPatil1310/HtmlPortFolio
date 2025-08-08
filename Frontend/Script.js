// Typed.js initialization for the text animation
var typed = new Typed('#element', {
    strings: ['MERN Stack Developer', 'React enthusiastic', 'Web Developer'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    backDelay: 2000,
    smartBackspace: true,
    showCursor: true,
    cursorChar: '|',
});
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      message: contactForm.message.value.trim(),
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      formStatus.textContent = "❌ Please fill in all fields.";
      formStatus.style.color = "red";
      return;
    }

    formStatus.textContent = "⏳ Sending...";
    formStatus.style.color = "black";

    try {
      const res = await fetch("https://backend-w9js.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        formStatus.textContent = "✅ Message sent successfully!";
        formStatus.style.color = "green";
        contactForm.reset();
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      formStatus.textContent = "❌ Failed to send. Please try again.";
      formStatus.style.color = "red";
    }
  });
});

