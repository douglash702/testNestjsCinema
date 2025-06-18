import { baseRest, BaseChecks, ENDEPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { reportSmoke } from '../../../support/base/report.js';
import { sleep } from 'k6';
import {SharedArray} from 'k6/data';
    
export const options = testConfig.options.smoke;

const base_uri = testConfig.environment.testDocker.url; 
const baseRestInstance = new baseRest(base_uri);
const baseChecks = new BaseChecks();

const data = new SharedArray('movies', function() {
    const jsonData = JSON.parse(open('../../../data/dynamic/movies.json'));
 
    return jsonData;
});

export function setup() {
    const limitedData = data.slice(0, 21); 

    limitedData.forEach(movie => {
        console.log('Criando filme', movie);
        const res = baseRestInstance.post(ENDEPOINTS.MOVIE_ENDPOINT, movie);
        baseChecks.checkStatusCode(res, 201, 'POST /movies - Status Code'); 
    });
}
        export default function () {
           
            const params = {
                params: {
                    query: {
                        limit: 20,  
                        page: 1     
                    }
                }
            };
        
         
            const getMovies = baseRestInstance.get(ENDEPOINTS.MOVIE_ENDPOINT, params);
            baseChecks.checkStatusCode(getMovies, 200, 'GET /movies - Status Code');
            baseChecks.checkResponseTime(getMovies, 100, 'GET /movies - Tempo de resposta');
        
            const moviesList = JSON.parse(getMovies.body);
            if (moviesList.length > 20) {
                console.error('Número de filmes na página excede o limite de 20.');
            } else {
                console.log(`Página contém ${moviesList.length} filmes.`);
            }
        
            sleep(1);
        }
        

export function teardown () {
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
    return reportSmoke(data);  
}