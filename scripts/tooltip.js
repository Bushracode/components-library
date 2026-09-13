document.addEventListener('DOMContentLoaded', () => {
    const tooltips = document.querySelectorAll('.tooltip-wrapper');
    if (!tooltips.length) return;

    tooltips.forEach((wrapper) => {
        const trigger = wrapper.querySelector('.tooltip-trigger');
        const box = wrapper.querySelector('.tooltip-box');

        if (!trigger || !box) return;

        // Ensure aria-describedby relationship
        if (!box.id) {
            box.id = `tooltip-${Math.random().toString(36).substr(2, 9)}`;
        }
        trigger.setAttribute('aria-describedby', box.id);
        trigger.setAttribute('tabindex', '0');

        // Escape key dismisses active tooltip
        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                box.classList.remove('is-visible');
                trigger.blur();
            }
        });
    });
});
