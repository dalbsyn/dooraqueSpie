const correctLogin = "a";
const correctPassword = "a";

// Возврат на главный экран
function Buttom_admin_bw() {
    window.location.href = '../index.html';
}

// Проверка логина и пароля
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

// Управление пользователями
document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("user-list");
    const userCountElement = document.getElementById("user-count");
    let userCount = 0;

    // Добавление пользователя в список
    window.addUser = function () {
        const userNameInput = document.getElementById("user-name");
        const userName = userNameInput.value.trim();

        if (userName) {
            const listItem = document.createElement("li");
            listItem.textContent = userName;
            listItem.onclick = () => startScreenShare(userName);
            userList.appendChild(listItem);

            userCount++;
            userCountElement.textContent = userCount;

            userNameInput.value = '';
        } else {
            alert("Введите имя пользователя!");
        }
    };

    // Начало демонстрации экрана
    async function startScreenShare(userName) {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true
            });

            alert(`Демонстрация экрана началась для пользователя: ${userName}`);
            
            // Остановка демонстрации при завершении
            stream.getVideoTracks()[0].onended = () => {
                alert("Демонстрация экрана завершена.");
            };
        } catch (err) {
            console.error("Ошибка при попытке начать демонстрацию экрана:", err);
            alert("Не удалось начать демонстрацию экрана. Разрешение отклонено или произошла ошибка.");
        }
    }

    // Начать тест
    window.startTest = function () {
        alert("Тест начат!");
    };

    // Открыть настройки
    window.openSettings = function () {
        alert("Открыть настройки");
    };
});