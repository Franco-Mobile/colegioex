document.addEventListener('DOMContentLoaded', function () {
    const partners = document.querySelectorAll('.constellation .partner');
    const infoPanel = document.querySelector('.partners-info');
    if (!partners.length || !infoPanel) return;

    const infoTitle = infoPanel.querySelector('.info-title');
    const infoSub = infoPanel.querySelector('.info-sub');
    const infoDesc = infoPanel.querySelector('.info-desc');
    const infoClose = infoPanel.querySelector('.info-close');

    function showInfo(target) {
        if (!target) return;
        infoTitle.textContent = target.dataset.title || '';
        infoSub.textContent = target.dataset.sub || '';
        infoDesc.textContent = target.dataset.desc || '';
        infoPanel.classList.add('open');
        infoPanel.setAttribute('aria-hidden', 'false');
    }

    function hideInfo() {
        infoPanel.classList.remove('open');
        infoPanel.setAttribute('aria-hidden', 'true');
    }

    partners.forEach((p, idx) => {
        // Rango reducido: antes (Math.random()*140 - 70) => ahora ±30px
        const dx = (Math.random() * 60 - 30).toFixed(2); // -30 .. 30 px
        const dy = (Math.random() * 60 - 30).toFixed(2); // -30 .. 30 px

        // Duración similar; puedes aumentarla si quieres movimiento más lento
        const dur = (Math.random() * 1.6 + 2.4).toFixed(2); // 2.4 .. 4.0 s
        const delay = (-Math.random() * dur).toFixed(2);

        p.style.setProperty('--dx', dx + 'px');
        p.style.setProperty('--dy', dy + 'px');
        p.style.setProperty('--dur', dur + 's');
        p.style.setProperty('--i', String(idx + 1));
        p.style.animationDelay = delay + 's';

        const baseOp = (0.75 + Math.random() * 0.15).toFixed(2);
        p.style.opacity = baseOp;

        p.addEventListener('mouseenter', () => showInfo(p));
        p.addEventListener('focus', () => showInfo(p));
        p.addEventListener('mouseleave', () => hideInfo());
        p.addEventListener('blur', () => hideInfo());

        p.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showInfo(p);
            }
        });
    });

    if (infoClose) infoClose.addEventListener('click', hideInfo);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideInfo(); });

    document.addEventListener('click', (e) => {
        if (!infoPanel.contains(e.target) && !e.target.closest('.partner')) hideInfo();
    });
    infoPanel.addEventListener('click', (e) => e.stopPropagation());
});