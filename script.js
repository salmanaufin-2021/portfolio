// 1. TYPING EFFECT
const text = "SALMA NAUFIN AU";
let i = 0;
function type() {
    if (i < text.length) {
        document.getElementById('typed-name').textContent += text[i++];
        setTimeout(type, 110);
    }
}
type();

// 2. SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.card').forEach(c => observer.observe(c));

// Skill bars reveal
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.skill-fill').forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.skills').forEach(s => skillObserver.observe(s));

// 3. FLOATING PARTICLES
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    alpha: Math.random() * 0.6 + 0.2
}));

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 180, 252, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
}
drawParticles();

// 4. CURSOR GLOW
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
    }, 80);
});

// 5. SMOOTH PAGE TRANSITIONS
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http')) {
            e.preventDefault();
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position:fixed; top:0; left:0; width:100%; height:100%;
                background:#0f172a; z-index:9000;
                animation: fadeIn 0.4s ease forwards;
            `;
            const style = document.createElement('style');
            style.textContent = `@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }`;
            document.head.appendChild(style);
            document.body.appendChild(overlay);
            setTimeout(() => window.location.href = href, 400);
        }
    });
});

