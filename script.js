// Smooth nav highlighting and sticky header behavior
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = [...document.querySelectorAll("section[id]")];
  const navToggle = document.querySelector(".nav-toggle");
  const navLinksContainer = document.querySelector(".nav-links");

  // Sticky header style on scroll
  const handleHeaderScroll = () => {
    if (window.scrollY > 8) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };
  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  // IntersectionObserver for reveal animations
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // Active nav link based on scroll position
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (!id) return;
        const matchingLink = document.querySelector(
          `.nav-link[href="#${id}"]`
        );
        if (!matchingLink) return;

        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("is-active"));
          matchingLink.classList.add("is-active");
        }
      });
    },
    {
      threshold: 0.35,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // Mobile nav toggle
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinksContainer.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close mobile menu when clicking a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinksContainer.classList.contains("is-open")) {
          navLinksContainer.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }
});

