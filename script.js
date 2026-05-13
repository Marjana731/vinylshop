let products = [];
let cart =
    JSON.parse(localStorage.getItem("cart")) || [];



async function loadProducts() {

    const response =
        await fetch("store_db.json");

    products =
        await response.json();

    connectButtons();
}



function connectButtons() {

    const buttons =
        document.querySelectorAll(".cart-btn");


    buttons.forEach((btn, index) => {

        const originalText =
            btn.innerText;


        btn.addEventListener("mouseenter", () => {

            btn.innerText =
                "add to cart";
        });


        btn.addEventListener("mouseleave", () => {

            btn.innerText =
                originalText;
        });


        btn.addEventListener("click", () => {

            addToCart(products[index].id);
        });
    });
}



function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);


    const existingProduct =
        cart.find(item => item.id === productId);


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    saveJsonCookie(
        "cart",
        cart,
        3600 * 24 * 7
    );


    alert("Added to cart!");

    renderCart();
}



const container =
    document.getElementById("cart-container");



function renderCart() {

    if (!container) return;

    container.innerHTML = "";

    let total = 0;


    cart.forEach((item, index) => {

        total +=
            item.price * item.quantity;


        container.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    width="100"
                >

                <div>

                    <h3>${item.title}</h3>

                    <p>
                        ${item.price} грн
                    </p>

                    <p>
                        Quantity:
                        ${item.quantity}
                    </p>

                    <button
                        onclick="removeItem(${index})"
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;
    });


    const totalPrice =
        document.getElementById("total-price");


    if (totalPrice) {

        totalPrice.innerText =
            `Total amount: ${total} грн`;
    }
}



window.removeItem = function(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();
}



window.buy = function() {

    alert("Thank you for your purchase!");

    cart = [];

    localStorage.removeItem("cart");

    renderCart();
}



function saveJsonCookie(name, value, seconds) {

    const json =
        JSON.stringify(value);


    document.cookie =
        `${name}=${encodeURIComponent(json)};
        max-age=${seconds};
        path=/`;
}



function getJsonCookie(name) {

    const cookies =
        document.cookie.split("; ");


    for (let cookie of cookies) {

        const [key, value] =
            cookie.split("=");


        if (key === name) {

            return JSON.parse(
                decodeURIComponent(value)
            );
        }
    }

    return null;
}



loadProducts();

renderCart();



