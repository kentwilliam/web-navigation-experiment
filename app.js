const [rootNavigation, sectionNavigation, contentNavigation] = [
  "root-navigation",
  "section-navigation",
  "content-navigation"
].map(id => document.getElementById(id));

document.addEventListener("click", event =>
  letWith(event.target.closest("a"), link => {
    event.preventDefault();
    window.history.pushState({}, null, link.pathname);
    updateNavigation(link.pathname);
  })
);

window.addEventListener("popstate", popStateEvent =>
  updateNavigation(window.location.pathname)
);

document.addEventListener("DOMContentLoaded", () => {});

const updateNavigation = pathname => {
  const level = pathLevel(pathname);

  switch (level) {
    case 0:
    default:
      rootNavigation.className = "focused";
      sectionNavigation.className = "";
      contentNavigation.className = "";
      break;

    case 1:
      rootNavigation.className = "offscreen";
      sectionNavigation.className = "focused";
      contentNavigation.className = "";
      break;

    case 2:
      rootNavigation.className = "offscreen";
      sectionNavigation.className = "offscreen";
      contentNavigation.className = "focused";
      break;
  }
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
