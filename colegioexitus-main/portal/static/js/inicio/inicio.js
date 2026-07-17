document.documentElement.classList.add("js");

(() => {
    "use strict";

    const clubs = [
        {
            name: "Ajedrez",
            icon: "♟️",
            description: "Potenciamos el pensamiento estratégico, la paciencia y la toma de decisiones mediante retos progresivos y partidas guiadas."
        },
        {
            name: "Karate",
            icon: "🥋",
            description: "Entrenamos disciplina, coordinación, respeto y confianza personal en un ambiente seguro y formativo."
        },
        {
            name: "Natación",
            icon: "🏊",
            description: "Desarrollamos técnica, resistencia y seguridad en el agua, acompañando el avance de cada estudiante."
        },
        {
            name: "Fútbol",
            icon: "⚽",
            description: "Aprendemos táctica, dominio del balón y colaboración, celebrando el esfuerzo colectivo dentro y fuera de la cancha."
        },
        {
            name: "Básquet",
            icon: "🏀",
            description: "Fortalecemos agilidad, precisión y lectura de juego a través de entrenamientos dinámicos y trabajo en equipo."
        },
        {
            name: "Vóley",
            icon: "🏐",
            description: "Combinamos coordinación, comunicación y estrategia para crecer como equipo en cada entrenamiento."
        },
        {
            name: "Gimnasia",
            icon: "🤸",
            description: "Exploramos equilibrio, flexibilidad y control corporal con rutinas adaptadas al nivel de cada estudiante."
        },
        {
            name: "Teatro",
            icon: "🎭",
            description: "Creamos historias para fortalecer la expresión oral, la empatía, la imaginación y la confianza escénica."
        },
        {
            name: "Cine",
            icon: "🎬",
            description: "Descubrimos el lenguaje audiovisual, desde la idea y el guion hasta la puesta en escena y la edición."
        },
        {
            name: "Audiovisual",
            icon: "🎥",
            description: "Aprendemos fotografía, video y narrativa digital para comunicar ideas con propósito y creatividad."
        },
        {
            name: "Música",
            icon: "🎵",
            description: "Desarrollamos sensibilidad, ritmo y escucha a través de la práctica instrumental y la creación colectiva."
        },
        {
            name: "Robótica",
            icon: "🤖",
            description: "Diseñamos, programamos y resolvemos desafíos con tecnología, lógica y una mentalidad de innovación."
        },
        {
            name: "Arte",
            icon: "🎨",
            description: "Experimentamos con técnicas, materiales y referentes para construir una voz visual propia."
        }
    ];

    const body = document.body;
    const header = document.querySelector(".site-header");
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");
    const videoModal = document.querySelector("#video-modal");
    const clubsModal = document.querySelector("#clubs-modal");
    const detailModal = document.querySelector("#detail-modal");
    const detailTitle = document.querySelector("#detail-title");
    const detailDescription = document.querySelector("#detail-description");
    const detailIcon = document.querySelector("#detail-icon");
    const clubsGrid = document.querySelector("#clubs-modal-grid");

    const getClub = (name) => clubs.find((club) => club.name === name) || {
        name,
        icon: "✦",
        description: "Un espacio para descubrir nuevas habilidades, compartir intereses y crecer junto a otros estudiantes."
    };

    const setPageLock = () => {
        const hasOpenDialog = [...document.querySelectorAll("dialog")].some((dialog) => dialog.open);
        const hasOpenMenu = navigation?.classList.contains("is-open");
        body.classList.toggle("is-locked", hasOpenDialog || hasOpenMenu);
    };

    const openDialog = (dialog) => {
        if (!dialog || dialog.open) return;
        dialog.showModal();
        setPageLock();
    };

    const closeDialog = (dialog) => {
        if (!dialog?.open) return;
        dialog.close();
        setPageLock();
    };

    const closeMenu = () => {
        if (!menuButton || !navigation) return;
        menuButton.setAttribute("aria-expanded", "false");
        navigation.classList.remove("is-open");
        setPageLock();
    };

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
            menuButton.setAttribute("aria-expanded", String(willOpen));
            navigation.classList.toggle("is-open", willOpen);
            setPageLock();
        });

        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 880) closeMenu();
        });
    }

    const updateHeader = () => {
        header?.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (clubsGrid) {
        const fragment = document.createDocumentFragment();

        clubs.forEach((club) => {
            const item = document.createElement("button");
            item.className = "clubs-modal__item";
            item.type = "button";
            item.dataset.club = club.name;
            item.innerHTML = `<span aria-hidden="true">${club.icon}</span>${club.name}`;
            fragment.appendChild(item);
        });

        clubsGrid.appendChild(fragment);
    }

    const showClubDetail = (name) => {
        const club = getClub(name);

        if (clubsModal?.open) clubsModal.close();
        detailTitle.textContent = club.name;
        detailDescription.textContent = club.description;
        detailIcon.textContent = club.icon;
        openDialog(detailModal);
    };

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

    clubsGrid?.addEventListener("click", (event) => {
        const item = event.target.closest("[data-club]");
        if (item) showClubDetail(item.dataset.club);
    });

    document.querySelectorAll("dialog").forEach((dialog) => {
        dialog.querySelector(".js-close-modal")?.addEventListener("click", () => closeDialog(dialog));

        dialog.addEventListener("click", (event) => {
            const bounds = dialog.getBoundingClientRect();
            const isBackdrop = event.clientX < bounds.left
                || event.clientX > bounds.right
                || event.clientY < bounds.top
                || event.clientY > bounds.bottom;

            if (isBackdrop) closeDialog(dialog);
        });

        dialog.addEventListener("close", setPageLock);
        dialog.addEventListener("cancel", () => window.setTimeout(setPageLock, 0));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navigation?.classList.contains("is-open")) {
            closeMenu();
        }
    });

    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, instance) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                instance.unobserve(entry.target);
            });
        }, {
            threshold: .12,
            rootMargin: "0px 0px -40px"
        });

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }
})();
