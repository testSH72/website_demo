// Initialize cart
let cart = [];

// DOM Elements
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const creditCardInput = document.getElementById("credit-card");
const cartLink = document.getElementById("cart-link");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItemsList = document.getElementById("cart-items-list");
const cartTotal = document.getElementById("cart-total");
const closeCartButton = document.getElementById("close-cart-btn");
const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
const deliveryAddressInput = document.getElementById("delivery-address");



function togglePaymentFields() {
    const selected = document.querySelector('input[name="payment-method"]:checked').value;
    if (selected === 'credit-card') {
      creditCardFields.style.display = 'block';
      deliveryAddressFields.style.display = 'none';
      creditCardInput.required = true;
      deliveryAddressInput.required = false;
    } else {
      creditCardFields.style.display = 'none';
      deliveryAddressFields.style.display = 'block';
      creditCardInput.required = false;
      deliveryAddressInput.required = true;
    }
  }

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

document.addEventListener('DOMContentLoaded', () => {
    const cartLink        = document.getElementById('cart-link');
    const cartModal       = document.getElementById('cart-modal');
    const closeCartButton = document.getElementById('close-cart-btn');
  
    // Open
    cartLink.addEventListener('click', e => {
      e.preventDefault();
      
      updateCart();
      cartModal.classList.add('active');
    });

    // Close via button
    closeCartButton.addEventListener('click', () => {
      cartModal.classList.remove('active');
    });
  
    // Close via backdrop
    cartModal.addEventListener('click', e => {
      if (e.target === cartModal) {
        cartModal.classList.remove('active');
      }
    });
  });
  

  

// Luhn Algorithm to validate the credit card number
function isValidCreditCard(cardNumber) {
    const cardNumberArray = cardNumber.replace(/\D/g, '').split('').reverse();
    let sum = 0;
    let shouldDouble = false;

    for (let i = 0; i < cardNumberArray.length; i++) {
        let digit = parseInt(cardNumberArray[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

// Confirm Order Button
const confirmOrderBtn = document.getElementById("confirm-order-btn");
const confirmationPopup = document.getElementById("order-confirmation");

confirmOrderBtn.addEventListener('click', function () {
    // Check if cart is empty
    if (cart.length === 0) {
        alert("Votre Panier est vide!");
        return;
    }

    // Validate first name and last name
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    if (!firstName || !lastName) {
        alert("Veuillez saisir votre prénom et votre nom.");
        return;
    }

    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    if (paymentMethod === 'credit-card') {
      // 3a) Credit-card => validate number
      const cc = creditCardInput.value.trim();
      if (!cc || !isValidCreditCard(cc)) {
        alert("Veuillez saisir un numéro de carte de crédit valide.");
        return;
      }
    }

    // Show confirmation popup
    confirmationPopup.style.display = 'flex';
    cartModal.classList.remove('active'); 

    // Reset cart
    cart = [];
    updateCart();
    
    // Auto close confirmation after 3 seconds
    setTimeout(() => {
        confirmationPopup.style.display = 'none';
        resetCartFieldsOnly();
    }, 3000);

    
});

// Contact form submission handler
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


function resetCartFieldsOnly() {
    // Reset input fields
    firstNameInput.value = "";
    lastNameInput.value = "";
    creditCardInput.value = "";
    
    if (deliveryAddressInput) {
        deliveryAddressInput.value = "";
    }

    // Reset payment method to credit card
    const creditCardRadio = document.querySelector('input[value="credit-card"]');
    creditCardRadio.checked = true;

    // Force triggering the 'change' event to ensure togglePaymentFields reacts
    creditCardRadio.dispatchEvent(new Event('change', { bubbles: true }));

    // Reset label styling
    document.querySelectorAll('.radio-group label').forEach(label => label.classList.remove("selected"));
    creditCardRadio.closest("label").classList.add("selected");
}






  
