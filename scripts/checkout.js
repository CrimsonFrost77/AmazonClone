import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";
generateCartContentHTML(productsHTML);
attachEventListeners(); // Initial attachment

function attachEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete-quantity-link");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      removeFromCart(productId);

      // Reset productsHTML and regenerate content
      productsHTML = "";
      generateCartContentHTML(productsHTML);

      // Reattach event listeners to new buttons
      attachEventListeners();
    });
  });
}

//generate cart content HTML
//takes in the initial products HTML string
function generateCartContentHTML(productsHTML) {
  cart.forEach((cartItem) => {
    let matchingItem;
    //find the cartItem product in products array
    products.forEach((product) => {
      if (product.id === cartItem.productId) {
        matchingItem = product;
        return;
      }
    });

    //generate products HTML for checkout page
    productsHTML += `
          <div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${(matchingItem.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id="${
                    cartItem.productId
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
  });

  const cartItemsContainer = document.querySelector(".js-order-summary");

  cartItemsContainer.innerHTML = productsHTML;
}
