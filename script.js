// Get the saved cart from localStorage,
//  or create an empty cart if no data exists.
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// Check each product and set default values for quantity and image if they are missing.
cart = cart.map(function(product) {
  return {
    ...product,
    quantity: product.quantity || 1,
    image: product.image || ""
  };
});

// Save the cart in localStorage and update the cart display.
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

// Add a product to the cart.
function addToCart(name, price, image) {
  // Check if the product already exists in the cart.
  let product = cart.find(function(item) {
    return item.name === name;
  });

  if (product) {
    product.quantity++;
    product.image = image;
  } else {
    cart.push({
      name: name,
      price: Number(price),
      image: image,
      quantity: 1
    });}
  // Save the cart and show a confirmation message.
  saveCart();
  showMessage("تمت إضافة المنتج إلى السلة");
}

// Show a message to the user and hide it after 3 seconds.
function showMessage(message) {
    // Get the message box.
    let messageBox = document.getElementById("message");
    if (!messageBox) return;
    // Display the message.
    messageBox.textContent = message;
    messageBox.style.opacity = "1";
    // Hide the message after 3 seconds.
    setTimeout(function() {
        messageBox.style.opacity = "0";
    }, 3000);
}

// Show all cart products on the page.
function showCart() {
  let cartItems = document.getElementById("cartItems");
  // Stop if the cart area is not found.
  if (!cartItems) return;

  // Clear the old products before showing them again.
  cartItems.innerHTML = "";

  // Show a message if the cart is empty.
  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="empty-cart">سلتك فارغة  اختاري منتجاتك من صفحة المنتجات</p>';
  }

  // Show each product in the cart.
  cart.forEach(function(product, index) {
    cartItems.innerHTML += `
      <div class="product-card">
        <img
          src="${product.image}"
          alt="${product.name}"
          style="width: 120px; height: 120px; object-fit: cover; border-radius: 12px;"
        >
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="price">${product.price} ر.س</p>
          <!-- Buttons to change the product quantity -->
          <div class="quantity">
            <button onclick="increase(${index})">+</button>
            <span>${product.quantity}</span>
            <button onclick="decrease(${index})">−</button>
          </div>
          <!-- Show the total price  -->
          <p>المجموع: ${product.price * product.quantity} ر.س</p>
          <!-- Button to remove the product  -->
          <button class="remove-btn" onclick="removeProduct(${index})">
            حذف المنتج
          </button>
        </div>
      </div>
    `;
  });
  // Update the final cart total.
  updateTotal();
}

// Increase Quantity
function increase(index) {
  cart[index].quantity++;
  saveCart();
}
// Decrease Quantity
function decrease(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
}
// Remove Product
function removeProduct(index) {
  cart.splice(index, 1);
  saveCart();
}

// Store the discount rate.
let discountRate = 0;

// Calculate and display the cart total.
function updateTotal() {

  let subtotal = 0;
  cart.forEach(function(product) {
    subtotal += product.price * product.quantity;
  });
  let discount = subtotal * discountRate;
  let total = subtotal - discount;
  let subtotalElement = document.getElementById("subtotal");
  let discountElement = document.getElementById("discount");
  let totalElement = document.getElementById("total");
  if (subtotalElement) {
    subtotalElement.textContent = subtotal.toFixed(2) + " ر.س";
  }
  if (discountElement) {
    discountElement.textContent = discount.toFixed(2) + " ر.س";
  }
  if (totalElement) {
    totalElement.textContent = total.toFixed(2) + " ر.س";
  }}
// Apply Discount Coupon
function applyCoupon() {

  let code = document.getElementById("couponCode").value;
  let message = document.getElementById("couponMessage");
  if (code.trim().toUpperCase() === "ITDEPT10") {
    discountRate = 0.10;
    message.textContent = "تم تطبيق الخصم بنجاح ";
    message.style.color = "green";
  } else {
    discountRate = 0;
    message.textContent = "كود الخصم غير صحيح";
    message.style.color = "red";
  }
  updateTotal();
}
// Complete the order and calculate the final price.
function checkout() {

    // Check if the cart is empty.
    if (cart.length === 0) {
        showMessage("السلة فارغة! أضف منتجات أولاً");
        return;
    }
    // Get the selected payment method.
    let payment = document.querySelector('input[name="payment"]:checked');
    // Calculate the total price of all products.
    let total = 0;
    cart.forEach(function(product) {
        total += product.price * product.quantity;
    });
    // Apply the discount to the total price.
    total = total - (total * discountRate);
    // Show a message after choosing the payment method.
    if (payment.value === "applepay") {
        showMessage("تم اتمام طلبك بنجاح, شكرا لاختيارك Flora");
    } else if (payment.value === "cash") {
        showMessage("تم اتمام طلبك بنجاح, شكرا لاختيارك Flora");
    }
    // Clear the cart and save the changes.
    cart = [];
    saveCart();
    // Send the order total to the PHP page after 3 seconds.
    setTimeout(function() {
        window.location.href = "php/orders.php?total=" + total;
    }, 3000);
}
// Initialize Cart
showCart();