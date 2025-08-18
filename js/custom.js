document.addEventListener('DOMContentLoaded', function () {
    const propertyGrid = document.getElementById('property-grid');
    if (!propertyGrid) {
        return; // Not on the properties page, do nothing.
    }

    const applyFiltersBtn = document.getElementById('apply-filters');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const locationSearch = document.getElementById('location-search');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    const bedroomBtns = document.querySelectorAll('.filter-bar.d-lg-block .btn-group .btn');
    const filterChips = document.getElementById('filter-chips');
    const propertyCount = document.getElementById('property-count');
    const propertyCards = Array.from(propertyGrid.querySelectorAll('.col.mb-4'));
    const emptyState = document.getElementById('empty-state');
    const clearFiltersLink = document.getElementById('clear-filters-link');

    const applyFiltersBtnMobile = document.getElementById('apply-filters-mobile');
    const clearFiltersBtnMobile = document.getElementById('clear-filters-mobile');
    const locationSearchMobile = document.getElementById('location-search-mobile');
    const minPriceMobile = document.getElementById('min-price-mobile');
    const maxPriceMobile = document.getElementById('max-price-mobile');
    const bedroomBtnsMobile = document.querySelectorAll('#filter-drawer .btn-group .btn');

    let activeFilters = {};
    let locationTimeout;

    function debounce(func, delay) {
        clearTimeout(locationTimeout);
        locationTimeout = setTimeout(func, delay);
    }

    function applyFilters(isMobile = false) {
        activeFilters = {};

        const location = isMobile ? locationSearchMobile.value.trim().toLowerCase() : locationSearch.value.trim().toLowerCase();
        if (location) {
            activeFilters.location = location;
        }

        const min = isMobile ? parseFloat(minPriceMobile.value) : parseFloat(minPrice.value);
        const max = isMobile ? parseFloat(maxPriceMobile.value) : parseFloat(maxPrice.value);

        if (!isNaN(min) && !isNaN(max) && min > max) {
            alert('Min price cannot be greater than Max price.');
            return;
        }

        if (!isNaN(min)) {
            activeFilters.minPrice = min;
        }
        if (!isNaN(max)) {
            activeFilters.maxPrice = max;
        }

        const btns = isMobile ? bedroomBtnsMobile : bedroomBtns;
        btns.forEach(btn => {
            if (btn.classList.contains('active') && btn.textContent !== 'All') {
                activeFilters.bedrooms = btn.textContent;
            }
        });

        renderChips();
        filterProperties();
    }

    function clearFilters(isMobile = false) {
        if (isMobile) {
            locationSearchMobile.value = '';
            minPriceMobile.value = '';
            maxPriceMobile.value = '';
            bedroomBtnsMobile.forEach(btn => btn.classList.remove('active'));
            bedroomBtnsMobile[0].classList.add('active');
        } else {
            locationSearch.value = '';
            minPrice.value = '';
            maxPrice.value = '';
            bedroomBtns.forEach(btn => btn.classList.remove('active'));
            bedroomBtns[0].classList.add('active');
        }

        activeFilters = {};
        renderChips();
        filterProperties();
    }

    function removeFilter(key) {
        delete activeFilters[key];
        if (key === 'minPrice') {
            minPrice.value = '';
            minPriceMobile.value = '';
        }
        if (key === 'maxPrice') {
            maxPrice.value = '';
            maxPriceMobile.value = '';
        }
        if (key === 'location') {
            locationSearch.value = '';
            locationSearchMobile.value = '';
        }
        if (key === 'bedrooms') {
            bedroomBtns.forEach(btn => btn.classList.remove('active'));
            bedroomBtns[0].classList.add('active');
            bedroomBtnsMobile.forEach(btn => btn.classList.remove('active'));
            bedroomBtnsMobile[0].classList.add('active');
        }

        renderChips();
        filterProperties();
    }

    function renderChips() {
        filterChips.innerHTML = '';
        for (const key in activeFilters) {
            const chip = document.createElement('span');
            chip.className = 'chip';
            let text = '';
            if (key === 'minPrice') {
                text = `Min: €${activeFilters[key]}`;
            } else if (key === 'maxPrice') {
                text = `Max: €${activeFilters[key]}`;
            } else {
                text = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${activeFilters[key]}`;
            }
            chip.innerHTML = `${text} <span class="remove-chip" data-filter="${key}">&times;</span>`;
            filterChips.appendChild(chip);
        }

        document.querySelectorAll('.remove-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                removeFilter(e.target.dataset.filter);
            });
        });
    }

    function filterProperties() {
        let count = 0;
        propertyCards.forEach(card => {
            let show = true;
            const cardLocation = card.dataset.location || '';
            const cardPrice = parseFloat(card.dataset.price) || 0;
            const cardBedrooms = parseInt(card.dataset.bedrooms, 10) || 0;

            if (activeFilters.location && !cardLocation.includes(activeFilters.location)) {
                show = false;
            }

            if (activeFilters.minPrice && cardPrice < activeFilters.minPrice) {
                show = false;
            }
            if (activeFilters.maxPrice && cardPrice > activeFilters.maxPrice) {
                show = false;
            }

            if (activeFilters.bedrooms) {
                const requiredBedrooms = parseInt(activeFilters.bedrooms.replace('+', ''), 10);
                if (activeFilters.bedrooms.includes('+')) {
                    if (cardBedrooms < requiredBedrooms) {
                        show = false;
                    }
                } else {
                    if (cardBedrooms !== parseInt(activeFilters.bedrooms)) {
                        show = false;
                    }
                }
            }

            if (show) {
                card.style.display = 'block';
                count++;
            } else {
                card.style.display = 'none';
            }
        });

        propertyCount.textContent = `${count} properties found`;
        propertyCount.setAttribute('aria-live', 'polite');

        if (count === 0) {
            emptyState.style.display = 'block';
            propertyGrid.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            propertyGrid.style.display = 'flex';
        }
    }

    applyFiltersBtn.addEventListener('click', () => applyFilters());
    clearFiltersBtn.addEventListener('click', () => clearFilters());
    clearFiltersLink.addEventListener('click', (e) => {
        e.preventDefault();
        clearFilters();
    });

    locationSearch.addEventListener('keyup', () => {
        debounce(() => applyFilters(), 300);
    });

    applyFiltersBtnMobile.addEventListener('click', () => {
        applyFilters(true);
        const drawer = bootstrap.Offcanvas.getInstance(document.getElementById('filter-drawer'));
        if (drawer) {
            drawer.hide();
        }
    });
    clearFiltersBtnMobile.addEventListener('click', () => clearFilters(true));

    locationSearchMobile.addEventListener('keyup', () => {
        debounce(() => applyFilters(true), 300);
    });

    [bedroomBtns, bedroomBtnsMobile].forEach(btns => {
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    });

    // Initial load
    applyFilters();
});
