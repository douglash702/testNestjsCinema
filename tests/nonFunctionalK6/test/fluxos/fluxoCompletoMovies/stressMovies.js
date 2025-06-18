import { baseRest, BaseChecks, ENDEPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { reportStress } from '../../../support/base/report.js';
import { sleep } from 'k6';
import {SharedArray} from 'k6/data';

export const options = testConfig.options.stressTest;

const base_uri = testConfig.environment.testDocker.url; 
const baseRestInstance = new baseRest(base_uri);
const baseChecks = new BaseChecks();

const data = new SharedArray('movies', function() {
    const jsonData = JSON.parse(open('../../../data/dynamic/movies.json'));
 
    return jsonData;
});

export function setup() {
   
    const getMovies = baseRestInstance.get(ENDEPOINTS.MOVIE_ENDPOINT);
    baseChecks.checkStatusCode(getMovies, 200, 'GET /movies - Status Code');

    const itens = JSON.parse(getMovies.body);
    if (itens.length === 0) {
        console.log('Nenhum item disponível para deletar.');
        return; 
    }

    
    itens.forEach(item => {
        const idMovie = item._id;
        const deleteRes = baseRestInstance.delete(`${ENDEPOINTS.MOVIE_ENDPOINT}/${idMovie}`);
        baseChecks.checkStatusCode(deleteRes, 200, `DELETE /movies/${idMovie} - Status Code`);
        console.log(`Filme com ID ${idMovie} foi deletado com sucesso.`);
    });
}

export default function () {
    const movieToPost = data[Math.floor(Math.random() * data.length)];
    const res = baseRestInstance.post(ENDEPOINTS.MOVIE_ENDPOINT, movieToPost);
    baseChecks.checkStatusCode(res, 201, 'POST /movies - Status Code');

    const getMovies = baseRestInstance.get(ENDEPOINTS.MOVIE_ENDPOINT);
    baseChecks.checkStatusCode(getMovies, 200, 'GET /movies - Status Code');

    const itens = JSON.parse(getMovies.body);
    if (itens.length === 0) {
        console.log('Nenhum filme criado.');
        return;
    }

    const idMovie = itens[Math.floor(Math.random() * itens.length)]._id;
    const updatedMovie = { ...movieToPost, "title": "Título Atualizado", "description": "Atualizado" };

    const updateMovieRes = baseRestInstance.put(`${ENDEPOINTS.MOVIE_ENDPOINT}/${idMovie}`, updatedMovie);
    baseChecks.checkStatusCode(updateMovieRes, 200, `PUT /movies/${idMovie} - Status Code`);
    console.log(`Filme com ID ${idMovie} foi atualizado com sucesso.`);

    const getMoviesID = baseRestInstance.get(`${ENDEPOINTS.MOVIE_ENDPOINT}/${idMovie}`);
    baseChecks.checkStatusCode(getMoviesID, 200, `GET /movies/${idMovie} - Status Code`);

    const deleteMovie = baseRestInstance.delete(`${ENDEPOINTS.MOVIE_ENDPOINT}/${idMovie}`);
    baseChecks.checkStatusCode(deleteMovie, 200, `DELETE /movies/${idMovie} - Status Code`);
   
    sleep(1);
}

export function teardown() {
    const getMovies = baseRestInstance.get(ENDEPOINTS.MOVIE_ENDPOINT);
    baseChecks.checkStatusCode(getMovies, 200, 'GET /movies - Status Code');

    const itens = JSON.parse(getMovies.body);
    if (itens.length === 0) {
        console.log('Nenhum item disponível para deletar.');
        return;
    }

    itens.forEach(item => {
        const idMovie = item._id;
        const deleteRes = baseRestInstance.delete(`${ENDEPOINTS.MOVIE_ENDPOINT}/${idMovie}`);
        baseChecks.checkStatusCode(deleteRes, 200, `DELETE /movies/${idMovie} - Status Code`);
        console.log(`Filme com ID ${idMovie} foi deletado com sucesso.`);
    });
}


export function handleSummary(data) {
    return reportStress(data);
}