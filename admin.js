// ========================================
// WebAlliance Admin Panel - JavaScript
// ========================================

// Get data from localStorage
function getPortfolioData() {
    const stored = localStorage.getItem('portfolioData');
    return stored ? JSON.parse(stored) : null;
}

// Save data to localStorage
function savePortfolioData(data) {
    localStorage.setItem('portfolioData', JSON.stringify(data));
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i><span>' + message + '</span>';
    document.body.appendChild(toast);
    
    setTimeout(function() { toast.classList.add('show'); }, 10);
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
}

// Login handling
function initLogin() {
    var loginForm = document.getElementById('loginForm');
    var loginScreen = document.getElementById('loginScreen');
    var adminPanel = document.getElementById('adminPanel');
    var loginError = document.getElementById('loginError');
    
    // Check if already logged in
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        loginScreen.style.display = 'none';
        adminPanel.style.display = 'flex';
        loadAllData();
        return;
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var password = document.getElementById('adminPassword').value;
            
            // Simple password check
            if (password === 'admin123') {
                sessionStorage.setItem('adminLoggedIn', 'true');
                loginScreen.style.display = 'none';
                adminPanel.style.display = 'flex';
                loadAllData();
                showToast('Bienvenue!', 'success');
            } else {
                loginError.textContent = 'Mot de passe incorrect';
            }
        });
    }
}

// Logout function
function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminPassword').value = '';
    document.getElementById('loginError').textContent = '';
}

// Navigation
function initNavigation() {
    var navItems = document.querySelectorAll('.nav-item[data-section]');
    var sections = document.querySelectorAll('.admin-section');
    
    navItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            var sectionId = this.dataset.section;
            
            navItems.forEach(function(nav) { nav.classList.remove('active'); });
            this.classList.add('active');
            
            sections.forEach(function(section) {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// Load all form data
function loadAllData() {
    var data = getPortfolioData();
    if (!data) return;
    
    // General form
    var generalForm = document.getElementById('generalForm');
    if (generalForm) {
        generalForm.logo.value = data.logo || '';
        generalForm.heroTitle.value = data.heroTitle || '';
        generalForm.heroSubtitle.value = data.heroSubtitle || '';
    }
    
    // About form
    var aboutForm = document.getElementById('aboutForm');
    if (aboutForm) {
        aboutForm.aboutTitle.value = data.aboutTitle || '';
        aboutForm.aboutText.value = data.aboutText || '';
        aboutForm.stat1Number.value = data.stat1Number || '';
        aboutForm.stat1Label.value = data.stat1Label || '';
        aboutForm.stat2Number.value = data.stat2Number || '';
        aboutForm.stat2Label.value = data.stat2Label || '';
        aboutForm.stat3Number.value = data.stat3Number || '';
        aboutForm.stat3Label.value = data.stat3Label || '';
    }
    
    // Contact form
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.contactEmail.value = data.contactEmail || '';
        contactForm.contactPhone.value = data.contactPhone || '';
        contactForm.contactAddress.value = data.contactAddress || '';
    }
    
    // Footer form
    var footerForm = document.getElementById('footerForm');
    if (footerForm) {
        footerForm.footerLogo.value = data.footerLogo || '';
        footerForm.footerText.value = data.footerText || '';
        footerForm.footerCopyright.value = data.footerCopyright || '';
    }
    
    // Render lists
    renderServicesList();
    renderProjectsList();
    renderSkillsList();
}

// Form submissions
function initForms() {
    // General form
    document.getElementById('generalForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(e.target);
        var data = getPortfolioData();
        
        data.logo = formData.get('logo');
        data.heroTitle = formData.get('heroTitle');
        data.heroSubtitle = formData.get('heroSubtitle');
        
        savePortfolioData(data);
        showToast('Parametres generaux sauvegardes!');
    });
    
    // About form
    document.getElementById('aboutForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(e.target);
        var data = getPortfolioData();
        
        data.aboutTitle = formData.get('aboutTitle');
        data.aboutText = formData.get('aboutText');
        data.stat1Number = formData.get('stat1Number');
        data.stat1Label = formData.get('stat1Label');
        data.stat2Number = formData.get('stat2Number');
        data.stat2Label = formData.get('stat2Label');
        data.stat3Number = formData.get('stat3Number');
        data.stat3Label = formData.get('stat3Label');
        
        savePortfolioData(data);
        showToast('Section a propos sauvegardee!');
    });
    
    // Contact form
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(e.target);
        var data = getPortfolioData();
        
        data.contactEmail = formData.get('contactEmail');
        data.contactPhone = formData.get('contactPhone');
        data.contactAddress = formData.get('contactAddress');
        
        savePortfolioData(data);
        showToast('Informations de contact sauvegardees!');
    });
    
    // Footer form
    document.getElementById('footerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(e.target);
        var data = getPortfolioData();
        
        data.footerLogo = formData.get('footerLogo');
        data.footerText = formData.get('footerText');
        data.footerCopyright = formData.get('footerCopyright');
        
        savePortfolioData(data);
        showToast('Footer sauvegarde!');
    });
}

