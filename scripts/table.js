document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('demo-data-table');
    if (!table) return;

    const tbody = table.querySelector('tbody');
    const headers = table.querySelectorAll('th[aria-sort]');
    const searchInput = document.getElementById('table-search-input');
    const tableCountBadge = document.getElementById('table-count-badge');
    const paginationInfo = document.getElementById('pagination-info');

    let rowsData = Array.from(tbody.querySelectorAll('tr'));

    // Search Filter
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            let visibleCount = 0;

            rowsData.forEach((row) => {
                const text = row.textContent.toLowerCase();
                if (text.includes(query)) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });

            if (tableCountBadge) {
                tableCountBadge.textContent = `${visibleCount} components showing`;
            }
            if (paginationInfo) {
                paginationInfo.textContent = `Showing 1 to ${visibleCount} of ${visibleCount} entries`;
            }

            window.announceA11yMessage && window.announceA11yMessage(`Filtered table to ${visibleCount} items`);
        });
    }

    // Sort Headers
    headers.forEach((th, columnIndex) => {
        th.addEventListener('click', () => {
            const currentSort = th.getAttribute('aria-sort');
            const newSort = currentSort === 'ascending' ? 'descending' : 'ascending';

            // Reset all header sort attributes
            headers.forEach((header) => header.setAttribute('aria-sort', 'none'));

            // Set target sort attribute
            th.setAttribute('aria-sort', newSort);

            // Sort rows in DOM
            const sortedRows = Array.from(tbody.querySelectorAll('tr')).sort((a, b) => {
                const cellA = a.children[columnIndex].textContent.trim();
                const cellB = b.children[columnIndex].textContent.trim();

                const isNumeric = !isNaN(parseFloat(cellA)) && isFinite(cellA);
                if (isNumeric) {
                    return newSort === 'ascending' 
                        ? parseFloat(cellA) - parseFloat(cellB) 
                        : parseFloat(cellB) - parseFloat(cellA);
                }

                return newSort === 'ascending' 
                    ? cellA.localeCompare(cellB) 
                    : cellB.localeCompare(cellA);
            });

            // Append sorted rows back to tbody
            sortedRows.forEach((row) => tbody.appendChild(row));

            const colName = th.textContent.trim();
            window.announceA11yMessage && window.announceA11yMessage(`Table sorted by ${colName} ${newSort}`);
        });

        // Allow keyboard activation on Th headers via Enter / Space
        th.setAttribute('tabindex', '0');
        th.setAttribute('role', 'columnheader');
        th.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                th.click();
            }
        });
    });
});
