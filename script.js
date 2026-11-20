// تسجيل الدخول
document.getElementById("loginForm").addEventListener("submit", function(event) {

event.preventDefault();

// الانتقال إلى الصفحة الرئيسية
window.location.href = "home.html";
});

function addToCart(name, price) {

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({
    name: name,
    price: price
});

localStorage.setItem("cart", JSON.stringify(cart));

alert("تمت إضافة المنتج للسلة");
}
function showCart() {

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartItems = document.getElementById("cartItems");

cartItems.innerHTML = "";

cart.forEach(function(product) {

    cartItems.innerHTML += `
        <div class="product-card">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">${product.price} ر.س</p>
                <p>الكمية: ${product.quantity || 1}</p>
            </div>
        </div>
    `;

});
}
if (document.getElementById("cartItems")) {
    showCart();
}