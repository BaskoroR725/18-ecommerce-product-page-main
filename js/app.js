let productCount = 0;
let totalQuantityInCart = 0;

const countDisplay = document.querySelector(".product__quantity");
const btnMinus = document.querySelector('button[aria-label="Decrease quantity"]');
const btnPlus = document.querySelector('button[aria-label="Increase quantity"]');
const btnAddToCart = document.querySelector(".product__add-btn");
const cartCountBadge = document.querySelector(".header__cart-count");
const cartContent = document.querySelector('.cart-modal__content');
const cartBtn = document.querySelector('.header__cart-btn');
const cartModal = document.querySelector('.cart-modal');

// --- FUNCTIONS ---

function updateCounterUI() {
  countDisplay.textContent = productCount;
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

  const btnDelete = cartContent.querySelector('.cart-item__delete');
  btnDelete.addEventListener('click', () => {
    totalQuantityInCart = 0;
    renderCart();
  });
}

// --- EVENT LISTENERS ---

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

btnAddToCart.addEventListener("click", () => {
  if (productCount === 0) return;

  totalQuantityInCart += productCount;
  cartCountBadge.textContent = totalQuantityInCart;
  cartCountBadge.style.display = "block";

  renderCart();

  productCount = 0;
  updateCounterUI();
});

cartBtn.addEventListener('click', () => {
  cartModal.classList.toggle('cart-modal--active');
});

renderCart();