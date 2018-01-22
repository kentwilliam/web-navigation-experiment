const navNodes = document.querySelectorAll("nav");

const links = document.querySelectorAll("a[href]");

document.addEventListener("click", event =>
  letWith(event.target.closest("a"), link => {
    event.preventDefault();
    window.history.pushState({}, null, link.pathname);
    updateNavigation(link.pathname);
  })
);

window.addEventListener("popstate", popStateEvent => updateNavigation());

document.addEventListener("DOMContentLoaded", () => {
  updateNavigation();
});

const updateNavigation = (pathname = window.location.pathname) => {
  const zoomLevel = pathLevel(pathname);

  document.body.className = `level-${zoomLevel}`;

  links.forEach(link => {
    link.className = pathname.startsWith(link.pathname) ? "active" : "";
  });
};

const pathLevel = string =>
  letWith(string.match(/\/\w+/g), matches => matches.length, 0);

const letWith = (variable, predicate, elsePredicate) => {
  if (variable != null) {
    return predicate(variable);
  } else if (typeof elsePredicate === "function") {
    return elsePredicate();
  } else if (elsePredicate != null) {
    return elsePredicate;
  } else {
    return;
  }
};
