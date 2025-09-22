// =============================
// Typed.js initialization
// =============================
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

// =============================
// Contact Form Handling
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      message: contactForm.message.value.trim(),
    };

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

  // =============================
  // About Page Visitor Popup
  // =============================
  const visitorModal = document.getElementById("visitorModal");
  const visitorForm = document.getElementById("visitorForm");
  const visitorStatus = document.getElementById("visitorStatus");

  if (visitorModal && visitorForm) {
    // Show popup when About section enters view
    const aboutSection = document.getElementById("About");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visitorModal.style.display = "flex"; // Show modal
          observer.disconnect(); // Only trigger once
        }
      });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);

    // Handle form submission
    visitorForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        name: visitorForm.visitorName.value.trim(),
        company: visitorForm.visitorCompany.value.trim(),
      };

      if (!formData.name || !formData.company) {
        visitorStatus.textContent = "❌ Please fill in all fields.";
        visitorStatus.style.color = "red";
        return;
      }

      visitorStatus.textContent = "⏳ Sending...";
      visitorStatus.style.color = "black";

      try {
        const res = await fetch("https://backend-w9js.onrender.com/about-visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.success) {
          visitorStatus.textContent = "✅ Thanks! Your info has been sent.";
          visitorStatus.style.color = "green";
          visitorForm.reset();
          setTimeout(() => visitorModal.style.display = "none", 1500);
        } else {
          throw new Error(data.error || "Failed to send visitor info");
        }
      } catch (err) {
        console.error("Error:", err);
        visitorStatus.textContent = "❌ Failed to send. Try again.";
        visitorStatus.style.color = "red";
      }
    });
  }
});
