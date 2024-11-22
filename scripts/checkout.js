import {
  cart,
  removeFromCart,
  updateCheckoutCartQuantityDisplay,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";
generateCartContentHTML(productsHTML);
attachEventListeners(); //attachment of event listeners
updateCheckoutCartQuantityDisplay();

function attachEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete-quantity-link");
  const updateLinks = document.querySelectorAll(".js-update-quantity-link");
  const saveLinks = document.querySelectorAll(".js-save-quantity-link");

  updateLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      console.log("productId", productId);

      const cartItemContainer = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      cartItemContainer.classList.add("is-editing-quantity");
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      removeFromCart(productId);
    });
  });

  saveLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const cartItemContainer = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      const quantityInput =
        cartItemContainer.querySelector(".js-quantity-input");
      const quantityLabel = cartItemContainer.querySelector(".quantity-label");

      updateQuantity(productId, Number(quantityInput.value));
      quantityLabel.innerText = Number(quantityInput.value);
      cartItemContainer.classList.remove("is-editing-quantity");
      updateCheckoutCartQuantityDisplay();
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
          <div class="cart-item-container js-cart-item-container-${
            cartItem.productId
          }">
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
                  $${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <input type="number" class="quantity-input js-quantity-input" min="1" max="200" value="${
                    cartItem.quantity
                  }"/>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${
                    matchingItem.id
                  }">
                    Update
                  </span>
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${
                    matchingItem.id
                  }">Save</span>
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
                    name="delivery-option-${cartItem.productId}">
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
                    name="delivery-option-${cartItem.productId}">
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
                    name="delivery-option-${cartItem.productId}">
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
