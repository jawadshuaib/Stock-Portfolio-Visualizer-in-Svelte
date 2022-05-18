import { envVariables } from '../scripts/env-variables';

const baseURL = envVariables.isProduction ? `${envVariables.corsAnywhereProxy}https://us-central1-effective-tea-350313.cloudfunctions.net/yahoo-finance-api-v1` : `http://localhost:8080`;  
const options = {    
  headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})
};

/**
* API for getting a list of stocks
* req ?stocks=TSLA,ROKU
* result {"symbol":"TSLA","last_price":"769.59","percentage_change":"+5.71%"}
*/
const stocks = async (stocks) => { 

  const url = `${baseURL}/stocks?stocks=${stocks.join()}`  
  
  try {
    const response = await fetch(url, options);
    const data = await response.json();
  
    const fetchedData = data.results.map (company => {  
      return {
        symbol: company.stock.symbol,
        last_price: company.stock.last_price,
        percentage_change: company.stock.percentage_change
      };
    });    
    return fetchedData;
  }
  catch (error) {  
    return { error }
  }
}

/**
 * API for getting ETF holdings
 * Provides a list of top 10 ETF holdings
 * @param req ?stock=ARKK 
 * @returns {"name":"Tesla Inc","symbol":"TSLA","percentage_assets":"9.56%"},{"name":"Roku Inc Class A","symbol":"ROKU","percentage_assets":"6.48%"},{"name":"Teladoc Health Inc","symbol":"TDOC","percentage_assets":"5.76%"},{"name":"Square Inc A","symbol":"SQ","percentage_assets":"4.37%"},{"name":"Zoom Video Communications Inc","symbol":"ZM","percentage_assets":"4.36%"},{"name":"Shopify Inc A","symbol":"SHOP.TO","percentage_assets":"4.27%"},{"name":"Spotify Technology SA","symbol":"SPOT","percentage_assets":"3.68%"},{"name":"Twilio Inc A","symbol":"TWLO","percentage_assets":"3.66%"},{"name":"Coinbase Global Inc Ordinary Shares - Class A","symbol":"COIN","percentage_assets":"3.65%"},{"name":"Unity Software Inc Ordinary Shares","symbol":"U","percentage_assets":"3.41%"}
 */
const etf = async (stock) => { 

  const options = {    
    headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})
  };

  const baseURL = envVariables.isProduction ? `${envVariables.corsAnywhereProxy}https://us-central1-effective-tea-350313.cloudfunctions.net/yahoo-finance-api-v1` : `http://localhost:8080`;  
  const url = `${baseURL}/etf?stock=${stock}`  
  
  try {
    const response = await fetch(url, options);
    const data = await response.json();
  
    const fetchedData = data.holdings.companies.map (company => {  
      return {
        name: company.name,
        symbol: company.symbol,        
        percentage_assets: company.percentage_assets
      };
    });    
    return fetchedData;
  }
  catch (error) {  
    return { error }
  } 
}


/**
 * API to check if this is an ETF
 * @param req ?stock=ARKK 
 * @returns {"is_etf":true}
 */
const is_etf = async (stock) => { 

  const url = `${baseURL}/is_etf?stock=${stock}`  
  
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.is_etf;    
  }
  catch (error) {  
    return { error }
  } 
}

/**
 * Function for getting a marged array of stocks and ETF holdings
 * @param 'MSFT', 'AAPL', 'TSLA', 'ARKK'
 * @returns ['AAPL', 'MSFT', 'TSLA', 'ROKU', 'TDOC', 'SQ', 'ZM', 'SHOP.TO', 'SPOT', 'TWLO', 'COIN', 'U']
 */
const all = async (stocks) => {
  // Remove any duplicate stocks so we don't check them twice
  const uniqueStocks = new Set(stocks);
  
  let ls = [], uniqueList = [];
  return [...uniqueStocks].map(async (stock) => {    

		const isEtf = await fetch_stocks_api.is_etf(stock);
		if (isEtf) {
			// Get holdings from the etf
      const etf = await fetch_stocks_api.etf(stock);			
			const holdings = etf.map((holding) => holding.symbol);
      ls = [...ls, ...holdings];      
		}
    else {
      ls.push (stock);      
    }    
    // Remove any duplicates we may have picked up from the ETF holdings
    uniqueList = new Set(ls);
   return [...uniqueList];
	});    
}

const fetch_stocks_api = {
  stocks, etf, is_etf, all
}

export default fetch_stocks_api;