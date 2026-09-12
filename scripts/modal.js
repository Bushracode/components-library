document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('open-modal-btn');
    const modal = document.getElementById('demo-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelModalBtn = document.getElementById('cancel-modal-btn');

    if (!modal || !openModalBtn) return;

    let lastActiveElement = null;

    // Select all focusable elements inside the modal
    function getFocusableElements() {
        return modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
    }

    function openModal() {
        lastActiveElement = document.activeElement; // Save currently focused element
        modal.showModal(); // Native API opens modal top-layer and locks background scrolling

        // Auto-focus first input or fallback to close button
        const focusables = getFocusableElements();
        if (focusables.length > 0) {
            const emailInput = document.getElementById('user-email');
            (emailInput || focusables[0]).focus();
        }
    }

    function closeModal() {
        modal.close();
        if (lastActiveElement) {
            lastActiveElement.focus(); // Restore focus to trigger button
        }
    }

    // Focus Trapping Logic
    modal.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab') return;

        const focusables = Array.from(getFocusableElements());
        if (focusables.length === 0) return;

        const firstFocusable = focusables[0];
        const lastFocusable = focusables[focusables.length - 1];

        if (event.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
                event.preventDefault();
                lastFocusable.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastFocusable) {
                event.preventDefault();
                firstFocusable.focus();
            }
        }
    });

    // Event Listeners
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);

    // Close when clicking native backdrop area
    modal.addEventListener('click', (event) => {
        const rect = modal.getBoundingClientRect();
        const isInDialog = (
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
            closeModal();
        }
    });
});