import { addToCart, getCartQuantityTotal } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

const productsGrid = document.querySelector(".js-products-grid");

updateCartQuantityDisplay();

//generate products HTML from the products array in products.js
let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${formatCurrency(
            product.priceCents
          )}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            product.id
          }" >Add to Cart</button>
        </div>`;
});

productsGrid.innerHTML = productsHTML;

//update cart quantity display top right
function updateCartQuantityDisplay() {
  const cartQuantityDisplay = document.querySelector(".js-cart-quantity");
  const cartQuantity = getCartQuantityTotal();
  cartQuantityDisplay.textContent = cartQuantity;
}

function updateAddedElement(productId) {
  const addedElement = document.querySelector(`.js-added-to-cart-${productId}`);

  // Clear existing timeout for this specific product
  if (addedMessageTimeoutIDs[productId]) {
    clearTimeout(addedMessageTimeoutIDs[productId]);
  }

  addedElement.classList.add("added-to-cart-visible");

  // Store new timeout for this product
  addedMessageTimeoutIDs[productId] = setTimeout(() => {
    addedElement.classList.remove("added-to-cart-visible");
  }, 2000);
}

//cart functionality
const addToCartButtons = document.querySelectorAll(".js-add-to-cart");
// for storing timeouts for each product
const addedMessageTimeoutIDs = {};

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    //get product id value from the button's data-product-id attribute
    const { productId } = button.dataset;

    addToCart(productId);

    updateAddedElement(productId);

    updateCartQuantityDisplay();
  });
});
