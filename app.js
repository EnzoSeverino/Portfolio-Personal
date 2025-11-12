// ===================================================
// FUNCIONALIDAD: Copiar email al portapapeles
// ===================================================
const linkEmail = document.getElementById('copiar-email');

if (linkEmail) {
    const emailOriginal = linkEmail.textContent;

    linkEmail.addEventListener('click', function(event) {
        event.preventDefault();

        navigator.clipboard.writeText(emailOriginal).then(() => {
            linkEmail.textContent = '¡Copiado!';
            linkEmail.classList.add('copiado');

            setTimeout(() => {
                linkEmail.textContent = emailOriginal;
                linkEmail.classList.remove('copiado');
            }, 2000);

        }).catch(err => {
            console.error('Error al intentar copiar el email: ', err);
            // Fallback para navegadores que no soportan clipboard API
            alert('Email: ' + emailOriginal);
        });
    });
}

// ===================================================
// FUNCIONALIDAD: Envío del formulario de contacto con Formspree
// ===================================================
const formulario = document.querySelector('.formulario-contacto');

if (formulario) {
    formulario.addEventListener('submit', function(event) {
        const boton = formulario.querySelector('button[type="submit"]');
        const textoOriginal = boton.textContent;
        
        // Mostrar estado de envío
        boton.textContent = 'Enviando...';
        boton.disabled = true;
        
        // Formspree se encarga del envío, pero agregamos feedback visual
        // El formulario se enviará normalmente con el action de Formspree
        setTimeout(() => {
            boton.textContent = '✓ ¡Enviado!';
            boton.style.backgroundColor = '#10b981';
        }, 500);
    });
}

// ===================================================
// FUNCIONALIDAD EXTRA: Animación suave al hacer scroll
// ===================================================
// Ya está implementado en CSS con scroll-behavior: smooth
// pero agregamos un efecto visual adicional

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar las secciones para animarlas al entrar en viewport
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// ===================================================
// FUNCIONALIDAD EXTRA: Resaltar link activo en navegación
// ===================================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.backgroundColor = '';
        link.style.color = '';
        
        if (link.getAttribute('href') === `#${current}`) {
            link.style.backgroundColor = 'var(--color-acento)';
            link.style.color = 'var(--color-negro)';
        }
    });
});