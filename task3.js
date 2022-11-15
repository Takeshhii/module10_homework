/* Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.

Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:

При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.

*/

//const wsUri = "wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self";

// Ссылка на веб сокет

const wsUri = "wss://echo-ws-service.herokuapp.com";

// Находим элементы в html

const output = document.getElementById("output");
const btnSend = document.querySelector('.j-btn-send');
const inp = document.querySelector('.inp');
const btnGeo = document.querySelector('.j-btn-geo');

// Обьявляем переменные 1- вебсокет, 2- костыль для не вывода ответа от сервера

let websocket;
let globalNotSend = false;

// Функция вывода сообщений в окно output

function writeToScreen(message, isGeo = true, position = "start") {
    if (!isGeo){
        let pre = document.createElement("p");
        pre.style.wordWrap = "break-word";
        pre.innerHTML = message;
        if (position == "end") {
            pre.className  = "ptr";
        }
        output.appendChild(pre);
    }
}

// Описываем фунцию, которая создает экземпляр для вебсокета и описывает стандартные 4 метода

function openWSS(){
    //console.log("it's working!");
    websocket = new WebSocket(wsUri);

    websocket.onopen = function(evt) {
        writeToScreen("Приятного общения", false);
    };
    websocket.onclose = function(evt) {
        writeToScreen("DISCONNECTED");
        websocket = null;
    };
    websocket.onmessage = function(evt) {
        writeToScreen(
            '<span style="color: green;"> It:' + evt.data+'</span>'
            , globalNotSend
        );
        globalNotSend = false;
    };
    websocket.onerror = function(evt) {
        writeToScreen(
            '<span style="color: red;">ERROR:</span> ' + evt.data
        );
    };
};

// Событие для кнопки Отправить, в котором выполняется отправка сообщения чере вебсокет

btnSend.addEventListener('click', () => {
    if(websocket != undefined){
        const message = inp.value;
        writeToScreen("Me:" + message, false, "end");
        websocket.send(message);
    } else {
        openWSS();
    }
});

// При загрузке страницы вызываем функцию, которая открывает соединение по вебсокету

window.onload = openWSS;

// Кнопка Гео-локации, в которой  мы запрашиваем  кординаты и отпровляем на сервер вебсокета

btnGeo.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            console.log(coords.latitude, coords.longitude);
            const message = `https://www.openstreetmap.org/search?query=${coords.latitude}%20${coords.longitude}`;
            if(websocket != undefined){
                globalNotSend = true;
                writeToScreen(`<a href=${message}>Гео-Локация</a>`
                    , false
                    , "end");
                websocket.send(message);
            }
        });
    } else {
        openWSS();
    }
});
