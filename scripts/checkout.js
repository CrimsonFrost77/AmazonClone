import {
  cart,
  removeFromCart,
  updateCheckoutCartQuantityDisplay,
  updateQuantity,
  updateDeliveryOption,
  loadFromStorage,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from "http://unpkg.com/dayjs@1.11.10/esm/index.js";

let productsHTML = "";
generateCartContentHTML(productsHTML);
attachEventListeners(); //attachment of event listeners
updateCheckoutCartQuantityDisplay();

//function: generates delivery options HTML
//takes in matchingItem ref to the product in products array and
//cartItem ref to the product in cart array
//returns delivery options HTML as a string
//
//to myself:
//  when we reload the page, the delivery option is not saved
//  and the chosen one unchecks itself and the default one is checked
function generateDeliveryOptionsHTML(matchingItem, cartItem) {
  let deliveryOptionsHTML = "";
  const today = dayjs();

  deliveryOptions.forEach((option) => {
    const deliveryDate = today.add(option.deliveryDays, "day");
    const formattedDate = deliveryDate.format("dddd, MMMM D");
    const formattedPrice =
      option.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(option.priceCents)} -`;

    const isChecked = cartItem.deliveryOptionId === option.id ? "checked" : "";

    deliveryOptionsHTML += `
      <div class="delivery-option">
        <input type="radio" 
          ${isChecked}
          class="delivery-option-input"
          name="delivery-option-${matchingItem.id}"
          data-option-id="${option.id}"
          value="${option.id}">
        <div>
          <div class="delivery-option-date">
            ${formattedDate}
          </div>
          <div class="delivery-option-price">
            ${formattedPrice} Shipping
          </div>
        </div>
      </div>
    `;
  });

  return deliveryOptionsHTML;
}

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

  // Add delivery option change handler
  document.querySelectorAll(".delivery-option-input").forEach((radio) => {
    radio.addEventListener("change", (event) => {
      const productId = event.target
        .getAttribute("name")
        .replace("delivery-option-", "");
      const optionId = event.target.getAttribute("data-option-id");
      updateDeliveryOption(productId, optionId);
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
                ${generateDeliveryOptionsHTML(matchingItem, cartItem)}
              </div>
            </div>
          </div>
  `;
  });

  const cartItemsContainer = document.querySelector(".js-order-summary");

  cartItemsContainer.innerHTML = productsHTML;
}
