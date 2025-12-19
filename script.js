// Team Members Data
const teamMembers = [
    {
        id: 1,
        name: "Mohak Gupta",
        role: "Full-Stack Developer",
        photo: "mohak.jpeg",
        skills: ["React", "Node.js", "MongoDB", "TypeScript", "AWS"],
        linkedin: "https://www.linkedin.com/in/mohak-gupta-23336832b/"
    },
    {
        id: 2,
        name: "Anshul Kumar",
        role: "UI/UX Designer",
        photo: "anshul.jpeg",
        skills: ["Figma", "Sketch", "Adobe XD", "UI Design", "Prototyping"],
        linkedin: "https://www.linkedin.com/in/anshul-kumar-871854395?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
        id: 3,
        name: "Anurag Kumar",
        role: "Backend Developer",
        photo: "anurag.jpeg",
        skills: ["Python", "Django", "PostgreSQL", "Docker", "REST APIs"],
        linkedin: "https://www.linkedin.com/in/anurag-kumar-b9b963383/"
    },
    {
        id: 4,
        name: "Saket Kumar",
        role: "Mobile Developer",
        photo: "saket.jpeg",
        skills: ["Flutter", "React Native", "iOS", "Android", "Firebase"],
        linkedin: "https://linkedin.com/in/saket-kumar-71b542371"
        
    },
    {
        id: 5,
        name: "Keshav Kumar Agrawal",
        role: "Machine Learning Engineer",
        photo: "keshav.jpg",
        skills: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP"],
        linkedin: "https://www.linkedin.com/in/keshav-agrawal-39a39431a/"
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.getElementById('themeToggle');
const scrollToTopBtn = document.getElementById('scrollToTop');
const contactForm = document.getElementById('contactForm');
const teamMembersContainer = document.getElementById('teamMembers');

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Theme Toggle
function setTheme(isDark) {
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Initialize theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme(true);
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'dark';
    setTheme(isDark);
});

// Scroll to Top
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Render Team Members
function renderTeamMembers() {
    if (!teamMembersContainer) return;
    
    const membersHTML = teamMembers.map(member => `
        <div class="member-card fade-in" tabindex="0" style="animation-delay: ${member.id * 0.1}s">
            <div class="member-image">
                <img src="${member.photo}" alt="${member.name}">
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="member-role">${member.role}</p>
                <div class="skills">
                    ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <a href="${member.linkedin}" class="linkedin-link" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-linkedin"></i> Connect on LinkedIn
                </a>
            </div>
        </div>
    `).join('');
    
    teamMembersContainer.innerHTML = membersHTML;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTeamMembers();
    
    // Add animation to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Show 'Coming Soon' modal for links that don't have a real target
    const modal = document.getElementById('comingSoonModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalSub = modal.querySelector('.modal-subtopic');
    const modalAction = modal.querySelector('.modal-action');
    const modalClose = modal.querySelector('.modal-close');

    function openModal(title, subtopic) {
        modalTitle.textContent = title;
        modalSub.textContent = subtopic;
        modal.querySelector('.modal-text').textContent = 'Coming Soon';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modalClose.focus();
    }

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalAction.addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
    });

    document.querySelectorAll('.project-links a').forEach(link => {
        const href = link.getAttribute('href') || '';
        const isPlaceholder = href === '#' || href.trim() === '' || href.includes('example.com') || href.includes('VIDEO_ID');

        if (isPlaceholder) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // find the project title from nearest .project
                const project = link.closest('.project');
                const title = project ? (project.querySelector('h3') ? project.querySelector('h3').textContent.trim() : 'Project') : 'Project';
                // derive subtopic from class or text
                let sub = 'Link';
                if (link.classList.contains('video-link')) sub = 'Video';
                else if (link.classList.contains('web-link')) sub = 'Webpage';
                else if (link.classList.contains('github-link')) sub = 'GitHub';
                else sub = link.textContent.trim();

                openModal(title, sub);
            });
            // Make it clear visually
            link.setAttribute('aria-disabled', 'true');
            link.style.opacity = '0.85';
            link.style.cursor = 'pointer';
        }
    });
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});
