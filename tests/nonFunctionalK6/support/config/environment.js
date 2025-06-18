export const testConfig = {
    environment: {
        hml: {
            url: "http://localhost:3000"
        },

        testDocker: {
            url: "http://host.docker.internal:3000"
        },

        linuxDocker: {
         url: "http://172.17.0.1:3000/"
        }
    },
    
    options: {
       
        smoke: {
            vus: 1,
            duration: '1s',
            thresholds: {
                http_req_duration: ['p(95)<200'],
                http_req_failed: ['rate<0.08']
            }
        },

        loadTest: {
            stages: [
                { duration: '10s', target: 30 }, 
                { duration: '5m', target: 30 },  
                { duration: '10s', target: 0 }    
            ],
            thresholds: {
                'http_req_duration': ['p(95)<200'], 
                'http_req_failed': ['rate<0.08']    
            },

             teardownTimeout: '620s'
        },

       
        soakTest: {
            stages: [
                { duration: '20s', target: 0 },
                { duration: '5m', target: 100 },
                { duration: '30s', target: 400 },
                { duration: '5m', target: 100 },],
            thresholds: {
                http_req_duration: ['p(95)<200'],
                http_req_failed: ['rate<0.08']
            },

           teardownTimeout: '620s',
        },

       
        stressTest: {
            
            stages: [
                { duration: '1s', target: 50 },
                { duration: '1m', target: 50 },
                { duration: '30s', target: 200 },
                { duration: '1m', target: 200 },
                { duration: '1m', target: 300 },
                { duration: '3m', target: 300 },
                { duration: '30s', target: 400 },
                { duration: '1m', target: 400},
                { duration: '10s', target: 0},
            ],
            thresholds: {
                http_req_duration: ['p(95)<200'],
                http_req_failed: ['rate<0.08']
            },

            teardownTimeout: '620s'
        },


     spikeTest: { 

        stages: [
            { duration: '10s', target: 10 },
            { duration: '1m', target: 10 },
            { duration: '10s', target: 50 },
            { duration: '15s', target: 2000},
            { duration: '10s', target: 20 },
            { duration: '3m', target: 10 },
            { duration: '10s', target: 0 },
          ],
        thresholds: {
            http_req_duration: ['p(95)<200'],
            http_req_failed: ['rate<0.08']
        },

    },
}};
