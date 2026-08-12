const routePages = new Map(
  [...document.querySelectorAll("[data-route]")].map((page) => [page.dataset.route, page]),
);

const navLinks = [...document.querySelectorAll("[data-nav]")];
let activePath = null;
let initialRouteComplete = false;

function readPath() {
  const hashPath = window.location.hash.slice(1) || "/";

  try {
    return decodeURIComponent(hashPath);
  } catch {
    return "/";
  }
}

function parentPath(path) {
  if (path.startsWith("/experience/")) return "/experience";
  if (path.startsWith("/projects/")) return "/projects";
  return path;
}

function updateActiveNavigation(path) {
  const activeParent = parentPath(path);

  navLinks.forEach((link) => {
    if (link.dataset.nav === activeParent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function focusRoute(page) {
  const heading = page.querySelector("h1");
  window.scrollTo(0, 0);
  heading?.focus({ preventScroll: true });
}

export function renderRoute(options = {}) {
  const requestedPath = options.path ?? readPath();
  const path = routePages.has(requestedPath) ? requestedPath : "/";
  const page = routePages.get(path);
  const focus = options.focus ?? initialRouteComplete;

  routePages.forEach((routePage, routePath) => {
    const selected = routePath === path;
    routePage.hidden = !selected;
    routePage.classList.toggle("active", selected);
  });

  updateActiveNavigation(path);
  document.title = page.dataset.title;
  document.body.dataset.currentRoute = path;
  document.documentElement.dataset.routerReady = "";

  if (focus || path === activePath) {
    focusRoute(page);
  } else {
    window.scrollTo(0, 0);
  }

  activePath = path;
  initialRouteComplete = true;
}

export function startRouter() {
  window.addEventListener("hashchange", () => renderRoute({ focus: true }));

  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-route-link]");
    if (!link) return;

    const path = link.dataset.routeLink;
    if (path === activePath) {
      event.preventDefault();
      renderRoute({ path, focus: true });
    }
  });

  renderRoute({ focus: false });
}

export function getActiveHeading() {
  return document.querySelector("[data-route]:not([hidden]) h1");
}
