import { findClub, readClubCatalog } from "../data/clubs.js";
import { initDialogDismissals, openDialog } from "./dialogs.js";

export function initClubModals() {
    const catalog = readClubCatalog();
    const videoModal = document.querySelector("#video-modal");
    const clubsModal = document.querySelector("#clubs-modal");
    const detailModal = document.querySelector("#detail-modal");
    const detailTitle = document.querySelector("#detail-title");
    const detailDescription = document.querySelector("#detail-description");
    const detailIcon = document.querySelector("#detail-icon");
    const clubsGrid = document.querySelector("#clubs-modal-grid");

    const showClubDetail = (name) => {
        const club = findClub(catalog, name);

        if (clubsModal?.open) clubsModal.close();
        detailTitle.textContent = club.name;
        detailDescription.textContent = club.description;
        detailIcon.textContent = club.icon;
        openDialog(detailModal);
    };

    if (clubsGrid) {
        const fragment = document.createDocumentFragment();

        catalog.forEach((club) => {
            const item = document.createElement("button");
            item.className = "clubs-modal__item";
            item.type = "button";
            item.dataset.club = club.name;
            item.innerHTML = `<span aria-hidden="true">${club.icon}</span>${club.name}`;
            fragment.appendChild(item);
        });

        clubsGrid.appendChild(fragment);
        clubsGrid.addEventListener("click", (event) => {
            const item = event.target.closest("[data-club]");
            if (item) showClubDetail(item.dataset.club);
        });
    }

    document.querySelectorAll(".js-open-video").forEach((button) => {
        button.addEventListener("click", () => openDialog(videoModal));
    });

    document.querySelectorAll(".js-open-clubs").forEach((button) => {
        button.addEventListener("click", () => openDialog(clubsModal));
    });

    document.querySelectorAll(".js-club-detail").forEach((button) => {
        button.addEventListener("click", () => {
            const feature = button.closest("[data-club]");
            showClubDetail(feature?.dataset.club || "Club Exitu's");
        });
    });

    document.querySelectorAll(".js-mini-club").forEach((button) => {
        button.addEventListener("click", () => showClubDetail(button.dataset.club));
    });

    initDialogDismissals();
}
