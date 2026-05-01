const buttons = document.querySelectorAll(".cart-btn");

buttons.forEach(btn => {
    const originalText = btn.innerText; // запам'ятали текст

    btn.addEventListener("mouseenter", () => {
        btn.innerText = "add to cart";
    });

    btn.addEventListener("mouseleave", () => {
        btn.innerText = originalText; // повернули свій текст
    });
});