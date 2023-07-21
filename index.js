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
let lastUsedAPI = 'dadJoke';
const processTheJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (lastUsedAPI === "dadJoke") { //la primera API
            lastUsedAPI = "chuckJoke";
            let response = yield fetch(dadJokeUrl, optionsDadJoke);
            let message = yield response.json(); //lo pasamos a json
            console.log(message.joke);
            let joke = document.getElementById('jokeMessage');
            joke.innerHTML = `" ${message.joke} "`; //imprimimos el mensaje por pantalla
            const dadJokeScore = {
                joke: message.joke,
                score: selectedScore,
                date: selectedScore !== 0 ? new Date().toDateString() : 0,
            };
            console.log(`joke: ${dadJokeScore.joke}, score: ${dadJokeScore.score}, date: ${dadJokeScore.date} `);
            reportAcudits.push(dadJokeScore);
            selectedScore = 0; // es para reiniciar el valaor de la puntuación seleccionada.  
        }
        else { //para la segunda API
            lastUsedAPI = "dadJoke";
            let response = yield fetch(chuckJokeUrl);
            let message = yield response.json(); //lo pasamos a json
            console.log(message.value);
            let joke = document.getElementById('jokeMessage');
            joke.innerHTML = `" ${message.value} "`; //imprimimos el mensaje por pantalla
            const chuckJokeScore = {
                joke: message.value,
                score: selectedScore,
                date: selectedScore !== 0 ? new Date().toDateString() : 0,
            };
            console.log(`joke: ${chuckJokeScore.joke}, score: ${chuckJokeScore.score}, date: ${chuckJokeScore.date} `);
            reportChuckAcudits.push(chuckJokeScore);
            selectedScore = 0; // es para reiniciar el valaor de la puntuación seleccionada.  
        }
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
