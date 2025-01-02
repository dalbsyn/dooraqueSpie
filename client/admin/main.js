const correctLogin = "a";
const correctPassword = "a";

// Возврат на главный экран
function Buttom_admin_bw() {
    window.location.href = '../index.html';
}
function vshod(){
    window.location.href='vshod.html';
}
function nazad(){
    window.location.href='../index.html';
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
const userList = document.getElementById("userlist");
const userCountElement = document.getElementById("user-count");
let userCount = 0;

function addUser() {
    const userNameInput = document.getElementById("user-name");
    const userName = userNameInput.value.trim();
    if (userName) {
        // Создаем элемент списка
        const listItem = document.createElement("li");

        // Создаем кнопку
        const button = document.createElement("button");
        button.textContent = userName;
        button.classList.add("user-button");

        // Добавляем кнопку в список
        listItem.appendChild(button);

        // Добавляем элемент в userlist
        userList.appendChild(listItem);

        // Очищаем поле ввода
        userNameInput.value = '';

        // Увеличиваем счетчик
        userCount++;

        // Обновляем отображение количества пользователей
        userCountElement.textContent = userCount;

        // Добавляем обработчик для запуска демонстрации экрана при клике на кнопку
        button.addEventListener('click', () => {
            const video = document.querySelector('video');
            navigator.mediaDevices.getDisplayMedia({
                audio: false,
                video: {
                    width: 320,
                    height: 240,
                    frameRate: 30
                }
            }).then(stream => {
                video.srcObject = stream;
                video.onloadedmetadata = (e) => video.play();
            }).catch(e => console.log(e));
        });
    } else {
        if (errorMessage) {
            errorMessage.style.display = 'block';
        }
    }
}

const { ipcRenderer } = require('electron');

// Открываем всплывающее окно по нажатию на кнопку
document.getElementById('open-settings').addEventListener('click', () => {
    ipcRenderer.send('open-popup');
});
