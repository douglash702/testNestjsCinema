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
    data.forEach(movies => {
        console.log('Criando filmes', movies)
        const res = baseRestInstance.post(ENDEPOINTS.MOVIE_ENDPOINT, movies);
        baseChecks.checkStatusCode(res, 201, 'POST /usuarios - Status Code'); 
    
        })}

        export default function () {
            const getMovies = baseRestInstance.get(ENDEPOINTS.MOVIE_ENDPOINT);
            baseChecks.checkStatusCode(getMovies, 200, 'GET /movies - Status Code');
        
            const itens = JSON.parse(getMovies.body);
        
            if (itens.length === 0) {
                console.log('Nenhum filme disponível para deletar.');
                return; 
            }
        
            
            const randomIndex = Math.floor(Math.random() * itens.length);
            const selectedMovie = itens[randomIndex];
            const idMovie = selectedMovie._id;
        
            const deleteRes = baseRestInstance.delete(`${ENDEPOINTS.MOVIE_ENDPOINT}/${idMovie}`);
            baseChecks.checkStatusCode(deleteRes, 200, `DELETE /movies/${idMovie} - Status Code`);
            baseChecks.checkResponseTime(deleteRes, 400, `DELETE /movies - tempo de resposta`); 
            console.log(`Filme com ID ${idMovie} foi deletado com sucesso.`);
            
            sleep(1);
        }
        
export function teardown(data) {  
console.log("Verificando pendencias...");

const getMovies = baseRestInstance.get(`${ENDEPOINTS.MOVIE_ENDPOINT}`);
baseChecks.checkStatusCode(getMovies, 200, `get/movies - status code`);
}

export function handleSummary(data) {
    return reportStress(data);  
}