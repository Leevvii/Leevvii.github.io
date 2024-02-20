// window.addEventListener("load", function () {
//   const loaderContainer = document.getElementById("loaderContainer");
//   loaderContainer.style.display = "none"; // Hide loader when page is loaded
// });

// Mobile Toggle Menu
const primaryHeader = document.querySelector(".header");
const navToggle = document.querySelector(".header--toggle");
const primaryNav = document.querySelector(".header__menu");
const iconMenu = document.querySelector(".toggle__menu");
const iconClose = document.querySelector(".toggle__close");

navToggle.addEventListener("click", () => {
  const isNavVisible = primaryNav.hasAttribute("data-visible", true);

  // Toggle the visibility of icons based on the current state
  iconMenu.style.display = isNavVisible ? "block" : "none";
  iconClose.style.display = isNavVisible ? "none" : "block";

  navToggle.setAttribute("aria-expanded", !isNavVisible);
  primaryNav.toggleAttribute("data-visible", !isNavVisible);
});

// Calculate navigation Height

const navigationHeight = document.querySelector(".header").offsetHeight;

document.documentElement.style.setProperty(
  "--scroll-padding",
  navigationHeight + "px"
);

// Infinite Scroller

const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

// Storing Theme to Local Storage

const colorThemes = document.querySelectorAll('[name="theme"]');

// store theme
const storeTheme = function (theme) {
  localStorage.setItem("theme", theme);
};

// set theme when visitor returns
const setTheme = function () {
  const activeTheme = localStorage.getItem("theme");
  colorThemes.forEach((themeOption) => {
    if (themeOption.id === activeTheme) {
      themeOption.checked = true;
    }
  });
  // fallback for no :has() support
  document.documentElement.className = activeTheme;
};

colorThemes.forEach((themeOption) => {
  themeOption.addEventListener("click", () => {
    storeTheme(themeOption.id);
    // fallback for no :has() support
    document.documentElement.className = themeOption.id;
  });
});

document.onload = setTheme();
