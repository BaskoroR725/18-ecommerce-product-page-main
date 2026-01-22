// ==========================================
// 1. STATE & SELECTORS
// ==========================================
let productCount = 0;
let totalQuantityInCart = 0;
let currentImageIndex = 1;

// Menu Selectors
const menuToggle = document.querySelector('.header__toggle');
const primaryNav = document.getElementById('primary-navigation');
const btnCloseMenu = document.getElementById('menu-close');
const nav = document.querySelector('.header__nav');

// Gallery Selectors
const mainImageOnPage = document.getElementById('main-product-image');
const thumbnails = document.querySelectorAll('.gallery__thumbnail');
const btnNext = document.querySelector('.gallery__btn--next');
const btnPrev = document.querySelector('.gallery__btn--prev');

// Cart & Counter Selectors
const countDisplay = document.querySelector(".product__quantity");
const btnMinus = document.querySelector('button[aria-label="Decrease quantity"]');
const btnPlus = document.querySelector('button[aria-label="Increase quantity"]');
const btnAddToCart = document.querySelector(".product__add-btn");
const cartCountBadge = document.querySelector(".header__cart-count");
const cartContent = document.querySelector('.cart-modal__content');
const cartBtn = document.querySelector('.header__cart-btn');
const cartModal = document.querySelector('.cart-modal');

// Lightbox Selectors
const lightbox = document.getElementById('product-lightbox');
const btnCloseLightbox = document.querySelector('.lightbox__close');
const lightboxMainImg = document.getElementById('lightbox-main-img');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxPrev = document.getElementById('lightbox-prev');

// ==========================================
// 2. CORE FUNCTIONS (LOGIC)
// ==========================================


function updateCounterUI() {
  countDisplay.textContent = productCount;
}

function updateGallery(index, targetImgElement) {
  if (!targetImgElement) return;
  currentImageIndex = index;
  targetImgElement.src = `images/image-product-${currentImageIndex}.jpg`;
  
  // Update Thumbnail Highlight 
  if (targetImgElement === mainImageOnPage) {
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('gallery__thumbnail--active', i === currentImageIndex - 1);
    });
  }
}


function renderCart() {
  if (totalQuantityInCart === 0) {
    cartContent.innerHTML = `<p class="cart-modal__empty">Your cart is empty.</p>`;
    cartCountBadge.style.display = 'none';
    return;
  }

  const totalPrice = (125 * totalQuantityInCart).toFixed(2);
  
  
  cartContent.innerHTML = `
    <div class="cart-item">
      <img src="images/image-product-1-thumbnail.jpg" alt="" class="cart-item__img">
      <div class="cart-item__details">
        <p class="cart-item__title">Fall Limited Edition Sneakers</p>
        <p class="cart-item__price">$125.00 x ${totalQuantityInCart} <strong>$${totalPrice}</strong></p>
      </div>
      <button class="cart-item__delete" aria-label="Remove item">
        <img src="images/icon-delete.svg" alt="">
      </button>
    </div>
    <button class="cart-item__checkout">Checkout</button>
  `;

  
  cartContent.querySelector('.cart-item__delete').addEventListener('click', () => {
    totalQuantityInCart = 0;
    renderCart();
  });
}

// ==========================================
// 3. EVENT LISTENERS
// ==========================================

// --- Menu Mobile ---
menuToggle?.addEventListener('click', () => {
  console.log("Menu Hamburger Diklik");
  primaryNav.classList.toggle('header__nav--active');

  document.body.style.overflow = 'hidden';

  const isExpanded = primaryNav.classList.contains('header__nav--active');
  menuToggle.setAttribute('aria-expanded', isExpanded);
});

// Menu close
btnCloseMenu?.addEventListener('click', () => {
  primaryNav.classList.remove('header__nav--active');
  document.body.style.overflow = 'auto';
});

// --- Counter (Plus/Minus) ---
btnPlus.addEventListener("click", () => {
  productCount++;
  updateCounterUI();
});

btnMinus.addEventListener("click", () => {
  if (productCount > 0) {
    productCount--;
    updateCounterUI();
  }
});

// --- Add To Cart ---
btnAddToCart.addEventListener("click", () => {
  if (productCount === 0) return;
  
  totalQuantityInCart += productCount;
  cartCountBadge.textContent = totalQuantityInCart;
  cartCountBadge.style.display = "block";
  
  renderCart();
  
  // Reset counter after add to cart
  productCount = 0;
  updateCounterUI();
});

// --- Cart Modal Toggle ---
cartBtn.addEventListener('click', () => {
  cartModal.classList.toggle('cart-modal--active');
});

// --- Gallery Navigation (Mobile & Thumbnails) ---
btnNext?.addEventListener('click', () => {
  let next = currentImageIndex >= 4 ? 1 : currentImageIndex + 1;
  updateGallery(next, mainImageOnPage);
});

btnPrev?.addEventListener('click', () => {
  let prev = currentImageIndex <= 1 ? 4 : currentImageIndex - 1;
  updateGallery(prev, mainImageOnPage);
});

thumbnails.forEach((thumb, i) => {
  thumb.addEventListener('click', () => {
    updateGallery(i + 1, mainImageOnPage);
  });
});

// --- Lightbox Control ---
mainImageOnPage?.addEventListener('click', () => {
  if (window.innerWidth >= 768 && lightbox) {
    console.log("Membuka Lightbox");
    lightbox.classList.add('is-open');
    updateGallery(currentImageIndex, lightboxMainImg);
  }
});

btnCloseLightbox?.addEventListener('click', () => {
  lightbox.classList.remove('is-open');
});

lightboxNext?.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log("Lightbox Next Diklik");
  let next = currentImageIndex >= 4 ? 1 : currentImageIndex + 1;
  updateGallery(next, lightboxMainImg);
});

lightboxPrev?.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log("Lightbox Prev Diklik");
  let prev = currentImageIndex <= 1 ? 4 : currentImageIndex - 1;
  updateGallery(prev, lightboxMainImg);
});


// Initial Load
renderCart();