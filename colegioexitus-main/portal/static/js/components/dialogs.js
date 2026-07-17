import { syncPageLock } from "../core/page-lock.js";

export function openDialog(dialog) {
    if (!dialog || dialog.open) return;
    dialog.showModal();
    syncPageLock();
}

export function closeDialog(dialog) {
    if (!dialog?.open) return;
    dialog.close();
    syncPageLock();
}

export function initDialogDismissals() {
    document.querySelectorAll("dialog").forEach((dialog) => {
        dialog.querySelector(".js-close-modal")
            ?.addEventListener("click", () => closeDialog(dialog));

        dialog.addEventListener("click", (event) => {
            const bounds = dialog.getBoundingClientRect();
            const clickedBackdrop = event.clientX < bounds.left
                || event.clientX > bounds.right
                || event.clientY < bounds.top
                || event.clientY > bounds.bottom;

            if (clickedBackdrop) closeDialog(dialog);
        });

        dialog.addEventListener("close", syncPageLock);
        dialog.addEventListener("cancel", () => window.setTimeout(syncPageLock, 0));
    });
}