// Render services list
function renderServicesList() {
    var data = getPortfolioData();
    var container = document.getElementById('servicesList');
    
    if (!container || !data.services) return;
    
    container.innerHTML = data.services.map(function(service, index) {
        return '<div class="item-card"><div class="item-info"><h3>' + service.title + '</h3><p>' + service.description.substring(0, 60) + '...</p></div><div class="item-actions"><button class="edit-btn" onclick="editService(' + index + ')"><i class="fas fa-edit"></i></button><button class="delete-btn" onclick="deleteService(' + index + ')"><i class="fas fa-trash"></i></button></div></div>';
    }).join('');
}

// Render projects list
function renderProjectsList() {
    var data = getPortfolioData();
    var container = document.getElementById('projectsList');
    
    if (!container || !data.projects) return;
    
    container.innerHTML = data.projects.map(function(project, index) {
        var tagsHtml = project.tags ? project.tags.map(function(tag) { return '<span class="item-tag">' + tag + '</span>'; }).join('') : '';
        return '<div class="item-card"><div class="item-info"><h3>' + project.title + '</h3><p>' + project.description.substring(0, 60) + '...</p><div class="item-tags">' + tagsHtml + '</div></div><div class="item-actions"><button class="edit-btn" onclick="editProject(' + index + ')"><i class="fas fa-edit"></i></button><button class="delete-btn" onclick="deleteProject(' + index + ')"><i class="fas fa-trash"></i></button></div></div>';
    }).join('');
}

// Render skills list
function renderSkillsList() {
    var data = getPortfolioData();
    var container = document.getElementById('skillsList');
    
    if (!container || !data.skills) return;
    
    container.innerHTML = data.skills.map(function(skill, index) {
        return '<div class="item-card"><div class="item-info"><h3><i class="fas ' + skill.icon + '"></i> ' + skill.name + '</h3></div><div class="item-actions"><button class="edit-btn" onclick="editSkill(' + index + ')"><i class="fas fa-edit"></i></button><button class="delete-btn" onclick="deleteSkill(' + index + ')"><i class="fas fa-trash"></i></button></div></div>';
    }).join('');
}

// Modal functions
var currentEditType = '';
var currentEditIndex = -1;

function openModal(title, fields, type, index) {
    index = index || -1;
    var modal = document.getElementById('itemModal');
    var modalTitle = document.getElementById('modalTitle');
    var modalFields = document.getElementById('modalFields');
    
    currentEditType = type;
    currentEditIndex = index;
    
    modalTitle.textContent = title;
    modalFields.innerHTML = fields;
    
    modal.classList.add('active');
    
    // If editing, populate fields
    if (index >= 0) {
        var data = getPortfolioData();
        var items = data[type];
        if (items && items[index]) {
            var item = items[index];
            Object.keys(item).forEach(function(key) {
                var input = modalFields.querySelector('[name="' + key + '"]');
                if (input) {
                    if (key === 'tags' && Array.isArray(item[key])) {
                        input.value = item[key].join(', ');
                    } else {
                        input.value = item[key];
                    }
                }
            });
        }
    }
}

function closeModal() {
    var modal = document.getElementById('itemModal');
    modal.classList.remove('active');
    currentEditType = '';
    currentEditIndex = -1;
}

// Service functions
function addService() {
    var fields = '<div class="form-group"><label>Icone (Font Awesome)</label><input type="text" name="icon" placeholder="fa-laptop-code" required></div><div class="form-group"><label>Titre</label><input type="text" name="title" placeholder="Developpement Web" required></div><div class="form-group"><label>Description</label><textarea name="description" rows="3" placeholder="Description du service..." required></textarea></div>';
    openModal('Ajouter un Service', fields, 'services');
}

