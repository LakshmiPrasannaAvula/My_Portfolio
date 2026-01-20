// Smooth scroll for in-page links (with offset for sticky header)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const headerOffset = 70;
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
  });

  // Close nav on link click (mobile)
  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navList.classList.contains("open")) {
        navList.classList.remove("open");
        navToggle.classList.remove("open");
      }
    });
  });
}

// Intersection Observer for fade-in elements
const fadeInElements = document.querySelectorAll(".fade-in");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  fadeInElements.forEach((el) => observer.observe(el));
} else {
  // Fallback for older browsers
  fadeInElements.forEach((el) => el.classList.add("visible"));
}

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

