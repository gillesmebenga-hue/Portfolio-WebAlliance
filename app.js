// ========================================
// WebAlliance Portfolio - JavaScript
// ========================================

const defaultData = {
    logo: "WebAlliance",
    heroTitle: "Transformez vos idées en réalité digitale",
    heroSubtitle: "Nous créons des solutions web innovantes pour propulser votre entreprise vers le succès.",
    aboutTitle: "WebAlliance",
    aboutText: "WebAlliance est une startup innovante spécialisée dans le développement web et les solutions digitales.",
    stat1Number: "5+",
    stat1Label: "Années d'expérience",
    stat2Number: "50+",
    stat2Label: "Projets réalisés",
    stat3Number: "30+",
    stat3Label: "Clients satisfaits",
    contactEmail: "contact@weballiance.com",
    contactPhone: "+33 1 23 45 67 89",
    contactAddress: "Paris, France",
    footerLogo: "WebAlliance",
    footerText: "Votre partenaire pour la transformation digitale.",
    footerCopyright: "WebAlliance",
    services: [
        { id: 1, icon: "fa-laptop-code", title: "Développement Web", description: "Création de sites web modernes et performants." },
        { id: 2, icon: "fa-mobile-alt", title: "Applications Mobiles", description: "Développement d'applications iOS et Android." },
        { id: 3, icon: "fa-shopping-cart", title: "E-Commerce", description: "Solutions de commerce en ligne complètes." },
        { id: 4, icon: "fa-bullhorn", title: "Marketing Digital", description: "Stratégies de marketing en ligne." },
        { id: 5, icon: "fa-server", title: "Hébergement & Cloud", description: "Solutions d'hébergement sécurisées." },
        { id: 6, icon: "fa-shield-alt", title: "Sécurité Web", description: "Protection contre les menaces cybernétiques." }
    ],
    projects: [
        { id: 1, title: "E-Commerce Mode", description: "Plateforme e-commerce complète pour une marque de vêtements.", tags: ["React", "Node.js"], image: "fa-shopping-bag" },
        { id: 2, title: "Application SaaS", description: "Solution SaaS de gestion d'entreprise.", tags: ["Vue.js", "Firebase"], image: "fa-chart-pie" },
        { id: 3, title: "Site Corporate", description: "Site web corporate moderne.", tags: ["WordPress", "PHP"], image: "fa-building" }
    ],
    skills: [
        { id: 1, name: "HTML5", icon: "fa-html5" },
        { id: 2, name: "CSS3", icon: "fa-css3-alt" },
        { id: 3, name: "JavaScript", icon: "fa-js" },
        { id: 4, name: "React", icon: "fa-react" },
        { id: 5, name: "Vue.js", icon: "fa-vuejs" },
        { id: 6, name: "Node.js", icon: "fa-node" },
        { id: 7, name: "PHP", icon: "fa-php" },
        { id: 8, name: "Python", icon: "fa-python" },
        { id: 9, name: "MySQL", icon: "fa-database" },
        { id: 10, name: "MongoDB", icon: "fa-leaf" },
        { id: 11, name: "Git", icon: "fa-git-alt" },
        { id: 12, name: "Docker", icon: "fa-docker" }
    ]
};

function getPortfolioData() {
    const stored = localStorage.getItem('portfolioData');
    if (stored) {
        return JSON.parse(stored);
    }
    localStorage.setItem('portfolioData', JSON.stringify(defaultData));
    return defaultData;
}

function savePortfolioData(data) {
    localStorage.setItem('portfolioData', JSON.stringify(data));
}

function updateTextContent(data) {
    const logoElements = document.querySelectorAll('.logo');
    logoElements.forEach(el => {
        const img = el.querySelector('img');
        if (!img) el.textContent = data.logo;
    });
    
    const heroTitle = document.querySelector('[data-field="heroTitle"]');
    if (heroTitle) heroTitle.textContent = data.heroTitle;
    
    const heroSubtitle = document.querySelector('[data-field="heroSubtitle"]');
    if (heroSubtitle) heroSubtitle.textContent = data.heroSubtitle;
    
    const aboutTitle = document.querySelector('[data-field="aboutTitle"]');
    if (aboutTitle) aboutTitle.textContent = data.aboutTitle;
    
    const aboutText = document.querySelector('[data-field="aboutText"]');
    if (aboutText) aboutText.innerHTML = `<p>${data.aboutText}</p>`;
    
    const fields = ['stat1Number', 'stat1Label', 'stat2Number', 'stat2Label', 'stat3Number', 'stat3Label'];
    fields.forEach(field => {
        const el = document.querySelector(`[data-field="${field}"]`);
        if (el) {
            if (field.includes('Number')) el.textContent = data[field];
            else el.textContent = data[field];
        }
    });
    
    const footerLogo = document.querySelector('[data-field="footerLogo"]');
    if (footerLogo) footerLogo.textContent = data.footerLogo;
    
    const footerText = document.querySelector('[data-field="footerText"]');
    if (footerText) footerText.textContent = data.footerText;
    
    const footerCopyright = document.querySelector('[data-field="footerCopyright"]');
    if (footerCopyright) footerCopyright.textContent = data.footerCopyright;
    
    const contactInfo = document.querySelector('[data-field="contactInfo"]');
    if (contactInfo) {
        contactInfo.innerHTML = `
            <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>${data.contactEmail}</span>
            </div>
            <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span>${data.contactPhone}</span>
            </div>
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${data.contactAddress}</span>
            </div>
        `;
    }
}

function renderServices(services) {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    
    grid.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
}

function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    grid.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <i class="fas ${project.image}"></i>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function renderSkills(skills) {
    const container = document.getElementById('skillsContainer');
    if (!container) return;
    
    container.innerHTML = skills.map(skill => `
        <div class="skill-tag">
            <i class="fas ${skill.icon}"></i>
            <span>${skill.name}</span>
        </div>
    `).join('');
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.7rem 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    });
}

function trackVisit() {
    const analytics = JSON.parse(localStorage.getItem('siteAnalytics') || '{"visits":[],"totalVisitors":0}');
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisitDate');
    
    if (lastVisit !== today) {
        analytics.totalVisitors = (analytics.totalVisitors || 0) + 1;
        localStorage.setItem('lastVisitDate', today);
    }
    
    analytics.visits = analytics.visits || [];
    analytics.visits.push({
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        referrer: document.referrer || 'Direct'
    });
    
    // Keep only last 100 visits
    if (analytics.visits.length > 100) {
        analytics.visits = analytics.visits.slice(-100);
    }
    
    localStorage.setItem('siteAnalytics', JSON.stringify(analytics));
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            date: new Date().toISOString()
        };
        
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push(data);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        alert('Message envoyé avec succès! Nous vous répondrons bientôt.');
        form.reset();
    });
}

function initPortfolio() {
    const data = getPortfolioData();
    
    updateTextContent(data);
    renderServices(data.services);
    renderProjects(data.projects);
    renderSkills(data.skills);
    
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
    initContactForm();
    trackVisit();
}

document.addEventListener('DOMContentLoaded', initPortfolio);

