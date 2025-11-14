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
            alert('Email: ' + emailOriginal);
        });
    });
}

// ==============================================================
// FUNCIONALIDAD: Envío del formulario de contacto con Formspree
// ==============================================================
const formulario = document.querySelector('.formulario-contacto');

if (formulario) {
    formulario.addEventListener('submit', function(event) {
        const boton = formulario.querySelector('button[type="submit"]');
        const textoOriginal = boton.textContent;
        
        // Mostrar estado de envío
        boton.textContent = 'Enviando...';
        boton.disabled = true;
        
        setTimeout(() => {
            boton.textContent = '✓ ¡Enviado!';
            boton.style.backgroundColor = '#10b981';
        }, 500);
    });
}

// =====================================================
// FUNCIONALIDAD EXTRA: Animación suave al hacer scroll
// =====================================================
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

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
