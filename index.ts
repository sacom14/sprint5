const url = ('https://icanhazdadjoke.com/');
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
        const response = await fetch(url, options)
        const message = await response.json(); //lo pasamos a json
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
function valorateScore(){
    console.log(reportAcudits[reportAcudits.length-1]);
}
const score = (score: number) => {
    if (reportAcudits.length > 0) {
        selectedScore = selectedScore === score ? 0 : score;
        console.log(`score seleccionada: ${selectedScore}`);
    }
}

