// Load Cart from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart = cart.map(function(product) {
  return {
    ...product,
    quantity: product.quantity || 1,
    image: product.image || ""
  };
});

// Save Cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

// Add Product to Cart
function addToCart(name, price, image) {
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
    });
  }

  saveCart();
  alert("تمت إضافة المنتج إلى السلة");
}

// Display Cart Products
function showCart() {
  let cartItems = document.getElementById("cartItems");

  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="empty-cart">سلتك فارغة  اختاري منتجاتك من صفحة المنتجات</p>';
  }

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

          <div class="quantity">
            <button onclick="increase(${index})">+</button>
            <span>${product.quantity}</span>
            <button onclick="decrease(${index})">−</button>
          </div>

          <p>المجموع: ${product.price * product.quantity} ر.س</p>

          <button class="remove-btn" onclick="removeProduct(${index})">
            حذف المنتج
          </button>
        </div>
      </div>
    `;
  });

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

// Calculate Total
let discountRate = 0;

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
  }
}

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

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("السلة فارغة! أضيفي منتجات أولاً");
  } else {
    alert("تم تجهيز طلبك بنجاح  .. شكرا لتسوقك معنا!");
  }
}

// Initialize Cart
showCart();
