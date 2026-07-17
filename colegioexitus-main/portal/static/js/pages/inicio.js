import { initClubModals } from "../components/club-modals.js";
import { initHeader } from "../components/header.js";
import { initNavigation } from "../components/navigation.js";
import { initRevealAnimations } from "../components/reveal.js";

document.documentElement.classList.add("js");

initHeader();
initNavigation();
initClubModals();
initRevealAnimations();
