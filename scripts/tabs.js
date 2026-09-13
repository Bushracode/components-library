document.addEventListener('DOMContentLoaded', () => {
    const tabList = document.querySelector('[role="tablist"]');
    if (!tabList) return;

    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

    function switchTab(targetTab) {
        // Deactivate all tabs
        tabs.forEach((tab) => {
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');
            tab.classList.remove('active');
        });

        // Hide all panels
        panels.forEach((panel) => {
            panel.hidden = true;
        });

        // Activate selected tab
        targetTab.setAttribute('aria-selected', 'true');
        targetTab.setAttribute('tabindex', '0');
        targetTab.classList.add('active');
        targetTab.focus();

        // Show corresponding panel
        const controlsId = targetTab.getAttribute('aria-controls');
        const targetPanel = document.getElementById(controlsId);
        if (targetPanel) {
            targetPanel.hidden = false;
        }

        window.announceA11yMessage && window.announceA11yMessage(`Switched tab to ${targetTab.textContent.trim()}`);
    }

    // Mouse Click Event
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => switchTab(tab));
    });

    // WAI-ARIA Keyboard Navigation Engine
    tabList.addEventListener('keydown', (e) => {
        const currentIndex = tabs.indexOf(document.activeElement);
        if (currentIndex === -1) return;

        let nextIndex = null;

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                nextIndex = (currentIndex + 1) % tabs.length;
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                break;
            case 'Home':
                nextIndex = 0;
                break;
            case 'End':
                nextIndex = tabs.length - 1;
                break;
            default:
                return;
        }

        e.preventDefault();
        switchTab(tabs[nextIndex]);
    });
});