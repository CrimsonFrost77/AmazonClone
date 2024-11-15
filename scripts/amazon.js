import { cart } from "../data/cart.js";

const productsGrid = document.querySelector(".js-products-grid");

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

          <div class="product-price">$${(product.priceCents / 100).toFixed(
            2
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

//cart functionality
const addToCartButtons = document.querySelectorAll(".js-add-to-cart");
let addedMessageTimeoutID;

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    //get product id value from the button's data-product-id attribute
    const { productId } = button.dataset;

    //getting the quantity in the select element
    //and the added to cart element
    //using the product id taken from the button element
    const selectElement = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const addedElement = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

    let matchingItem;
    cart.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
        return;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += Number(selectElement.value);
    } else {
      cart.push({
        productId,
        quantity: Number(selectElement.value),
      });
    }

    //show added to cart message for 2 seconds
    addedElement.classList.add("added-to-cart-visible");
    if (addedMessageTimeoutID) {
      clearTimeout(addedMessageTimeoutID);
    }
    addedMessageTimeoutID = setTimeout(() => {
      addedElement.classList.remove("added-to-cart-visible");
    }, 2000);

    //update cart quantity display top right
    const cartQuantityDisplay = document.querySelector(".js-cart-quantity");
    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    cartQuantityDisplay.textContent = cartQuantity;
  });
});
