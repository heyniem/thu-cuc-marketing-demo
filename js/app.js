import { getActiveHeading, startRouter } from "./router.js";

const header = document.querySelector("[data-site-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const skipLink = document.querySelector("[data-skip-link]");
const contactForm = document.querySelector("[data-contact-form]");
const mobileQuery = window.matchMedia("(max-width: 767px)");

function setMenu(open) {
  header.toggleAttribute("data-menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Toggle menu");
}

function startMenu() {
  menuToggle.hidden = false;
  header.setAttribute("data-menu-enhanced", "");

  menuToggle.addEventListener("click", () => {
    setMenu(!header.hasAttribute("data-menu-open"));
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.hasAttribute("data-menu-open")) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (mobileQuery.matches && !header.contains(event.target)) setMenu(false);
  });

  mobileQuery.addEventListener("change", (event) => {
    if (!event.matches) setMenu(false);
  });
}

function startSkipLink() {
  skipLink.addEventListener("click", (event) => {
    const heading = getActiveHeading();
    if (!heading) return;

    event.preventDefault();
    heading.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  });
}

function startContactForm() {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = contactForm.querySelector("[data-form-note]");

    if (note) {
      note.textContent = "Thanks — this is a presentation demo, so no message was sent or stored.";
    }

    contactForm.reset();
  });
}

startMenu();
startRouter();
startSkipLink();
startContactForm();
