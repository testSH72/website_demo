// Initialize cart
let cart = [];

// DOM Elements
const cartLink = document.getElementById("cart-link");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItemsList = document.getElementById("cart-items-list");
const cartTotal = document.getElementById("cart-total");
const closeCartButton = document.getElementById("close-cart-btn");
const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');

// Add to Cart Functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const product = button.getAttribute('data-product');
        const price = parseFloat(button.getAttribute('data-price'));
        cart.push({ product, price });
        updateCart();
    });
});

// Update Cart Display
function updateCart() {
    cartCount.textContent = cart.length;
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.product} - ${item.price.toFixed(2)} TD`;
        cartItemsList.appendChild(listItem);
        total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
}

// Show Cart Modal
cartLink.addEventListener('click', function () {
    cartModal.style.display = 'flex';
});

// Hide Cart Modal
closeCartButton.addEventListener('click', function () {
    cartModal.style.display = 'none';
});

// Hide Cart Modal when clicking outside the modal content
window.addEventListener('click', function (e) {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

const confirmOrderBtn = document.getElementById("confirm-order-btn");
const confirmationPopup = document.getElementById("order-confirmation");

confirmOrderBtn.addEventListener('click', function () {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    confirmationPopup.style.display = 'flex';
    cartModal.style.display = 'none';

    // Reset cart
    cart = [];
    updateCart();

    // Auto close confirmation after 3 seconds
    setTimeout(() => {
        confirmationPopup.style.display = 'none';
    }, 3000);
});

  document.querySelector(".contact-section form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from actually submitting

    // Show the confirmation popup
    const popup = document.getElementById("contact-confirmation");
    popup.style.display = "flex";

    // Optional: Hide it after a few seconds
    setTimeout(() => {
      popup.style.display = "none";
    }, 3000);

    // Reset the form fields
    this.reset();
  });