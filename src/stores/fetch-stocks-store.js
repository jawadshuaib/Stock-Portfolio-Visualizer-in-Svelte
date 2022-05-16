import { writable } from 'svelte/store';
import { fetchStocks } from '../api/fetch-stocks';

const companies = writable([]);

export const fetchStocksStore = async (stocks) => {
  const data = await fetchStocks (stocks);
  
  companies.set (data);
  return companies;
};

// export const fetchStocksStore = (stocks) => {
//   fetchStocks (stocks)
//   return companies    
// };


// import { writable } from 'svelte/store';
// import { envVariables } from '../scripts/env-variables';

// const companies = writable([]);

// const fetchStocks = async (stocks) => { 

//   const options = {    
//     headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})
//   };

//   const baseURL = envVariables.isProduction ? `${envVariables.corsAnywhereProxy}https://us-central1-effective-tea-350313.cloudfunctions.net/yahoo-finance-api-v1` : `http://localhost:8080`;  
//   const url = `${baseURL}/stocks?stocks=${stocks.join()}`  
  
//   const response = await fetch(url, options);
//   const data = await response.json();

//   const fetchedData = data.results.map (company => {  
//     return {
//       symbol: company.stock.symbol,
//       last_price: company.stock.last_price,
//       percentage_change: company.stock.percentage_change
//     };
  
//   });
//   companies.set(fetchedData);
// }

// export const fetchStocksStore = (stocks) => {
//   fetchStocks (stocks)
//   return companies    
// };