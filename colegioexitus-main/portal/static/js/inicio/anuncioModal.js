document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('flyer-modal');
    if (!modal) return;

    const backdrop = modal.querySelector('.flyer-backdrop');
    const closeBtn = modal.querySelector('.flyer-close');
    const noShowCheckbox = document.getElementById('flyer-no-show');

    // Si el usuario pidió no mostrar, no abrir
    if (sessionStorage.getItem('flyer-no-show') === '1') {
        modal.setAttribute('aria-hidden', 'true');
        return;
    }

    // abrir modal
    function open() {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        // prevenir scroll de fondo
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        // foco accesible
        closeBtn.focus();
    }

    // cerrar modal
    function close() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    // abrir al cargar
    setTimeout(open, 300); // espera pequeña para efecto

    // handlers
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
    });

    // guardar preferencia "No mostrar de nuevo"
    if (noShowCheckbox) {
        noShowCheckbox.addEventListener('change', function () {
            if (this.checked) sessionStorage.setItem('flyer-no-show', '1');
            else sessionStorage.removeItem('flyer-no-show');
        });
    }
});