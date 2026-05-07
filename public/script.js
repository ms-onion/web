const revealItems = document.querySelectorAll(".reveal");
const callsignElement = document.getElementById("callsign");
const yearElement = document.getElementById("year");
const prefersCalmMode =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 640px)").matches;
const canUseReveal =
  typeof window !== "undefined" && !prefersCalmMode && "IntersectionObserver" in window;

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (canUseReveal) {
  document.body.classList.add("reveal-ready");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.22 }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
}

const callSigns = ["DEFENSE", "OFFENSE", "RESEARCH", "AUTOMATION"];
let callSignIndex = 0;

if (callsignElement && !prefersCalmMode) {
  setInterval(() => {
    callSignIndex = (callSignIndex + 1) % callSigns.length;
    callsignElement.textContent = callSigns[callSignIndex];
  }, 1800);
}
