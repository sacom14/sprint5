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
const url = ('https://icanhazdadjoke.com/');
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};
const processTheJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url, options);
        const message = yield response.json();
        console.log(message.joke);
        let joke = document.getElementById('jokeMessage');
        joke.innerHTML = `" ${message.joke} "`;
    }
    catch (error) {
        console.error(error);
    }
});
