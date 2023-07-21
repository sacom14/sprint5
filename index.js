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
const api_id = '14da9090c8517409168e96826bf96663';
const weather = 'https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=14da9090c8517409168e96826bf96663&lang=ca';
const header = {
    method: 'GET',
    // Headers: {
    //     // 'Accept': 'application/json'
    // }
};
const showWheater = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield fetch(weather);
        let message = yield response.json();
        let weatherMessage = document.getElementById('weather');
        weatherMessage.innerHTML = `El temps d'avui a Barcelona: ${message.weather[0].description}`;
    }
    catch (error) {
        console.error(error);
    }
});
showWheater();
const url = 'https://icanhazdadjoke.com/';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};
const reportAcudits = []; //guardamos array de objetos.
let selectedScore = 0; //guardamos el número seleccionado de los botones antes de enviarlo.
const processTheJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield fetch(url, options);
        let message = yield response.json(); //lo pasamos a json
        console.log(message.joke);
        let joke = document.getElementById('jokeMessage');
        joke.innerHTML = `" ${message.joke} "`; //imprimimos el mensaje por pantalla
        const jokeScore = {
            joke: message.joke,
            score: selectedScore,
            date: selectedScore !== 0 ? new Date().toDateString() : 0,
        };
        console.log(`joke: ${jokeScore.joke}, score: ${jokeScore.score}, date: ${jokeScore.date} `);
        reportAcudits.push(jokeScore);
        selectedScore = 0; // es para reiniciar el valaor de la puntuación seleccionada.
    }
    catch (error) {
        console.error(error);
    }
});
const score = (score) => {
    if (reportAcudits.length > 0) {
        selectedScore = selectedScore === score ? 0 : score;
        console.log(`score seleccionada: ${selectedScore}`);
    }
};
