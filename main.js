/* ==========================================================================
   SRIDHAR PORTFOLIO - MAIN INTERACTIVE & CANVAS SCRIPT
   ========================================================================== */

let currentSlide = 0;
const totalSlides = 6;
let isScrollMode = false;

document.addEventListener('DOMContentLoaded', () => {
    initPortraitCanvas();
    initSlideNavigation();
    initProjectFilters();
    initKeyboardAndTouch();
});

/* ==========================================================================
   1. CANVAS PORTRAIT BACKGROUND REMOVAL (WHITE CUTOUT)
   ========================================================================== */
function initPortraitCanvas() {
    const canvas = document.getElementById('portraitCanvas');
    const fallbackImg = document.getElementById('fallbackImg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = 'assets/sridhar.jpeg';

    img.onload = () => {
        // Set canvas resolution to image native aspect
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Get image pixel data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Process pixels to remove white/light background seamlessly
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Check if pixel is white or near-white (solid studio backdrop)
            const brightness = (r + g + b) / 3;

            // Strict white removal with soft anti-aliased edge threshold
            if (r > 240 && g > 240 && b > 240) {
                data[i + 3] = 0; // Pure transparent
            } else if (r > 215 && g > 215 && b > 215) {
                // Soft edge blending
                const alphaFactor = (240 - brightness) / 25;
                data[i + 3] = Math.floor(Math.max(0, Math.min(255, alphaFactor * 255)));
            }
        }

        // Put transparent pixel data back to canvas
        ctx.putImageData(imageData, 0, 0);
        canvas.style.display = 'block';
    };

    img.onerror = () => {
        console.warn('Canvas background removal fallback used.');
        if (fallbackImg) fallbackImg.style.display = 'block';
        if (canvas) canvas.style.display = 'none';
    };
}

/* ==========================================================================
   2. PRESENTATION SLIDE NAVIGATION
   ========================================================================== */
function initSlideNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const slideIdx = parseInt(btn.getAttribute('data-slide'));
            goToSlide(slideIdx);
        });
    });

    const modeToggle = document.getElementById('viewModeToggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', toggleViewMode);
    }

    updateSlideUI();
}

function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    currentSlide = index;

    // Update active slide class
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        if (i === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    // Update nav links
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((btn, i) => {
        if (i === currentSlide) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    updateSlideUI();
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    } else {
        goToSlide(0); // loop back to first slide
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    } else {
        goToSlide(totalSlides - 1);
    }
}

function updateSlideUI() {
    const currentNumEl = document.getElementById('currentSlideNum');
    const totalNumEl = document.getElementById('totalSlideNum');

    if (currentNumEl) {
        currentNumEl.textContent = String(currentSlide + 1).padStart(2, '0');
    }
    if (totalNumEl) {
        totalNumEl.textContent = String(totalSlides).padStart(2, '0');
    }
}

/* Toggle Deck presentation vs Continuous Scroll view */
function toggleViewMode() {
    isScrollMode = !isScrollMode;
    const body = document.body;
    const modeToggleBtn = document.getElementById('viewModeToggle');

    if (isScrollMode) {
        body.classList.remove('deck-mode');
        body.classList.add('scroll-mode');
        if (modeToggleBtn) {
            modeToggleBtn.innerHTML = '<i class="ri-slideshow-3-line"></i> <span class="btn-label">Deck View</span>';
        }
    } else {
        body.classList.remove('scroll-mode');
        body.classList.add('deck-mode');
        if (modeToggleBtn) {
            modeToggleBtn.innerHTML = '<i class="ri-slideshow-3-line"></i> <span class="btn-label">Scroll View</span>';
        }
        goToSlide(currentSlide);
    }
}

/* ==========================================================================
   3. KEYBOARD & TOUCH CONTROLS
   ========================================================================== */
function initKeyboardAndTouch() {
    // Keyboard arrows navigation
    window.addEventListener('keydown', (e) => {
        if (isScrollMode) return;
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            prevSlide();
        }
    });

    // Touch Swipe Navigation for mobile & touchscreens
    let touchStartX = 0;
    let touchEndX = 0;
    const deckContainer = document.getElementById('deckContainer');

    if (deckContainer) {
        deckContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        deckContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        if (isScrollMode) return;
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
        }
    }
}

/* ==========================================================================
   4. PROJECT FILTERING
   ========================================================================== */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   5. PROJECT MODAL POPUP
   ========================================================================== */
function openProjectModal(title, description, techArray, link) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDescription');
    const modalTechTags = document.getElementById('modalTechTags');
    const modalLink = document.getElementById('modalLiveLink');

    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = description;
    
    if (modalTechTags) {
        modalTechTags.innerHTML = techArray.map(tech => `<span>${tech}</span>`).join('');
    }

    if (modalLink) modalLink.href = link || '#';

    if (modal) modal.classList.add('active');
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) modal.classList.remove('active');
}

// Close modal when clicking outside card
window.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

/* ==========================================================================
   6. CONTACT FORM & UTILITIES
   ========================================================================== */
function copyEmail() {
    const emailText = "sridhar@example.com";
    navigator.clipboard.writeText(emailText).then(() => {
        showToast("Email address copied to clipboard!");
    }).catch(() => {
        showToast("Email: " + emailText);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('nameInput').value;
    showToast(`Thank you, ${name}! Your message has been sent successfully.`);
    document.getElementById('contactForm').reset();
}

function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="ri-checkbox-circle-fill"></i> ${message}`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
