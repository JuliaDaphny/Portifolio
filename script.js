// ============================
// PORTFÓLIO - JÚLIA DAPHINY
// ============================


// Ano automático no console
const currentYear = new Date().getFullYear();

console.log(
    `Portfólio de Júlia Daphiny carregado com sucesso - ${currentYear}`
);


// ============================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ============================

const elements = document.querySelectorAll(
    ".skill-card, .project-card, .timeline-item, .info-card, .education-card, .leadership-grid article"
);


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.15
    }
);


elements.forEach((element) => {

    element.classList.add("fade-in");

    observer.observe(element);

});


// ============================
// LINKS DE NAVEGAÇÃO
// ============================

const navigationLinks = document.querySelectorAll(".nav a");


navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navigationLinks.forEach((item) => {

            item.classList.remove("active");

        });

        link.classList.add("active");

    });

} /* =========================
   ANIMAÇÕES
========================= */

.fade-in {
    opacity: 0;

    transform: translateY(25px);

    transition:
        opacity 0.7s ease,
        transform 0.7s ease;
}

.fade-in.visible {
    opacity: 1;

    transform: translateY(0);
}

.nav a.active {
    color: var(--primary-light);
} );
