const skillbar = () => {
  // Listen for AOS animation
  document.addEventListener("aos:in", ({ detail }) => {
    if (detail.classList && detail.classList.contains("about-skills")) {
      animateBars(detail);
    }
  });

  const animateBars = (skillsContainer) => {
    const skillBars = skillsContainer.querySelectorAll(".skill");
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
};

export default skillbar;
