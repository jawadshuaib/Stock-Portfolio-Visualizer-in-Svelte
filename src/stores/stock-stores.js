import { writable } from 'svelte/store';

const terms = writable([]);
/** 
 * Store a list of all the stocks the user searched for
 * @param {Array} array of stocks the user searched for ['MSFT', 'AAPL', 'TSLA', 'ARKK']
 * stores: ['MSFT', 'AAPL', 'TSLA', 'ARKK']
 */ 

export { terms };

  // import fetch_stocks_api from '../api/fetch-stocks';
  // Clear from cache any terms not in the searchedList
  // For example, if the user searches for 'MSFT' and 'AAPL' and then searches for 'MSFT' again
  // cachedTerms = cachedTerms.length ? cachedTerms.filter (stock => searchedList.includes(stock)) : [];
    
  // filter ls to only contain stocks that are not already in the list
  // ls = ls.length ? ls.filter(stock => !isInCachedList(stock)) : [];

    // Fetch stocks from API (including deconstructed ETF) if there are new stocks to add to the list 
    // ETF decontruct takes too long so let's skip it for now
    // fetch_stocks_api.all(ls).then((stocks) => {
    //   stocks.forEach(async (stock) => {
    //     stock.then((data) => {                    	
    //       // Cache the data so we don't fetch it again          
    //       cacheTerm (data);	
    //       console.log (`cached terms B`, cachedTerms);
    //       console.log (`what data looks like`, data);
    //       // Update the list of stocks. cachedTerms always includes the most updated list of stocks
    //       terms.set (cachedTerms);
    //     });
    //   });            
    // });