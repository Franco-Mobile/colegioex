import { syncPageLock } from "../core/page-lock.js";

export function initNavigation() {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");

    if (!menuButton || !navigation) return;

    const closeMenu = () => {
        menuButton.setAttribute("aria-expanded", "false");
        navigation.classList.remove("is-open");
        syncPageLock();
    };

    menuButton.addEventListener("click", () => {
        const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
        menuButton.setAttribute("aria-expanded", String(willOpen));
        navigation.classList.toggle("is-open", willOpen);
        syncPageLock();
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 880) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navigation.classList.contains("is-open")) {
            closeMenu();
        }
    });
}
