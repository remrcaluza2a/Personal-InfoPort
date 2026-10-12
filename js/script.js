const projects = [
    { 
        title: "Personal Portfolio", 
        description: "Professional portfolio website showcasing skills, projects, and contact information.", 
        tags: ["HTML", "CSS", "JavaScript"] 
    },
    { 
        title: "Calculator", 
        description: "Functional calculator with basic arithmetic operations and clean interface.", 
        tags: ["HTML", "JavaScript"] 
    },
    { 
        title: "Digital Clock", 
        description: "Real-time digital clock displaying current time and date.", 
        tags: ["HTML", "CSS", "JavaScript"] 
    },
    { 
        title: "Floppy Bird", 
        description: "Interactive browser game demonstrating JavaScript logic and event handling.", 
        tags: ["HTML", "JavaScript"] 
    }
];

function renderProjects() {
    const container = document.getElementById('projects-grid');
    projects.forEach(p => {
        const tags = p.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
        container.innerHTML += `
            <div class="project-card">
                <div class="project-content">
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                    <div>${tags}</div>
                </div>
            </div>
        `;
    });
}

async function loadGitHubRepos() {
    const username = 'remrcaluza2a';
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
        if (!res.ok) throw new Error();
        const repos = await res.json();
        const container = document.getElementById('github-repos');
        repos.forEach(r => {
            container.innerHTML += `
                <div class="repo-item">
                    <a href="${r.html_url}" target="_blank">📁 ${r.name}</a>
                    <p>${r.language || 'Repository'}</p>
                </div>
            `;
        });
    } catch {
        document.getElementById('github-repos').innerHTML = '<p style="text-align:center; color:var(--gray);">Unable to load repositories at this time.</p>';
    }
}

const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('form-status');

    if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields.';
        status.style.color = '#d32f2f';
        return;
    }
    if (!email.includes('@')) {
        status.textContent = 'Please enter a valid email address.';
        status.style.color = '#d32f2f';
        return;
    }
    status.textContent = 'Message sent successfully! Thank you.';
    status.style.color = '#2e7d32';
    form.reset();
    setTimeout(() => status.textContent = '', 5000);
});

window.addEventListener('scroll', () => {
    document.getElementById('back-top').style.display = window.scrollY > 400 ? 'block' : 'none';
});

document.getElementById('back-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

renderProjects();
loadGitHubRepos();
