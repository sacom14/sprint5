const url = ('https://icanhazdadjoke.com/');
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

const processTheJoke = async () => {
    try {
        const response = await fetch(url, options)
        const message = await response.json();
        console.log(message.joke);
    } catch (error) {
        console.error(error);
    }

}
processTheJoke();
