export function readClubCatalog() {
    const catalogElement = document.querySelector("#club-catalog");

    if (!catalogElement) return [];

    try {
        return JSON.parse(catalogElement.textContent);
    } catch (error) {
        console.error("No se pudo cargar el catálogo de clubes.", error);
        return [];
    }
}

export function findClub(catalog, name) {
    return catalog.find((club) => club.name === name) || {
        name,
        icon: "✦",
        description: "Un espacio para descubrir nuevas habilidades, compartir intereses y crecer junto a otros estudiantes.",
    };
}
