// Main JavaScript for Haraka Restaurant Website

document.addEventListener('DOMContentLoaded', () => {

    // 1. Menu Category Filtering
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 2. Admin Modal Functionality for Daily Offers
    const offerModal = document.getElementById('offerModal');
    const addOfferBtn = document.getElementById('addOfferBtn');
    const closeModal = document.querySelector('.close-modal');
    const addOfferForm = document.getElementById('addOfferForm');
    const offersGrid = document.getElementById('offersGrid');

    addOfferBtn.addEventListener('click', () => {
        offerModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        offerModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === offerModal) {
            offerModal.style.display = 'none';
        }
    });

    // Handle Adding New Offer
    addOfferForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('offerTitle').value;
        const desc = document.getElementById('offerDesc').value;
        const oldPrice = document.getElementById('offerOldPrice').value;
        const newPrice = document.getElementById('offerNewPrice').value;
        let img = document.getElementById('offerImg').value;

        if (!img) {
            img = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80';
        }

        // Create new offer card HTML
        const newOfferCard = document.createElement('div');
        newOfferCard.className = 'offer-card';
        newOfferCard.innerHTML = `
            <span class="discount-tag">عرض خاص</span>
            <div class="offer-img">
                <img src="${img}" alt="${title}">
            </div>
            <div class="offer-info">
                <h3>${title}</h3>
                <p>${desc}</p>
                <div class="offer-price">
                    <span class="old-price">${oldPrice} ج.م</span>
                    <span class="new-price">${newPrice} ج.م</span>
                </div>
                <a href="https://wa.me/201111111112?text=أريد%20طلب%20${encodeURIComponent(title)}" class="btn btn-sm-order" target="_blank"><i class="fa-brands fa-whatsapp"></i> اطلب العرض</a>
            </div>
        `;

        // Add to grid
        offersGrid.prepend(newOfferCard);

        // Reset and close
        addOfferForm.reset();
        offerModal.style.display = 'none';
        alert('تمت إضافة العرض الجديد بنجاح إلى قسم عروض اليوم!');
    });
});
