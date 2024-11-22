// Purpose: To store the cart data and functions to add and remove items from the cart.
export const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add the product matching productId to the cart
export function addToCart(productId) {
  const selectElement = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const matchingItem = findCartItem(productId);
  // cart.forEach((cartItem) => {
  //   if (cartItem.productId === productId) {
  //     matchingItem = cartItem;
  //     return;
  //   }
  // });

  if (matchingItem) {
    matchingItem.quantity += Number(selectElement.value);
  } else {
    cart.push({
      productId,
      quantity: Number(selectElement.value),
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

//function: finds Item in cart with matching productId
// takes : productId
//returns : reference to matching Item with the productId
export function findCartItem(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
      return;
    }
  });
  return matchingItem;
}

// Remove the product matching productId from the cart
export function removeFromCart(productId) {
  cart.forEach((cartItem, index) => {
    if (cartItem.productId === productId) {
      cart.splice(index, 1);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
    }
  });
  updateCheckoutCartQuantityDisplay();
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCartQuantityTotal() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateCheckoutCartQuantityDisplay() {
  document.querySelector(".js-return-home-link-quantity").innerText =
    getCartQuantityTotal();
}

export function updateQuantity(productId, newQuantity) {
  const cartItem = findCartItem(productId);
  if (cartItem) {
    cartItem.quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
