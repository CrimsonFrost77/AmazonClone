export const cart = JSON.parse(localStorage.getItem("cart")) || [];

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
