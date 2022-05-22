<script>
	import { terms } from '../stores/stock-stores';
	import { displaySamplePortfolio } from '../stores/sample-portfolio-stores';
	import { loading, setLoading, totalLoaded } from '../stores/loading-stores';
	import Stock from '../components/Stock.svelte';
	import SamplePortfolio from '../components/SamplePortfolio.svelte';

	let symbols = [];

	$: apiIsLoading = false;
	$: mdGridStyle = '2';
	$: shouldDisplaySamplePortfolio = true;

	terms.subscribe((stocks) => {
		symbols = [...new Set(stocks)];
		mdGridStyle = symbols.length > 1 ? '2' : '1';

		// setLoading({ apiIsLoading: false, apiHasFinishedLoading: true });
	});

	displaySamplePortfolio.subscribe((state) => {
		shouldDisplaySamplePortfolio = state;
		mdGridStyle = shouldDisplaySamplePortfolio ? '2' : '1';
	});

	// Show option to save the portfolio if ALL stocks have loaded
	totalLoaded.subscribe((n) => {
		if (n === symbols.length && n > 0) {
			setLoading({ apiIsLoading: false, apiHasFinishedLoading: true });

			// Reset
			totalLoaded.set(0);
		}
	});

	// Show '...' until stocks are loading
	loading.subscribe((l) => {
		apiIsLoading = l.apiIsLoading;
	});
</script>

<div class={`grid gap-2 py-2 md:grid-cols-${mdGridStyle} grid-cols-${mdGridStyle}`}>
	{#if symbols.length}
		{#each symbols as symbol}
			<Stock {symbol} allowDragAndDrop="true" />
		{/each}
	{:else if shouldDisplaySamplePortfolio}
		<SamplePortfolio />
	{/if}
</div>
{#if apiIsLoading}
	<div class="text-center animate-bounce">...</div>
{/if}
