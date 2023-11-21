/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************************!*\
  !*** ./src/assets/javascripts/topbar.js ***!
  \******************************************/
// We create references for our menu and menu icon:
const iconMobile = document.querySelector(".header-menu-icon");
const headerMenu = document.querySelector(".header-menu");

// This property indicates whether the menu is open:
let isMenuOpen = false;

// This property indicates whether the mobile menu has been created:
let mobileMenuDOM;

// To close the menu, simply remove the open class from the menu:
const closeMenu = () => {
  mobileMenuDOM.classList.remove("open");
};

// We create a div and add the mobile-menu class.
// We prevent the menu from closing on a click inside.
// We then clone the normal menu links.
const createMobileMenu = () => {
  mobileMenuDOM = document.createElement("div");
  mobileMenuDOM.classList.add("mobile-menu");
  mobileMenuDOM.addEventListener("click", event => {
    event.stopPropagation();
  });
  mobileMenuDOM.append(headerMenu.querySelector("ul").cloneNode(true));
  headerMenu.append(mobileMenuDOM);
};

// If the menu has not been created, we create it.
// In all cases, we open it by adding the open class:
const openMenu = () => {
  if (!mobileMenuDOM) {
    createMobileMenu();
  }
  mobileMenuDOM.classList.add("open");
};

// Opens or closes the menu depending on its status :
const toggleMobileMenu = event => {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
  isMenuOpen = !isMenuOpen;
};

// Clicking on the icon will open or close the menu
// and prevent propagation of the event to window :
iconMobile.addEventListener("click", event => {
  event.stopPropagation();
  toggleMobileMenu();
});

// We retrieve clicks on window to close the menu.
window.addEventListener("click", () => {
  if (isMenuOpen) {
    toggleMobileMenu();
  }
});

// If the window is enlarged and exceeds 480px in width
// Then we close the menu if it's open:
window.addEventListener("resize", event => {
  if (window.innerWidth > 480 && isMenuOpen) {
    toggleMobileMenu();
  }
});
/******/ })()
;
//# sourceMappingURL=topbar.bundle.js.map