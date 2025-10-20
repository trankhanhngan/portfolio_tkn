document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("load", () => {
    document.body.style.opacity = "1";
    document.body.style.transition = "opacity 1.5s ease-in-out";
  });

  /* === Progress bars (skills) === */
  const bars = document.querySelectorAll(".progress");

  if (bars.length) {
    const barObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const value =
              bar.dataset.value ||
              bar.getAttribute("data-value") ||
              bar.style.width;
            const num = parseInt(value, 10);
            if (!Number.isNaN(num)) {
              bar.style.width = num + "%";
            }
            obs.unobserve(bar);
          }
        });
      },
      { threshold: 0.35 }
    );

    bars.forEach((bar) => barObserver.observe(bar));
  }

  /* === Reveal (fade-up) cho các card/section === */
  // Các selector KHÔNG bao gồm header
  const selectors = [
    ".hero",
    ".about",
    ".hobbies",
    ".skills",
    ".grid-skill",
    ".skill-box",
    ".skill-card",
    ".projects",
    ".project-card",
    ".contact",
    ".certs",
    ".footer",
  ];
  const toReveal = Array.from(
    new Set(
      selectors.map((s) => Array.from(document.querySelectorAll(s))).flat()
    )
  ).filter(Boolean);

  if (toReveal.length) {
    toReveal.forEach((el) => {
      el.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    // thêm delay thứ tự mượt
    toReveal.forEach((el, i) => {
      el.style.transitionDelay = i * 0.08 + "s";
      revealObserver.observe(el);
    });
  }

  window.addEventListener("load", () => {
    // Đảm bảo header luôn clickable (nếu vẫn bị che bởi phần tử nào)
    document
      .querySelectorAll("header")
      .forEach((h) => (h.style.zIndex = "9999"));
  });
});

particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    size: { value: 2 },
    move: { speed: 0.6 },
    opacity: { value: 0.7 },
    color: { value: "#4dd9ff" },
    line_linked: { enable: false },
  },
});
