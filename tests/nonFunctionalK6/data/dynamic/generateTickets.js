const { faker, fakerPT_BR } = require('./lib/node_modules/@faker-js/faker');
const fs = require('fs');

const quantidade = 2;
const tickets = [];

for (let i = 0; i < quantidade; i++) {
    const ticket = {
        "movieId": fakerPT_BR.string.uuid(),
        "userId": fakerPT_BR.string.uuid(),
        "seatNumber": fakerPT_BR.number.int({ min: 0, max: 100 }),
        "price": fakerPT_BR.number.float({ min: 0, max: 60, precision: 0.01 }),
        "showtime": faker.date.future().toISOString()
    };
    tickets.push(ticket);
}

fs.writeFileSync('tickets.json', JSON.stringify(tickets, null, 2), error => {
    if (error) {
        console.error(error);
    }
});
