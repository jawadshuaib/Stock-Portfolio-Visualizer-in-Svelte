<script>
	import { terms, allTerms } from '../stores/stock-stores';
	import { setLoading } from '../stores/loading-stores';

	let search = 'MSFT,GOOG';

	/**
	 * Only store unique search terms in storage
	 * @param search = MSFT,AAPL
	 * @store stocks = [MSFT, GOOG]
	 * @result filtered = [MSFT, GOOG, AAPL]
	 */

	function handleChange(event) {
		if (event.key === 'Enter') {
			allTerms([]);
			setLoading(true);
			const ls = search.split(',');
			let filtered = [];
			terms.subscribe((stocks) => {
				ls.forEach((t) => {
					if (!stocks.includes(t)) {
						filtered.push(t);
					}
				});
				filtered = filtered.concat(stocks);
			});

			// Push the search terms to the store
			if (filtered.length) {
				allTerms(filtered);
			}
		}
	}
</script>

<input
	type="text"
	bind:value={search}
	on:keypress={handleChange}
	placeholder="Enter Stocks Separated by Commas (i.e. MSFT,GOOG)"
	class="w-full rounded-md text-lg p-4 border-2 border-gray-200 uppercase placeholder:normal-case"
/>
