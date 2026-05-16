// Store projects globally for modal access
let allProjects = [
    {
        id: 1,
        title: "LUMINA HEALTH",
        client_name: "Lumina Wellness Group",
        challenge: "They needed a digital sanctuary that could handle high traffic while maintaining a premium, calming aesthetic.",
        solution: "We built an ethereal floating UI with Django and React, optimizing every interaction for conversion and user peace of mind.",
        results: "200% increase in bookings within the first month of launch.",
        image: "images/lumina_health_new.png"
    },
    {
        id: 2,
        title: "URBANBITE",
        client_name: "UrbanBite Delivery",
        challenge: "A crowded food delivery market required a standout visual identity and seamless mobile experience.",
        solution: "Implementation of glassmorphism and micro-animations to create a 'delicious' UI that keeps users engaged.",
        results: "Average session duration increased by 45%.",
        image: "images/urbanbite.png"
    },
    {
        id: 3,
        title: "APEX HUB",
        client_name: "Apex SaaS Solutions",
        challenge: "Converting technical complexity into a simple, high-converting landing page.",
        solution: "A focus on clean typography and structured data visualization built with Python and React.",
        results: "30% reduction in bounce rate on the pricing page.",
        image: "images/apex_hub_new.png"
    }
];

window.openCaseStudy = function (projectId) {
    const modal = document.getElementById('caseStudyModal');
    if (!modal) return;
    
    console.log("Opening Case Study for ID:", projectId);
    const project = allProjects.find(p => p.id === projectId);
    if (project) {
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalClient').textContent = project.client_name || 'Personal Project';
        document.getElementById('modalChallenge').textContent = project.challenge || 'Details coming soon...';
        document.getElementById('modalSolution').textContent = project.solution || 'Details coming soon...';
        document.getElementById('modalResults').textContent = project.results || 'Details coming soon...';

        // Use the image path directly (relative path works on Vercel)
        document.getElementById('modalImage').src = project.image || '';

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Case Study Modal Logic
    const modal = document.getElementById('caseStudyModal');
    const closeBtn = document.querySelector('.close-modal');

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Search Bar Functionality
    const siteSearch = document.getElementById('siteSearch');

    if (siteSearch) {
        siteSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && siteSearch.value) {
                const query = siteSearch.value.toLowerCase();
                alert('Searching for: ' + query);

                // Simple on-page search simulation:
                // Find visible text and scroll to the first match if found
                const sections = document.querySelectorAll('section, h1, h2, h3, p');
                let found = false;

                for (let section of sections) {
                    if (section.innerText.toLowerCase().includes(query)) {
                        section.scrollIntoView({ behavior: 'smooth' });
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    alert('No direct matches found on this page for "' + query + '".');
                }
            }
        });
    }

    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding tab pane
            const targetId = btn.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // Simple mobile menu toggle logic
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#030008';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            }
        });
    }

    // FAQ Accordion logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other faqs
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherBody = otherItem.querySelector('.faq-body');
                const otherIcon = otherItem.querySelector('.faq-icon');
                if (otherBody) otherBody.style.display = 'none';
                if (otherIcon) otherIcon.innerHTML = '&plus;';
            });

            // If it wasn't active initially, open it
            if (!isActive) {
                item.classList.add('active');
                const body = item.querySelector('.faq-body');
                const icon = item.querySelector('.faq-icon');
                if (body) body.style.display = 'block';
                // optional: add a small slide down animation via CSS later if desired, but display block works
                if (icon) icon.innerHTML = '&minus;';
            }
        });
    });

    // Contact Form Submission Logic (works without backend — sends email via mailto)
    const contactForm = document.querySelector('.contact-form-container form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Validate fields
            if (!name || !email) {
                alert('Please fill in your name and email.');
                return;
            }

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Try Web3Forms (free, no signup needed for basic usage)
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        access_key: 'YOUR_WEB3FORMS_KEY', // Replace with your Web3Forms access key
                        name: name,
                        email: email,
                        subject: subject || 'New Contact Form Submission',
                        message: message,
                        from_name: 'Nuvora Website',
                    })
                });

                const result = await response.json();

                if (result.success) {
                    showNotification('Thanks for your message! We will get back to you soon. 🎉', 'success');
                    contactForm.reset();
                } else {
                    // Fallback to mailto if Web3Forms fails
                    openMailto(name, email, subject, message);
                }
            } catch (error) {
                console.log('Web3Forms not configured, using mailto fallback');
                // Fallback: open email client
                openMailto(name, email, subject, message);
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Newsletter and Footer Form Submission Logic (works without backend)
    const subscribeForms = document.querySelectorAll('.newsletter-form, .footer-form');
    subscribeForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const submitBtn = form.querySelector('button[type="submit"]');

            if (emailInput && emailInput.value) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = '...';
                submitBtn.disabled = true;

                // Show success notification (no backend needed)
                setTimeout(() => {
                    showNotification('Thank you for subscribing with ' + emailInput.value + '! 🎉', 'success');
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 800);
            }
        });
    });

});

// Helper: Open mailto link as fallback
function openMailto(name, email, subject, message) {
    const mailtoLink = `mailto:moazamalighulammurtaza@gmail.com?subject=${encodeURIComponent(subject || 'Website Contact')}&body=${encodeURIComponent(
        'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message
    )}`;
    window.open(mailtoLink, '_blank');
    showNotification('Opening your email client to send the message...', 'info');
}

// Helper: Show a notification toast instead of alert()
function showNotification(message, type = 'info') {
    // Remove any existing notification
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 16px 24px;
        border-radius: 12px;
        color: white;
        font-family: 'Inter', sans-serif;
        font-size: 0.95rem;
        max-width: 400px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        backdrop-filter: blur(20px);
        animation: slideInRight 0.4s ease-out;
        cursor: pointer;
        background: ${type === 'success' 
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9))' 
            : type === 'error' 
            ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(185, 28, 28, 0.9))' 
            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(109, 40, 217, 0.9))'};
        border: 1px solid rgba(255,255,255,0.2);
    `;
    toast.textContent = message;
    toast.onclick = () => toast.remove();

    // Add animation keyframes if not already present
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOutRight 0.4s ease-in forwards';
            setTimeout(() => toast.remove(), 400);
        }
    }, 5000);
}
