export function syncPageLock() {
    const hasOpenDialog = [...document.querySelectorAll("dialog")]
        .some((dialog) => dialog.open);
    const hasOpenMenu = document.querySelector(".main-nav")
        ?.classList.contains("is-open");

    document.body.classList.toggle("is-locked", hasOpenDialog || hasOpenMenu);
}
