const skillbar = () => {
  const skillBars = document.querySelectorAll(".skill");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
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

          observer.unobserve(skillBar);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach((skillBar) => {
    observer.observe(skillBar);
  });
};
export default skillbar;
