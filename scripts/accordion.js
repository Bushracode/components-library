document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion');
    if (!accordions.length) return;

    accordions.forEach((accordion) => {
        const triggers = Array.from(accordion.querySelectorAll('.accordion-trigger'));

        triggers.forEach((trigger) => {
            trigger.addEventListener('click', () => {
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                const panelId = trigger.getAttribute('aria-controls');
                const panel = document.getElementById(panelId);
                const item = trigger.closest('.accordion-item');

                // Single panel expand mode per accordion block
                triggers.forEach((otherTrigger) => {
                    if (otherTrigger !== trigger) {
                        otherTrigger.setAttribute('aria-expanded', 'false');
                        const otherPanelId = otherTrigger.getAttribute('aria-controls');
                        const otherPanel = document.getElementById(otherPanelId);
                        if (otherPanel) otherPanel.hidden = true;
                        const otherItem = otherTrigger.closest('.accordion-item');
                        if (otherItem) otherItem.classList.remove('is-open');
                    }
                });

                // Toggle target panel
                if (isExpanded) {
                    trigger.setAttribute('aria-expanded', 'false');
                    if (panel) panel.hidden = true;
                    if (item) item.classList.remove('is-open');
                    window.announceA11yMessage && window.announceA11yMessage(`Collapsed ${trigger.textContent.trim()}`);
                } else {
                    trigger.setAttribute('aria-expanded', 'true');
                    if (panel) panel.hidden = false;
                    if (item) item.classList.add('is-open');
                    window.announceA11yMessage && window.announceA11yMessage(`Expanded ${trigger.textContent.trim()}`);
                }
            });
        });

        // WAI-ARIA Keyboard Navigation for Accordion Headers (Arrow Up, Down, Home, End)
        accordion.addEventListener('keydown', (event) => {
            const activeElement = document.activeElement;
            const currentIndex = triggers.indexOf(activeElement);
            if (currentIndex === -1) return;

            let nextIndex = null;

            switch (event.key) {
                case 'ArrowDown':
                    nextIndex = (currentIndex + 1) % triggers.length;
                    break;
                case 'ArrowUp':
                    nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
                    break;
                case 'Home':
                    nextIndex = 0;
                    break;
                case 'End':
                    nextIndex = triggers.length - 1;
                    break;
                default:
                    return;
            }

            event.preventDefault();
            triggers[nextIndex].focus();
        });
    });
});
