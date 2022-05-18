import { writable } from 'svelte/store';
import fetch_stocks_api from '../api/fetch-stocks';

const terms = writable([]);
/** 
 * Store a list of all the stocks the user searched for
 * @param {Array} stocks  
 */ 
const allTerms = (ls) => {
	if (ls.length) {
    fetch_stocks_api.all(ls).then((stocks) => {
      stocks.forEach(async (stock) => {
        stock.then((data) => {
          terms.set (data);			
        });
      });
    });
  } else {
    terms.set([]);
  }
}

export { terms, allTerms };