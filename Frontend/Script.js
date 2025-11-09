// ===================================
// Configuration
// ===================================
// Define the API base URL once for easier maintenance
const API_BASE_URL = "https://portbackendsimple.netlify.app";


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
// DOM Content Loaded Handler
// =============================
document.addEventListener("DOMContentLoaded", () => {
    
    // =============================
    // Contact Form Handling
    // =============================
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {
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
                // Use the defined constant for the base URL
                const res = await fetch(`${API_BASE_URL}/contact`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                // Check for non-successful HTTP status codes (e.g., 400, 500)
                if (!res.ok) {
                    // Try to get JSON error data if available, otherwise use status text
                    const errorData = await res.json().catch(() => ({ error: res.statusText }));
                    throw new Error(errorData.error || `HTTP error! Status: ${res.status}`);
                }
                
                const data = await res.json();

                if (data.success) {
                    formStatus.textContent = "✅ Message sent successfully!";
                    formStatus.style.color = "green";
                    contactForm.reset();
                } else {
                    // This handles status 200 responses where the backend sets success: false
                    throw new Error(data.error || "Failed to send message");
                }
            } catch (error) {
                console.error("Error sending contact form:", error);
                // Display the specific error message if it's meaningful, otherwise use generic text
                formStatus.textContent = `❌ Failed to send. Error: ${error.message}`;
                formStatus.style.color = "red";
            }
        });
    }


    // =============================
    // About Page Visitor Popup
    // =============================
    const visitorModal = document.getElementById("visitorModal");
    const visitorForm = document.getElementById("visitorForm");
    const visitorStatus = document.getElementById("visitorStatus");
    const closeVisitorModal = document.getElementById("closeVisitorModal");

    let popupClosed = false; // Track if popup was closed

    if (visitorModal && visitorForm) {
        // Show popup when About section enters view
        const aboutSection = document.getElementById("About");

        if (aboutSection) {
             const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !popupClosed) {
                        visitorModal.style.display = "flex"; // Show modal
                        observer.disconnect(); // Only trigger once
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(aboutSection);
        }

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
                // Use the defined constant for the base URL
                const res = await fetch(`${API_BASE_URL}/about-visitor`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                
                // Check for non-successful HTTP status codes
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({ error: res.statusText }));
                    throw new Error(errorData.error || `HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();
                
                if (data.success) {
                    visitorStatus.textContent = "✅ Thanks! Your info has been sent.";
                    visitorStatus.style.color = "green";
                    visitorForm.reset();
                    // Auto-close modal after success message
                    setTimeout(() => visitorModal.style.display = "none", 1500);
                } else {
                    throw new Error(data.error || "Failed to send visitor info");
                }
            } catch (err) {
                console.error("Error sending visitor info:", err);
                visitorStatus.textContent = `❌ Failed to send. Error: ${err.message}`;
                visitorStatus.style.color = "red";
            }
        });

        // Close button handler
        if (closeVisitorModal) {
            closeVisitorModal.addEventListener("click", () => {
                visitorModal.style.display = "none";
                popupClosed = true; // Prevent reopening until page refresh
            });
        }
    }
});

