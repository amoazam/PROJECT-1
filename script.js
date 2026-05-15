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

        let imageUrl = '';
        if (project.image) {
            if (project.image.startsWith('http') || project.image.startsWith('images/')) {
                imageUrl = project.image;
            } else {
                imageUrl = `http://127.0.0.1:8000${project.image}`;
            }
        }
        document.getElementById('modalImage').src = imageUrl;

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

    // Contact Form Submission Logic
    const contactForm = document.querySelector('.contact-form-container form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default submission if inline handler is missing

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('http://127.0.0.1:8000/api/contact/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Thanks for your message! We will get back to you soon.');
                    contactForm.reset();
                } else {
                    alert('Oops! Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while sending your message. Make sure the server is running.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Newsletter and Footer Form Submission Logic
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

                try {
                    const response = await fetch('http://127.0.0.1:8000/api/contact/newsletter/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: emailInput.value })
                    });

                    if (response.ok) {
                        alert('Thank you for subscribing with ' + emailInput.value + '!');
                        form.reset();
                    } else {
                        const errorData = await response.json();
                        if (errorData.email && errorData.email[0].includes('already exists')) {
                            alert('This email is already subscribed!');
                        } else {
                            alert('Oops! Something went wrong. Please try again.');
                        }
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Could not connect to the database. Make sure the server is running.');
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }
        });
    });

});
