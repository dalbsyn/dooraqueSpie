const correctLogin = "AdMiN_teacher"; 
const correctPassword = "/@!?@!!@!@!@!@!@!admin"; 

function Buttom_admin_bw() {
    window.location.href = '../index.html';
}

function validateLogin() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (login === correctLogin && password === correctPassword) {
        window.location.href = 'users-demo-start-set.html';
    } else {
        errorMessage.style.display = "block";
    }
}