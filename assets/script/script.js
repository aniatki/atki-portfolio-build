const projects = [
    {
        id: 1,
        title: "Dorset Bank App",
        description: "A local tracking system for internal staff and its accounts at Dorset College.",
        technologies: ["Django", "PostgreSQL", "Bulma CSS"],
        githubUrl: "https://github.com/aniatki/dorset-bank-app",
        imageUrl: "/assets/media/images/dorset_2.png"
    },
    {
        id: 2,
        title: "Di Lucia's Takeaway",
        description: "Di Lucia's Clonshaugh is a site designed for the people of Clonshaugh to order food from their local chip shop. The site's easy to use interface will assure for a joyful experience of getting a hearty meal.",
        technologies: ["JavaScript", "CSS", "HTML"],
        githubUrl: "https://github.com/aniatki/di-lucias-redesign",
        imageUrl: "/assets/media/images/dil_1.png"
    },
    {
        id: 3,
        title: "Lash by Belle",
        description: "A web-app used by a beauty salon to organize bookings and advertise their products.",
        technologies: ["Django", "Python", "JavaScript", "PostgreSQL", "CSS"],
        githubUrl: "https://github.com/aniatki/pro-dad",
        imageUrl: "/assets/media/images/lash_1.png"
    }
];

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const submitBtn = document.getElementById('submit-btn');

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname == "/") {
        loadProjects();
    }
    setupNavigation();
    setupScrollAnimations();
    setupIntersectionObserver();
});

function setupNavigation() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.imageUrl}" alt="${project.title}" />
                <div class="project-overlay">
                    <span style="color: var(--accent-color); font-size: 2rem;">🔗</span>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
                    🐙 View on GitHub
                </a>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

function validateForm(data) {
    let isValid = true;
    
    if (!data.name || data.name.trim().length < 2) {
        showError('name-error', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!data.message || data.message.trim().length < 10) {
        showError('message-error', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function showLoading() {
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    submitBtn.disabled = true;
}

function hideLoading() {
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');
    
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
}

function showSuccess() {
    contactForm.style.display = 'none';
    successMessage.style.display = 'block';
    successMessage.style.animation = 'fadeIn 0.6s ease-out forwards';
}

function resetForm() {
    contactForm.style.display = 'block';
    successMessage.style.display = 'none';
    contactForm.reset();
}

function setupScrollAnimations() {
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    });
}

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const elementsToObserve = [
        ...document.querySelectorAll('.section-header'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.tech-category'),
        ...document.querySelectorAll('.contact-form-container'),
        ...document.querySelectorAll('.contact-links'),
        ...document.querySelectorAll('.footer')
    ];
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            scrollToSection(target.id);
        }
    });
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 1s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);