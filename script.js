const buttons = document.querySelectorAll(".cart-btn");

buttons.forEach(btn => {
    const originalText = btn.innerText;

    btn.addEventListener("mouseenter", () => {
        btn.innerText = "add to cart";
    });

    btn.addEventListener("mouseleave", () => {
        btn.innerText = originalText;
    });
});




buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        const card = btn.closest(".card");

        const name = card.querySelector("h3").innerText;
        const price = btn.innerText.replace(/[^\d]/g, "");
        const img = card.querySelector("img").getAttribute("src");

        const product = { name, price, img };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Додано в кошик!");
    });
});


// ВІДОБРАЖЕННЯ КОШИКА
const container = document.getElementById("cart-container");

if (container) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        container.innerHTML = "";

        cart.forEach((item, index) => {
            container.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" width="100">
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.price} грн</p>
                        <button onclick="removeItem(${index})">
                            remove
                        </button>
                    </div>
                </div>
            `;
        });
    }

    window.removeItem = function(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    window.buy = function() {
        alert("Дякуємо за покупку!");
        localStorage.removeItem("cart");
        renderCart();
    }

    renderCart();
}