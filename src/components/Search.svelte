<script>
	// Stores
	import { terms } from '../stores/stock-stores';
	import { setLoading } from '../stores/loading-stores';
	import { displaySamplePortfolio } from '../stores/sample-portfolio-stores';
	// Common Scripts
	import { envVariables } from '../scripts/env-variables';

	let search = envVariables.isDeveloperMode ? 'MSFT,GOOG,AMZN' : '';

	/**
	 * Only store unique search terms in storage
	 * @param search = MSFT,AAPL
	 * @store stocks = [MSFT, GOOG]
	 * @result filtered = [MSFT, GOOG, AAPL]
	 */

	function handleChange(e) {
		if (e.key === 'Enter') {
			terms.set([]);
			setLoading({ apiIsLoading: true, apiHasFinishedLoading: false });

			let ls = search.toUpperCase().split(',');
			ls = ls.filter((t) => t !== '');
			ls = ls.map((t) => t.trim());
			if (ls.length === 0) {
				terms.set([]);
			}

			// Remove duplicates from search terms
			const uniqueLs = [...new Set(ls)];

			if (uniqueLs.length) {
				displaySamplePortfolio.set(false);
				terms.set(uniqueLs);
			}
			// if (totalTerms === uniqueLs.length) {
			// setLoading({ apiIsLoading: false, apiHasFinishedLoading: true });
			// }
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
