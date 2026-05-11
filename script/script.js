document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchForm = document.querySelector('.search-container');
    const cards = document.querySelectorAll('.card');
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');

    // Redirection Dictionary
    const dictionary = {
        'wa': 'https://web.whatsapp.com',
        'gcr': 'https://classroom.google.com',
        'gdoc': 'https://docs.google.com',
        'eler': 'https://elearning.itera.ac.id'
    };

    // Intercept Search Form
    searchForm.addEventListener('submit', (e) => {
        const query = searchInput.value.toLowerCase().trim();
        
        if (dictionary[query]) {
            e.preventDefault();
            window.location.href = dictionary[query];
        }
    });

    // Live filtering
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        cards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const tag = card.querySelector('.card-tag').textContent.toLowerCase();
            const links = Array.from(card.querySelectorAll('a'))
                .map(link => link.textContent.toLowerCase());
            
            const isMatch = title.includes(searchTerm) || 
                            tag.includes(searchTerm) ||
                            links.some(link => link.includes(searchTerm));

            if (isMatch || searchTerm === '') {
                card.style.opacity = '1';
                card.style.pointerEvents = 'all';
            } else {
                card.style.opacity = '0.1';
                card.style.pointerEvents = 'none';
            }
        });
    });

    // Clock and Date Logic
    function updateClock() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { 
            hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' 
        });
        const dateStr = now.toLocaleDateString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        });

        if (timeElement) timeElement.textContent = timeStr;
        if (dateElement) dateElement.textContent = dateStr;
    }

    setInterval(updateClock, 1000);
    updateClock();

    // Keyboard shortcut '/'
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    });
});
