const { desktopCapturer } = require('electron');
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
            listItem.onclick = () => startScreenShare(userName, listItem);
            userList.appendChild(listItem);
            userCount++;
            userCountElement.textContent = userCount;
            userNameInput.value = '';
        } else {
            alert("Введите имя пользователя!");
        }
    };

    // Начало демонстрации экрана
    const { desktopCapturer } = require('electron');

    async function startScreenShare() {
        try {
            const sources = await desktopCapturer.getSources({ types: ['screen'] });
        
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: sources[0].id
                    }
                }
            });

            console.log('Демонстрация экрана началась!');
        } catch (err) {
            console.error('Ошибка при демонстрации экрана:', err);
            alert('Не удалось начать демонстрацию экрана. Проверьте настройки и разрешения.');
        }
    }
});