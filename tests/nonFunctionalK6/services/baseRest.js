import http from 'k6/http';
import { baseService } from './baseService.js';

export class baseRest extends baseService {
    constructor(base_uri) {
        super(base_uri);
    }

    post(endpoint, body, headers = {}, params = {}) {
        let uri = this.base_uri + endpoint;
        let options = this.buildOptions(headers, params); 

        
        console.log('Payload enviado para POST:', JSON.stringify(body));

        const response = http.post(uri, JSON.stringify(body), options);

        
        console.log('Resposta da API:', response.status, response.body);

        if (!response || response.status === undefined) {
            console.error('Erro ao fazer POST:', response);
        }

        return response;
    }

    delete(endpoint, headers = {}, params = {}) {
        let uri = this.base_uri + endpoint;
        let options = this.buildOptions(headers, params); 
        
        const response = http.del(uri, null, options);

        if (!response || response.status === undefined) {
            console.error('Erro ao fazer DELETE:', response);
        }

        return response;
    }

    get(endpoint, headers = {}, params = {}) {
        let uri = this.base_uri + endpoint;
        let options = this.buildOptions(headers, params); 
        
        const response = http.get(uri, options);

        if (!response || response.status === undefined) {
            console.error('Erro ao fazer GET:', response);
        }

        return response;
    }

    put(endpoint, body, headers = {}, params = {}) {
        let uri = this.base_uri + endpoint;
        let options = this.buildOptions(headers, params); 
        
        const response = http.put(uri, JSON.stringify(body), options);

        if (!response || response.status === undefined) {
            console.error('Erro ao fazer PUT:', response);
        }

        return response;
    }

    buildOptions(headers = {}, params = {}) {
        return {
            headers: Object.assign({'Content-Type': 'application/json'}, headers),
            params: Object.assign({}, params)
        };
    }
}
