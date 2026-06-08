// Intersection Observer for fade-in animations on scroll
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.fade-in');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Interactive Demo Widget Toggle
    const demoBtn = document.getElementById('demo-btn');
    const demoWidget = document.getElementById('interactive-demo-widget');
    const closeBtn = document.getElementById('close-widget');

    if (demoBtn && demoWidget) {
        demoBtn.addEventListener('click', () => {
            demoWidget.classList.toggle('hide');
            if (!demoWidget.classList.contains('hide')) {
                demoWidget.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    if (closeBtn && demoWidget) {
        closeBtn.addEventListener('click', () => {
            demoWidget.classList.add('hide');
        });
    }
});

// Lost and Found Simulation Logic
function reportLostItem() {
    const itemNameInput = document.getElementById('item-name');
    const itemLocInput = document.getElementById('item-loc');
    const portalFeed = document.getElementById('portal-feed');

    if (!itemNameInput || !itemLocInput || !portalFeed) return;

    const itemName = itemNameInput.value.trim();
    const itemLoc = itemLocInput.value.trim();

    if (!itemName || !itemLoc) return;

    // Create unique ID for the new card
    const cardId = 'user-card-' + Date.now();

    // Create Feed Card HTML
    const feedCard = document.createElement('div');
    feedCard.className = 'feed-card';
    feedCard.id = cardId;
    feedCard.innerHTML = `
        <div class="feed-header">
            <span class="status-badge lost">LOST</span>
            <span class="feed-time">Just Now</span>
        </div>
        <h5>${itemName}</h5>
        <p><strong>Location:</strong> ${itemLoc}</p>
        <div class="sighting-update-area">
            <button class="cta-btn xs" onclick="reportSighting('${itemName.replace(/'/g, "\\'")}', '${cardId}')">Report Sighting</button>
        </div>
    `;

    // Insert at the top of the feed
    portalFeed.insertBefore(feedCard, portalFeed.firstChild);

    // Reset Form
    itemNameInput.value = '';
    itemLocInput.value = '';
}

function reportSighting(itemName, cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;

    // Prompt user for sighting location
    const sightingLoc = prompt(`Where did you see the "${itemName}"?`);
    if (sightingLoc === null) return; // Cancelled
    
    const cleanLocation = sightingLoc.trim() || 'Near Campus Cafeteria';

    // Update Card to show FOUND status
    const statusBadge = card.querySelector('.status-badge');
    if (statusBadge) {
        statusBadge.className = 'status-badge found';
        statusBadge.textContent = 'FOUND / SPOTTED';
    }

    const locationPara = card.querySelector('p');
    if (locationPara) {
        locationPara.innerHTML = `<strong>Spotted Location:</strong> ${cleanLocation}`;
    }

    const updateArea = card.querySelector('.sighting-update-area');
    if (updateArea) {
        updateArea.innerHTML = `<span style="color: var(--accent); font-size: 0.8rem; font-weight: 600;">✓ Sighting Reported</span>`;
    }

    // Dynamic color glow effect on success
    card.style.borderColor = 'var(--accent)';
    card.style.boxShadow = '0 0 15px var(--accent-glow)';
    setTimeout(() => {
        card.style.boxShadow = 'none';
    }, 2000);
}
