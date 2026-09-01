document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("main section[id]");
  const year = document.querySelector("#current-year");

  const revealElements = document.querySelectorAll(
    ".hero-copy, " +
    ".hero-stack, " +
    ".hero-metrics, " +
    ".about-copy, " +
    ".feature-card, " +
    ".journey-card, " +
    ".journey-summary, " +
    ".skills-intro, " +
    ".skill-card, " +
    ".case-card, " +
    ".experience-card, " +
    ".leadership-card, " +
    ".education-card, " +
    ".learning-grid article, " +
    ".contact-card, " +
    ".contact-feature"
  );


  /* =========================================================
     ANO AUTOMÁTICO
  ========================================================== */

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================================================
     MENU MOBILE
  ========================================================== */

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


  /* =========================================================
     ESC FECHA MENU
  ========================================================== */

  document.addEventListener("keydown", (event) => {

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

  });


  /* =========================================================
     FECHAR MENU AO VOLTAR PARA DESKTOP
  ========================================================== */

  window.addEventListener("resize", () => {

    if (
      window.innerWidth > 1050 &&
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


  /* =========================================================
     ANIMAÇÕES DE ENTRADA
  ========================================================== */

  if (
    "IntersectionObserver" in window &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    revealElements.forEach((element) => {
      element.classList.add("reveal");
    });


    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.1,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* =========================================================
     LINK ATIVO DO MENU
  ========================================================== */

  const updateActiveNavigation = () => {

    const scrollPosition =
      window.scrollY + 180;

    let activeSection = "";


    sections.forEach((section) => {

      const sectionTop =
        section.offsetTop;

      const sectionBottom =
        sectionTop +
        section.offsetHeight;


      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionBottom
      ) {

        activeSection =
          section.getAttribute("id");

      }

    });


    navLinks.forEach((link) => {

      const target =
        link.getAttribute("href");

      link.classList.toggle(
        "active",
        target === `#${activeSection}`
      );

    });

  };


  updateActiveNavigation();


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
      passive: true
    }
  );


  /* =========================================================
     SCROLL SUAVE COM COMPENSAÇÃO DO HEADER
  ========================================================== */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) {
          return;
        }


        event.preventDefault();


        const headerHeight =
          document.querySelector(
            ".header"
          )?.offsetHeight || 0;


        const top =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;


        window.scrollTo({
          top,
          behavior: "smooth"
        });

      }
    );

  });

});
