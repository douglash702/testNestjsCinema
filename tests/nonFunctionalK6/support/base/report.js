import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function reportLoad(data) {
    return {
   //  "C:/Users/User/OneDrive/Área de Trabalho/test-nestjs-cinema/tests/nonFunctionalK6/results/loadResult/loadTestMovies.html": htmlReport(data),

      "C:/Users/User/OneDrive/Área de Trabalho/test-nestjs-cinema/tests/nonFunctionalK6/results/loadResult/loadTestTickets.html": htmlReport(data)
    };
  }

  export function reportSmoke(data) {
    return {
     "/results/smokeResult/smokeTestMovies.html": htmlReport(data),

    //  "C:/Users/User/OneDrive/Área de Trabalho/test-nestjs-cinema/tests/nonFunctionalK6/results/smokeResult/smokeTestTickets.html": htmlReport(data),

    };
  }

  export function reportSoak(data) {
    return {
     // "C:/Users/User/OneDrive/Área de Trabalho/test-nestjs-cinema/tests/nonFunctionalK6/results/soakResult/soakTestMovies.html": htmlReport(data),

     "C:/Users/User/OneDrive/Área de Trabalho/test-nestjs-cinema/tests/nonFunctionalK6/results/soakResult/soakTestTickets.html": htmlReport(data),
    };
  }

  export function reportSpike(data) {
    return {
    //  "C:/Users/User/OneDrive/Área de Trabalho/test-nestjs-cinema/tests/nonFunctionalK6/results/spikeResult/spikeTestMovies.html": htmlReport(data),

     "C:/Users/User/OneDrive/Área de Trabalho/test-nestjs-cinema/tests/nonFunctionalK6/results/spikeResult/spikeTestTickets.html": htmlReport(data),
    };
  }

  export function reportStress(data) {
    return {
    // "C:/Users/User/OneDrive/Área de Trabalho/test-nestjs-cinema/tests/nonFunctionalK6/results/stressResult/stressTestMovies.html": htmlReport(data),

   "C:/Users/User/OneDrive/Área de Trabalho/test-nestjs-cinema/tests/nonFunctionalK6/results/stressResult/stressTestTickets.html": htmlReport(data),
    };
  }


  
  
  
  
  