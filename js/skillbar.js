const skillbar = () => {
  const skillBars = document.querySelectorAll(".skill");
  const aboutSkills = document.querySelector(".about-skills");

  const animateBars = () => {
    skillBars.forEach((skillBar) => {
      const fill = skillBar.querySelector(".skill-bar__fill");
      const percentage = skillBar.querySelector(".skill-percent");
      const progress = parseInt(fill.getAttribute("data-progress"), 10);
      fill.style.width = `${progress}%`;

      let counter = 0;
      const interval = setInterval(() => {
        if (counter <= progress) {
          percentage.textContent = `${counter}%`;
          counter++;
        } else {
          clearInterval(interval);
        }
      }, 1500 / progress);
    });
  };

  if (aboutSkills && aboutSkills.hasAttribute("data-aos")) {
    if (aboutSkills.classList.contains("aos-animate")) {
      animateBars();
      return;
    }

    const mutationObserver = new MutationObserver((mutations, obs) => {
      for (const mutation of mutations) {
        if (
          mutation.attributeName === "class" &&
          aboutSkills.classList.contains("aos-animate")
        ) {
          animateBars();
          obs.disconnect();
          return;
        }
      }
    });
    mutationObserver.observe(aboutSkills, {
      attributes: true,
      attributeFilter: ["class"],
    });
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateBars();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (skillBars.length > 0) {
      observer.observe(aboutSkills || skillBars[0]);
    }
  }
};
export default skillbar;
