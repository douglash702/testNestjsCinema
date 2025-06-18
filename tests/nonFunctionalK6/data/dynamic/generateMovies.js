const { faker, fakerPT_BR } = require('./lib/node_modules/@faker-js/faker');
const fs = require('fs');


const quantidade = 500;

const movies = [];

for(let i = 0; i < quantidade; i++) {

    const movie =  {
        "title": faker.music.genre() + ' ' + faker.word.noun(),
        "description": fakerPT_BR.lorem.paragraphs(2),
        "launchdate":  new Date().toISOString(),
        "showtimes": [faker.date.future().toISOString()]
    }
 movies.push(movie);
}

fs.writeFileSync('movies.json', JSON.stringify(movies, null, 2), error => {
    if(error) {
     console.error(error)

    }
})