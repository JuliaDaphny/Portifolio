document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("main section[id]");
  const animatedElements = document.querySelectorAll(
    ".hero-panel, .value-card, .skill-card, .timeline-item, .project-card, .leadership-grid article, .education-card, .contact-card"
  );
  const year = document.querySelector("#current-year");

  // Atualiza automaticamente o ano no rodapé
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Menu para celular
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.classList.remove(
          "menu-open"
        );
      });
    });
  }

  // Animação dos elementos
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          currentObserver.unobserve(
            entry.target
          );
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  animatedElements.forEach((element) => {
    element.classList.add("fade-in");

    observer.observe(element);
  });

  // Identifica a seção atual no menu
  const updateActiveLink = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const top = section.offsetTop - 140;

      if (window.scrollY >= top) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") ===
          `#${currentSection}`
      );
    });
  };

  updateActiveLink();

  window.addEventListener(
    "scroll",
    updateActiveLink,
    {
      passive: true
    }
  );
});
