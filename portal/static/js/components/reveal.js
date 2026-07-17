export function initRevealAnimations() {
    const revealItems = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries, instance) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            instance.unobserve(entry.target);
        });
    }, {
        threshold: .12,
        rootMargin: "0px 0px -40px",
    });

    revealItems.forEach((item) => observer.observe(item));
}
