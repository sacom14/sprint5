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
    value: string;
    score: number | 0;
    date: string | 0;
}

const reportAcudits: Joke[] = []; //guardamos array de objetos.
const reportChuckAcudits: ChukJoke[] = [];
let selectedScore: number | 0 = 0; //guardamos el número seleccionado de los botones antes de enviarlo.
let lastJoke = true;

const processTheJoke = async () => {
    try {
        if (randomNum() === 1) { //la primera API
            dadFunction();
        } else { //para la segunda API
            chuckFunction();
        }
    } catch (error) {
        console.error(error);
    }
}
//dadJoke function
async function dadFunction() {
    let response = await fetch(dadJokeUrl, optionsDadJoke)
    let message = await response.json(); //lo pasamos a json

    let joke = document.getElementById('jokeMessage') as HTMLParagraphElement;
    joke.innerHTML = `" ${message.joke} "`; //imprimimos el mensaje por pantalla
    reportAcudits.push(message);
    selectedScore = 0;// es para reiniciar el valaor de la puntuación seleccionada.  
    lastJoke = true;
    const valorationElement = document.querySelector(".visibleValoration"); //accedemos a los votones de valoración
    if (valorationElement) {
        (valorationElement as HTMLElement).style.display = "block"; //hacemos visible los botones de valoración
    }
}

//chuck function
async function chuckFunction() {
    let response = await fetch(chuckJokeUrl)
    let message = await response.json(); //lo pasamos a json

    let joke = document.getElementById('jokeMessage') as HTMLParagraphElement;
    joke.innerHTML = `" ${message.value} "`; //imprimimos el mensaje por pantalla

    reportChuckAcudits.push(message);
    selectedScore = 0; // es para reiniciar el valaor de la puntuación seleccionada.
    lastJoke = false;
}

function randomNum(): number {

    const randomNumber = Math.random();// Generar un número decimal aleatorio entre 0 (inclusive) y 1 (exclusive)
    const scaledNumber = randomNumber * 1 + 1;// Escalar y desplazar el número para obtener un valor entre 1 y 2
    const roundedNumber = Math.round(scaledNumber);// Redondear el número al entero más cercano (1 o 2)
    return roundedNumber;
}

const score = (score: number) => {
    if (lastJoke) {
        selectedScore = selectedScore === score ? 0 : score;
        const dadJokeScore: Joke = {  //crear objeto de los chistes
            joke: reportAcudits[reportAcudits.length - 1].joke,
            score: selectedScore,
            date: selectedScore !== 0 ? new Date().toDateString() : 0,
        };
        console.log(`joke: ${dadJokeScore.joke}, score: ${dadJokeScore.score}, date: ${dadJokeScore.date} `);
        reportAcudits.push(dadJokeScore);
    } else {
        selectedScore = selectedScore === score ? 0 : score;
        const chuckJokeScore: ChukJoke = {  //crear objeto de los chistes
            value: reportChuckAcudits[reportChuckAcudits.length - 1].value,
            score: selectedScore,
            date: selectedScore !== 0 ? new Date().toDateString() : 0,
        };
        console.log(`joke: ${chuckJokeScore.value}, score: ${chuckJokeScore.score}, date: ${chuckJokeScore.date} `);
        reportChuckAcudits.push(chuckJokeScore);
    }
}

//fer canviar el background amb SVG 
const button = document.querySelector('.btn') as HTMLButtonElement | null;
const container = document.querySelector('.container') as HTMLElement | null;

const formesCss = ['acuditForma1', 'acuditForma2', 'acuditForma3', 'acuditFroma4'];

button?.addEventListener('click', () => {
    const random = formesCss[Math.floor(Math.random() * formesCss.length)];

    container?.classList.remove(...formesCss);
    container?.classList.add(random);
});

