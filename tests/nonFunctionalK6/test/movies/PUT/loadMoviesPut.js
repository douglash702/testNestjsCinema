import { baseRest, BaseChecks, ENDEPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { reportLoad } from '../../../support/base/report.js';
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.loadTest;

const base_uri = testConfig.environment.testDocker.url;
const baseRestInstance = new baseRest(base_uri);
const baseChecks = new BaseChecks();

const data = new SharedArray('movies', function() {
    const jsonData = JSON.parse(open('../../../data/dynamic/movies.json'));
    return jsonData;
});

export function setup() {
    const movieToCreate = data[Math.floor(Math.random() * data.length)];
    const createMovieRes = baseRestInstance.post(ENDEPOINTS.MOVIE_ENDPOINT, movieToCreate);
    baseChecks.checkStatusCode(createMovieRes, 201, 'POST /movies - Status Code');
    console.log(`Filme criado com sucesso: ${JSON.stringify(movieToCreate)}`);
}

export default function () {
    
    const getMoviesRes = baseRestInstance.get(ENDEPOINTS.MOVIE_ENDPOINT);
    baseChecks.checkStatusCode(getMoviesRes, 200, 'GET /movies - Status Code');

    const movies = JSON.parse(getMoviesRes.body);
    if (movies.length === 0) {
        console.log('Nenhum filme disponível para atualizar.');
        return;
    }

   
    const movie = movies[Math.floor(Math.random() * movies.length)];
    const updatedMovie = { ...movie, "title": "Título Atualizado", "description": "Atualizado" };

    
    const updateMovieRes = baseRestInstance.put(`${ENDEPOINTS.MOVIE_ENDPOINT}/${movie._id}`, updatedMovie);
    baseChecks.checkStatusCode(updateMovieRes, 200, `PUT /movies/${movie._id} - Status Code`);
    baseChecks.checkResponseTime(updateMovieRes, 300, `PUT /movies - tempo de resposta`)
    console.log(`Filme com ID ${movie._id} foi atualizado com sucesso.`);

    sleep(1);
}


export function teardown() {
    
    const getMoviesRes = baseRestInstance.get(ENDEPOINTS.MOVIE_ENDPOINT);
    baseChecks.checkStatusCode(getMoviesRes, 200, 'GET /movies - Status Code');

    const movies = JSON.parse(getMoviesRes.body);
    if (movies.length === 0) {
        console.log('Nenhum filme disponível para deletar.');
        return;
    }

    
    const movie = movies[Math.floor(Math.random() * movies.length)];
    const deleteMovieRes = baseRestInstance.delete(`${ENDEPOINTS.MOVIE_ENDPOINT}/${movie._id}`);
    baseChecks.checkStatusCode(deleteMovieRes, 200, `DELETE /movies/${movie._id} - Status Code`);
    console.log(`Filme com ID ${movie._id} foi deletado com sucesso.`);
}

export function handleSummary(data) {
    return reportLoad(data);
}
