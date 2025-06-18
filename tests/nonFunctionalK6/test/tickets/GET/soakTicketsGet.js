import { baseRest, BaseChecks, ENDEPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { reportSoak } from '../../../support/base/report.js';
import { sleep } from 'k6';
import {SharedArray} from 'k6/data';
    
export const options = testConfig.options.soakTest;

const base_uri = testConfig.environment.testDocker.url; 
const baseRestInstance = new baseRest(base_uri);
const baseChecks = new BaseChecks();

const data = new SharedArray('movies', function() {
    const jsonData = JSON.parse(open('../../../data/dynamic/tickets.json'));
 
    return jsonData;
});

export function setup() {
    data.forEach(tickets => {
        
    console.log('Criando tickets', tickets)
    const res = baseRestInstance.post(ENDEPOINTS.TICKETS_ENDPOINT, tickets);
    baseChecks.checkStatusCode(res, 201, 'POST /tickets- Status Code'); 
    })};

export default function () {
    const getTickets = baseRestInstance.get(ENDEPOINTS.TICKETS_ENDPOINT);
    baseChecks.checkStatusCode(getTickets, 200, 'GET /tickets - Status Code');

    sleep(1);
}

export function handleSummary(data) {
    return reportSoak(data);  
}