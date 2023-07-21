const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=14da9090c8517409168e96826bf96663&lang=ca';
const header = {
    method: 'GET',
    // Headers: {
    //     // 'Accept': 'application/json'
    // }
};
const showWheater = async () => {
    try {
        let response = await fetch(weatherUrl);
        let message = await response.json();
        let weatherMessage = document.getElementById('weather') as HTMLParagraphElement;
        weatherMessage.innerHTML = `El temps d'avui a Barcelona: ${message.weather[0].description}`;
    } catch (error) {
        console.error(error);

    }
}
showWheater();
//chistes de dadJoke
const dadJokeUrl = 'https://icanhazdadjoke.com/';
const optionsDadJoke = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};
interface Joke {
    joke: string;
    score: number | 0;
    date: string | 0;
}

//chistes de otra api
const chuckJokeUrl = 'https://api.chucknorris.io/jokes/random';
const optionsChukJoke = {
    method: 'GET',
    //no hace falta el get realmente
}
interface ChukJoke {
    joke: string;
    score: number | 0;
    date: string | 0;
}

const reportAcudits: Joke[] = []; //guardamos array de objetos.
const reportChuckAcudits: ChukJoke[] = [];
let selectedScore: number | 0 = 0; //guardamos el número seleccionado de los botones antes de enviarlo.

let lastUsedAPI: 'dadJoke' | 'chuckJoke' = 'dadJoke';

const processTheJoke = async () => {
    try {
        if (lastUsedAPI === "dadJoke") { //la primera API
            lastUsedAPI = "chuckJoke";
            let response = await fetch(dadJokeUrl, optionsDadJoke)
            let message = await response.json(); //lo pasamos a json
            console.log(message.joke);
            let joke = document.getElementById('jokeMessage') as HTMLParagraphElement;
            joke.innerHTML = `" ${message.joke} "`; //imprimimos el mensaje por pantalla

            const dadJokeScore: Joke = {  //crear objeto de los chistes
                joke: message.joke,
                score: selectedScore,
                date: selectedScore !== 0 ? new Date().toDateString() : 0,
            };
            console.log(`joke: ${dadJokeScore.joke}, score: ${dadJokeScore.score}, date: ${dadJokeScore.date} `);
            reportAcudits.push(dadJokeScore);
            selectedScore = 0; // es para reiniciar el valaor de la puntuación seleccionada.  

        } else { //para la segunda API
            lastUsedAPI = "dadJoke";
            let response = await fetch(chuckJokeUrl)
            let message = await response.json(); //lo pasamos a json
            console.log(message.value);
            let joke = document.getElementById('jokeMessage') as HTMLParagraphElement;
            joke.innerHTML = `" ${message.value} "`; //imprimimos el mensaje por pantalla

            const chuckJokeScore: ChukJoke = {  //crear objeto de los chistes
                joke: message.value,
                score: selectedScore,
                date: selectedScore !== 0 ? new Date().toDateString() : 0,
            };
            console.log(`joke: ${chuckJokeScore.joke}, score: ${chuckJokeScore.score}, date: ${chuckJokeScore.date} `);
            reportChuckAcudits.push(chuckJokeScore);
            selectedScore = 0; // es para reiniciar el valaor de la puntuación seleccionada.  
        }

    } catch (error) {
        console.error(error);
    }
}
const score = (score: number) => {
    if (reportAcudits.length > 0) {
        selectedScore = selectedScore === score ? 0 : score;
        console.log(`score seleccionada: ${selectedScore}`);
    }
}

//fer canviar el background amb SVG 
const button = document.querySelector('.btn') as HTMLButtonElement |null;
const container = document.querySelector('.container') as HTMLElement |null;

const formesCss = ['acuditForma1', 'acuditForma2', 'acuditForma3', 'acuditFroma4'];

button?.addEventListener('click', ()=>{
    const random = formesCss[Math.floor(Math.random()*formesCss.length)];

    container?.classList.remove(...formesCss);
    container?.classList.add(random);
});


