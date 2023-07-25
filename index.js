"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=14da9090c8517409168e96826bf96663&lang=ca';
const header = {
    method: 'GET',
    // Headers: {
    //     // 'Accept': 'application/json'
    // }
};
const showWheater = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield fetch(weatherUrl);
        let message = yield response.json();
        let weatherMessage = document.getElementById('weather');
        weatherMessage.innerHTML = `El temps d'avui a Barcelona: ${message.weather[0].description}`;
    }
    catch (error) {
        console.error(error);
    }
});
showWheater();
//chistes de dadJoke
const dadJokeUrl = 'https://icanhazdadjoke.com/';
const optionsDadJoke = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};
//chistes de otra api
const chuckJokeUrl = 'https://api.chucknorris.io/jokes/random';
const optionsChukJoke = {
    method: 'GET',
    //no hace falta el get realmente
};
const reportAcudits = []; //guardamos array de objetos.
const reportChuckAcudits = [];
let selectedScore = 0; //guardamos el número seleccionado de los botones antes de enviarlo.
let lastJoke = true;
const processTheJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (randomNum() === 1) { //la primera API
            dadFunction();
        }
        else { //para la segunda API
            chuckFunction();
        }
    }
    catch (error) {
        console.error(error);
    }
});
//dadJoke function
function dadFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(dadJokeUrl, optionsDadJoke);
        let message = yield response.json(); //lo pasamos a json
        let joke = document.getElementById('jokeMessage');
        joke.innerHTML = `" ${message.joke} "`; //imprimimos el mensaje por pantalla
        reportAcudits.push(message);
        selectedScore = 0; // es para reiniciar el valaor de la puntuación seleccionada.  
        lastJoke = true;
        const valorationElement = document.querySelector(".visibleValoration"); //accedemos a los votones de valoración
        if (valorationElement) {
            valorationElement.style.display = "block"; //hacemos visible los botones de valoración
        }
    });
}
//chuck function
function chuckFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(chuckJokeUrl);
        let message = yield response.json(); //lo pasamos a json
        let joke = document.getElementById('jokeMessage');
        joke.innerHTML = `" ${message.value} "`; //imprimimos el mensaje por pantalla
        reportChuckAcudits.push(message);
        selectedScore = 0; // es para reiniciar el valaor de la puntuación seleccionada.
        lastJoke = false;
    });
}
function randomNum() {
    const randomNumber = Math.random(); // Generar un número decimal aleatorio entre 0 (inclusive) y 1 (exclusive)
    const scaledNumber = randomNumber * 1 + 1; // Escalar y desplazar el número para obtener un valor entre 1 y 2
    const roundedNumber = Math.round(scaledNumber); // Redondear el número al entero más cercano (1 o 2)
    return roundedNumber;
}
const score = (score) => {
    if (lastJoke) {
        selectedScore = selectedScore === score ? 0 : score;
        const dadJokeScore = {
            joke: reportAcudits[reportAcudits.length - 1].joke,
            score: selectedScore,
            date: selectedScore !== 0 ? new Date().toDateString() : 0,
        };
        console.log(`joke: ${dadJokeScore.joke}, score: ${dadJokeScore.score}, date: ${dadJokeScore.date} `);
        reportAcudits.push(dadJokeScore);
    }
    else {
        selectedScore = selectedScore === score ? 0 : score;
        const chuckJokeScore = {
            value: reportChuckAcudits[reportChuckAcudits.length - 1].value,
            score: selectedScore,
            date: selectedScore !== 0 ? new Date().toDateString() : 0,
        };
        console.log(`joke: ${chuckJokeScore.value}, score: ${chuckJokeScore.score}, date: ${chuckJokeScore.date} `);
        reportChuckAcudits.push(chuckJokeScore);
    }
};
//fer canviar el background amb SVG 
const button = document.querySelector('.btn');
const container = document.querySelector('.container');
const formesCss = ['acuditForma1', 'acuditForma2', 'acuditForma3', 'acuditFroma4'];
button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
    const random = formesCss[Math.floor(Math.random() * formesCss.length)];
    container === null || container === void 0 ? void 0 : container.classList.remove(...formesCss);
    container === null || container === void 0 ? void 0 : container.classList.add(random);
});
