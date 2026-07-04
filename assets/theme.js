// -------------Header Color Change on Scroll-----------------------
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");

  if (!header) return;

  // const isLeadershipPage = document.body.classList.contains("page-leadership");

  const handleScroll = () => {
    // if (isLeadershipPage) {
    //   header.classList.add("header-scrolled");
    //   return;
    // }

    // Normal pages behavior
    if (window.scrollY > 0) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);
});


// -------------Animated Counters on Scroll-----------------------

function animateCounter(el, duration = 2000) {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || 0);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";

  let startTime = null;

  function update(currentTime) {
    if (!startTime) startTime = currentTime;

    const progress = Math.min((currentTime - startTime) / duration, 1);

    const current = target * progress;

    let value;

    if (decimals > 0) {
      value = current.toFixed(decimals);
    } else {
      value = Math.floor(current).toLocaleString();
    }

    el.textContent = `${prefix}${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      const finalValue =
        decimals > 0 ? target.toFixed(decimals) : target.toLocaleString();

      el.textContent = `${prefix}${finalValue}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".counter-section");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const section = entry.target;

        // Run only once per section
        if (section.dataset.counted) return;

        section.dataset.counted = "true";

        section
          .querySelectorAll(".counter")
          .forEach((counter) => animateCounter(counter));

        sectionObserver.unobserve(section);
      });
    },
    {
      threshold: 0.3,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
});


// ------------- Parallax Effect with Optional Scaling -----------------------

document.addEventListener("DOMContentLoaded", () => {
  const parallaxImages = document.querySelectorAll(".parallax");

  if (!parallaxImages.length) return;

  function parallaxEffect() {
    parallaxImages.forEach((image) => {
      // Find the parent section for each image
      const heroSection = image.closest("section");
      
      if (!heroSection) return;

      const rect = heroSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Skip if section is completely off-screen
      if (rect.bottom < 0 || rect.top > windowHeight) return;

      const progress =
        (windowHeight - rect.top) / (windowHeight + rect.height);

      // 🎯 Parallax movement
      const move = (progress - 0.5) * 80;

      /* =========================
         🎛️ SCALE CONTROL SECTION
         ========================= */

      // 🔼 OPTION 1: SCALE UP (zoom in while scrolling)
      const scaleUp = 1 + progress * 0.5;

      // 🔽 OPTION 2: SCALE DOWN (zoom out while scrolling)
      const scaleDown = 1.12 - progress * 0.5;

      // 👉 Choose ONE:
      const scale = scaleUp; // use scaleUp
      // const scale = scaleDown; // use scaleDown

      /* ========================= */

      image.style.transform =
        `translate3d(0, ${move}px, 0) scale(${scale})`;
    });
  }

  window.addEventListener("scroll", () => {
    requestAnimationFrame(parallaxEffect);
  }, { passive: true });

  window.addEventListener("resize", parallaxEffect);

  parallaxEffect();
});