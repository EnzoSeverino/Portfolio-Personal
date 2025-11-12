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
// FUNCIONALIDAD: Envío del formulario de contacto
// ===================================================
const formulario = document.querySelector('.formulario-contacto');

if (formulario) {
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validación básica
        if (!nombre || !email || !mensaje) {
            alert('Por favor completa todos los campos');
            return;
        }

        // Crear el enlace mailto con los datos del formulario
        const subject = encodeURIComponent(`Contacto de ${nombre}`);
        const body = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`);
        const mailtoLink = `mailto:severinoenzo0@gmail.com?subject=${subject}&body=${body}`;
        
        // Abrir cliente de correo
        window.location.href = mailtoLink;
        
        // Mostrar confirmación visual
        const boton = formulario.querySelector('button[type="submit"]');
        const textoOriginal = boton.textContent;
        const colorOriginal = boton.style.backgroundColor;
        
        boton.textContent = '✓ ¡Mensaje enviado!';
        boton.style.backgroundColor = '#10b981'; // Verde
        boton.disabled = true;
        
        // Resetear después de 3 segundos
        setTimeout(() => {
            boton.textContent = textoOriginal;
            boton.style.backgroundColor = colorOriginal;
            boton.disabled = false;
            formulario.reset();
        }, 3000);
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