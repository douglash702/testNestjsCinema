import { baseRest, BaseChecks, ENDEPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { reportSpike } from '../../../support/base/report.js';
import { sleep } from 'k6';
import {SharedArray} from 'k6/data';

export const options = testConfig.options.spikeTest;

const base_uri = testConfig.environment.testDocker.url; 
const baseRestInstance = new baseRest(base_uri);
const baseChecks = new BaseChecks();

const data = new SharedArray('movies', function() {
    const jsonData = JSON.parse(open('../../../data/dynamic/movies.json'));
 
    return jsonData;
});

export function setup() {
    const getTickets = baseRestInstance.get(ENDEPOINTS.TICKETS_ENDPOINT);
    baseChecks.checkStatusCode(getTickets, 200, 'GET /tickets - Status Code');
   
}


export default function () {
    const ticketsToPost = data[Math.floor(Math.random() * data.length)];
    const res = baseRestInstance.post(ENDEPOINTS.TICKETS_ENDPOINT, ticketsToPost);
    baseChecks.checkStatusCode(res, 201, 'POST /tickets- Status Code'); 

    const getTickets = baseRestInstance.get(ENDEPOINTS.TICKETS_ENDPOINT);
    baseChecks.checkStatusCode(getTickets, 200, 'GET /tickets - Status Code');

    sleep (1);
}


export function teardown () {
    const getTickets = baseRestInstance.get(ENDEPOINTS.TICKETS_ENDPOINT);
    baseChecks.checkStatusCode(getTickets, 200, 'GET /tickets - Status Code');

}

export function handleSummary(data) {
    return reportSpike(data);  
}