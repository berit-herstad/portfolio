"use strict";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".carousel").forEach(function (carousel) {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(track.querySelectorAll(".carousel-slide"));
    const dotsContainer = carousel.querySelector(".carousel-dots");

    if (slides.length <= 1) return;

    // Clone first slide and append to end for seamless forward looping
    const clone = slides[0].cloneNode(true);
    track.appendChild(clone);

    let current = 0;
    let timer;
    let jumping = false;

    function setDimensions() {
      var w = carousel.clientWidth;
      Array.from(track.children).forEach(function (slide) {
        slide.style.width = w + "px";
      });
      track.style.transform = "translateX(-" + (current * w) + "px)";
    }

    slides.forEach(function (_, i) {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.addEventListener("click", function () { goTo(i); });
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll(".carousel-dot"));

    setDimensions();
    window.addEventListener("resize", setDimensions);

    function goTo(index) {
      if (jumping) return;
      dots[current % slides.length].classList.remove("active");
      current = index;
      track.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      track.style.transform = "translateX(-" + (current * carousel.clientWidth) + "px)";
      dots[current % slides.length].classList.add("active");
    }

    // After sliding to the clone of slide 1, silently snap back to real slide 1
    track.addEventListener("transitionend", function () {
      if (current === slides.length) {
        jumping = true;
        track.style.transition = "none";
        current = 0;
        track.style.transform = "translateX(0)";
        track.offsetWidth; // force reflow
        track.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        jumping = false;
      }
    });

    function startAuto() {
      timer = setInterval(function () { goTo(current + 1); }, 4000);
    }

    function stopAuto() {
      clearInterval(timer);
    }

    carousel.addEventListener("mouseenter", stopAuto);
    carousel.addEventListener("mouseleave", startAuto);

    startAuto();
  });
});
