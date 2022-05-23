<script>
	// Stores
	import { terms } from '../stores/stock-stores';
	import { displaySamplePortfolio } from '../stores/sample-portfolio-stores';
	import { loading, setLoading, totalLoaded } from '../stores/loading-stores';
	import { totalColumnsToDisplay } from '../stores/grid-columns-stores';
	// Components
	import Stock from '../components/Stock.svelte';
	import SamplePortfolio from '../components/SamplePortfolio.svelte';

	let symbols = [];
	let totalGridColumns = '2';
	let gridStyle = 'grid gap-2 py-2 md:grid-cols-2 grid-cols-1';

	$: apiIsLoading = false;
	$: shouldDisplaySamplePortfolio = true;

	terms.subscribe((stocks) => {
		symbols = [...new Set(stocks)];
		totalColumnsToDisplay.set(symbols.length);
		// setLoading({ apiIsLoading: false, apiHasFinishedLoading: true });
	});

	// Subscribe to how many columns to display in the grid based on the number of stocks requested
	totalColumnsToDisplay.subscribe((totalColumns) => {
		totalGridColumns = totalColumns > 1 ? '2' : '1';
		gridStyle = `grid gap-2 py-2 md:grid-cols-${totalGridColumns}`;
	});

	displaySamplePortfolio.subscribe((state) => {
		shouldDisplaySamplePortfolio = state;
		// Samples will always be more than one, so we can always display them in two grids
		totalGridColumns = '2';
		totalColumnsToDisplay.set(2);
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

<div class={gridStyle}>
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
