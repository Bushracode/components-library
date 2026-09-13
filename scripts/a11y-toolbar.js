document.addEventListener('DOMContentLoaded', () => {
    // Accessibility Toolbar Controls
    const fontNormalBtn = document.getElementById('btn-font-normal');
    const fontLgBtn = document.getElementById('btn-font-lg');
    const fontXlBtn = document.getElementById('btn-font-xl');
    const contrastBtn = document.getElementById('btn-contrast-toggle');
    const loggerTerminal = document.getElementById('a11y-logger-output');

    // Live Announcer Function
    window.announceA11yMessage = function (message) {
        if (loggerTerminal) {
            const time = new Date().toLocaleTimeString();
            const logItem = document.createElement('div');
            logItem.textContent = `[${time}] ${message}`;
            loggerTerminal.prepend(logItem);
        }
    };

    // Font Scaler
    if (fontNormalBtn && fontLgBtn && fontXlBtn) {
        fontNormalBtn.addEventListener('click', () => {
            document.body.classList.remove('text-scale-lg', 'text-scale-xl');
            updateActiveFontBtn(fontNormalBtn);
            window.announceA11yMessage('Font size set to Standard (100%)');
        });

        fontLgBtn.addEventListener('click', () => {
            document.body.classList.remove('text-scale-xl');
            document.body.classList.add('text-scale-lg');
            updateActiveFontBtn(fontLgBtn);
            window.announceA11yMessage('Font size scaled to Large (112%)');
        });

        fontXlBtn.addEventListener('click', () => {
            document.body.classList.remove('text-scale-lg');
            document.body.classList.add('text-scale-xl');
            updateActiveFontBtn(fontXlBtn);
            window.announceA11yMessage('Font size scaled to Extra Large (125%)');
        });
    }

    function updateActiveFontBtn(activeBtn) {
        [fontNormalBtn, fontLgBtn, fontXlBtn].forEach((btn) => btn && btn.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');
    }

    // Contrast Toggle
    if (contrastBtn) {
        contrastBtn.addEventListener('click', () => {
            const isHighContrast = document.body.classList.toggle('high-contrast');
            contrastBtn.classList.toggle('active', isHighContrast);
            contrastBtn.setAttribute('aria-pressed', isHighContrast);
            window.announceA11yMessage(`High Contrast Mode ${isHighContrast ? 'Enabled' : 'Disabled'}`);
        });
    }

    // Code Snippet View Toggles & Copy to Clipboard
    const codeToggleBtns = document.querySelectorAll('.code-toggle-btn');
    codeToggleBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target-code');
            const codeBox = document.getElementById(targetId);
            if (!codeBox) return;

            const isHidden = codeBox.hidden;
            codeBox.hidden = !isHidden;
            btn.setAttribute('aria-expanded', isHidden);
            btn.textContent = isHidden ? 'Hide Code' : 'View Code';
        });
    });

    const copyBtns = document.querySelectorAll('.copy-code-btn');
    copyBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const codeEl = btn.nextElementSibling;
            if (!codeEl) return;

            const codeText = codeEl.textContent;
            navigator.clipboard.writeText(codeText).then(() => {
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                window.announceA11yMessage('Source code copied to clipboard');
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 2000);
            }).catch(() => {
                btn.textContent = 'Copy Failed';
            });
        });
    });
});
