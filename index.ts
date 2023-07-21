const api_id='14da9090c8517409168e96826bf96663'; 

const weather ='https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=14da9090c8517409168e96826bf96663&lang=ca';
const header = {
    method: 'GET',
    // Headers: {
    //     // 'Accept': 'application/json'
    // }
};
const showWheater = async()=>{
    try{
        let response = await fetch(weather);
        let message = await response.json();
        let weatherMessage = document.getElementById('weather') as HTMLParagraphElement;
        weatherMessage.innerHTML = `El temps d'avui a Barcelona: ${message.weather[0].description}`;
    }catch(error){
        console.error(error);

    }
} 
showWheater();

const url = 'https://icanhazdadjoke.com/';
const options = {
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
const reportAcudits: Joke[] = []; //guardamos array de objetos.
let selectedScore: number | 0 = 0; //guardamos el número seleccionado de los botones antes de enviarlo.

const processTheJoke = async () => {
    try {
        let response = await fetch(url, options)
        let message = await response.json(); //lo pasamos a json
        console.log(message.joke);
        let joke = document.getElementById('jokeMessage') as HTMLParagraphElement;
        joke.innerHTML = `" ${message.joke} "`; //imprimimos el mensaje por pantalla

        const jokeScore: Joke = {  //crear objeto de los chistes
            joke: message.joke,
            score: selectedScore,
            date: selectedScore !== 0 ? new Date().toDateString() : 0,
        };
        console.log(`joke: ${jokeScore.joke}, score: ${jokeScore.score}, date: ${jokeScore.date} `);
        reportAcudits.push(jokeScore);
        selectedScore = 0; // es para reiniciar el valaor de la puntuación seleccionada.

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

