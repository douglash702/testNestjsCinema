import { check } from "k6";

export class BaseChecks {
    constructor() {
        this.totalRequests = 0;
        this.failedRequests = 0;
    }

    checkStatusCode(response, expectedStatus = 200, message = 'status code check') {
        this.totalRequests++;
        const isSuccess = check(response, {
            [message]: (r) => r.status === expectedStatus,
        });
        if (!isSuccess) {
            this.failedRequests++;
            console.error(`${message} falhou: esperado ${expectedStatus}, recebido ${response.status}`);
        }
        return isSuccess;
    }

    checkResponseBody(response, expectedKeys = [], message = 'response body check') {
        this.totalRequests++;
        const isSuccess = check(response, {
            [message]: (r) => {
                const responseBody = r.json();
                return expectedKeys.every(key => key in responseBody);
            }
        });
        if (!isSuccess) {
            this.failedRequests++;
            console.error(`${message} falhou: chaves esperadas ${expectedKeys.join(', ')} não encontradas`);
        }
        return isSuccess;
    }

    checkResponseHeaders(response, expectedHeaders = {}, message = 'response headers check') {
        this.totalRequests++;
        const isSuccess = check(response, {
            [message]: (r) => {
                return Object.keys(expectedHeaders).every(header =>
                    r.headers[header] === expectedHeaders[header]
                );
            }
        });
        if (!isSuccess) {
            this.failedRequests++;
            console.error(`${message} falhou: cabeçalhos esperados não correspondem`);
        }
        return isSuccess;
    }

    checkResponseTime(response, maxResponseTime = 2000, message = 'response time check') {
        this.totalRequests++;
        const isSuccess = check(response, {
            [message]: (r) => r.timings && r.timings.duration <= maxResponseTime,
        });
        if (!isSuccess) {
            this.failedRequests++;
            console.error(`${message} falhou: tempo de resposta ${response.timings.duration}ms excedeu o limite de ${maxResponseTime}ms`);
        }
        return isSuccess;
    }

    calculateErrorRate() {
        if (this.totalRequests === 0) return 0;
        return this.failedRequests / this.totalRequests;
    }
}