function editService(index) {
    var fields = '<div class="form-group"><label>Icone (Font Awesome)</label><input type="text" name="icon" required></div><div class="form-group"><label>Titre</label><input type="text" name="title" required></div><div class="form-group"><label>Description</label><textarea name="description" rows="3" required></textarea></div>';
    openModal('Modifier le Service', fields, 'services', index);
}

function deleteService(index) {
    if (confirm('Voulez-vous vraiment supprimer ce service?')) {
        var data = getPortfolioData();
        data.services.splice(index, 1);
        savePortfolioData(data);
        renderServicesList();
        showToast('Service supprime!');
    }
}

// Project functions
function addProject() {
    var fields = '<div class="form-group"><label>Titre</label><input type="text" name="title" placeholder="Nom du projet" required></div><div class="form-group"><label>Description</label><textarea name="description" rows="3" placeholder="Description..." required></textarea></div><div class="form-group"><label>Icone</label><input type="text" name="image" placeholder="fa-shopping-bag" required></div><div class="form-group"><label>Tags (separes par virgule)</label><input type="text" name="tags" placeholder="React, Node.js"></div>';
    openModal('Ajouter un Projet', fields, 'projects');
}

function editProject(index) {
    var fields = '<div class="form-group"><label>Titre</label><input type="text" name="title" required></div><div class="form-group"><label>Description</label><textarea name="description" rows="3" required></textarea></div><div class="form-group"><label>Icone</label><input type="text" name="image" required></div><div class="form-group"><label>Tags (separes par virgule)</label><input type="text" name="tags"></div>';
    openModal('Modifier le Projet', fields, 'projects', index);
}

function deleteProject(index) {
    if (confirm('Voulez-vous vraiment supprimer ce projet?')) {
        var data = getPortfolioData();
        data.projects.splice(index, 1);
        savePortfolioData(data);
        renderProjectsList();
        showToast('Projet supprime!');
    }
}

// Skill functions
function addSkill() {
    var fields = '<div class="form-group"><label>Nom</label><input type="text" name="name" placeholder="JavaScript" required></div><div class="form-group"><label>Icone (Font Awesome)</label><input type="text" name="icon" placeholder="fa-js" required></div>';
    openModal('Ajouter une Competence', fields, 'skills');
}

function editSkill(index) {
    var fields = '<div class="form-group"><label>Nom</label><input type="text" name="name" required></div><div class="form-group"><label>Icone (Font Awesome)</label><input type="text" name="icon" required></div>';
    openModal('Modifier la Competence', fields, 'skills', index);
}

function deleteSkill(index) {
    if (confirm('Voulez-vous vraiment supprimer cette competence?')) {
        var data = getPortfolioData();
        data.skills.splice(index, 1);
        savePortfolioData(data);
        renderSkillsList();
        showToast('Competence supprimee!');
    }
}

// Modal form submission
function initModalForm() {
    document.getElementById('modalForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(e.target);
        var data = getPortfolioData();
        
        var item = {};
        formData.forEach(function(value, key) {
            if (key === 'tags') {
                item[key] = value.split(',').map(function(t) { return t.trim(); }).filter(function(t) { return t; });
            } else {
                item[key] = value;
            }
        });
        
        if (currentEditIndex >= 0) {
            data[currentEditType][currentEditIndex] = item;
            showToast('Element modifie!');
        } else {
            if (!data[currentEditType]) {
                data[currentEditType] = [];
            }
            item.id = Date.now();
            data[currentEditType].push(item);
            showToast('Element ajoute!');
        }
        
        savePortfolioData(data);
        closeModal();
        
        if (currentEditType === 'services') renderServicesList();
        else if (currentEditType === 'projects') renderProjectsList();
        else if (currentEditType === 'skills') renderSkillsList();
    });
}

// Initialize
function init() {
    initLogin();
    initNavigation();
    initForms();
    initModalForm();
    
    // Add button event listeners
    document.getElementById('addService').addEventListener('click', addService);
    document.getElementById('addProject').addEventListener('click', addProject);
    document.getElementById('addSkill').addEventListener('click', addSkill);
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);

