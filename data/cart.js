// Purpose: To store the cart data and functions to add and remove items from the cart.
export const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add the product matching productId to the cart
export function addToCart(productId) {
  const selectElement = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
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
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Remove the product matching productId from the cart
export function removeFromCart(productId) {
  cart.forEach((cartItem, index) => {
    if (cartItem.productId === productId) {
      cart.splice(index, 1);
    }
  });
  localStorage.setItem("cart", JSON.stringify(cart));
}
