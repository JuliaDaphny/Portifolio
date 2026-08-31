document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("main section[id]");

  const animatedElements = document.querySelectorAll(
    ".hero-panel, " +
    ".value-card, " +
    ".skill-card, " +
    ".timeline-item, " +
    ".project-card, " +
    ".leadership-grid article, " +
    ".education-card, " +
    ".social-item"
  );

  const year = document.querySelector("#current-year");


  /* =========================
     ANO AUTOMÁTICO
  ========================= */

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================
     MENU MOBILE
  ========================= */

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


  /* =========================
     ANIMAÇÕES AO ROLAR
  ========================= */

  if ("IntersectionObserver" in window) {
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
  } else {
    animatedElements.forEach((element) => {
      element.classList.add("visible");
    });
  }


  /* =========================
     SEÇÃO ATIVA NO MENU
  ========================= */

  const updateActiveLink = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop =
        section.offsetTop - 150;

      if (
        window.scrollY >=
        sectionTop
      ) {
        currentSection = section.id;
      }
    });


    navLinks.forEach((link) => {
      const linkTarget =
        link.getAttribute("href");

      link.classList.toggle(
        "active",
        linkTarget ===
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


  /* =========================
     FECHA MENU AO REDIMENSIONAR
  ========================= */

  window.addEventListener("resize", () => {
    if (
      window.innerWidth > 920 &&
      nav &&
      menuButton
    ) {
      nav.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.classList.remove(
        "menu-open"
      );
    }
  });


  /* =========================
     FECHA MENU COM ESC
  ========================= */

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        nav &&
        menuButton
      ) {
        nav.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.classList.remove(
          "menu-open"
        );
      }
    }
  );
});
