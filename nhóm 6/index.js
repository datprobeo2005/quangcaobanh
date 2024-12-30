const modal = document.getElementById("myModal");
const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");

function showModal() {
    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
}

registerLink.addEventListener("click", () => {
    wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
    wrapper.classList.remove("active");
});

function redirectToGmail() {
    const emailInput = document.querySelector('#registerModal .input-box input[type="email"]');
    const email = emailInput.value.trim();
    if (email) {
        const gmailLink = `https://mail.google.com/mail/u/0/#inbox=${encodeURIComponent(email)}`;
        window.open(gmailLink, '_blank');
    } else {
        alert('Vui lòng nhập email hợp lệ trước khi đăng ký.');
    }
}
