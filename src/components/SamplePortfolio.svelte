<script>
	// Components
	import Stock from '../components/Stock.svelte';
	// Stores
	import { setLoading } from '../stores/loading-stores';
	// Common Scripts
	import { envVariables } from '../scripts/env-variables';

	let symbols = envVariables.isDeveloperMode
		? ['TSLA', 'WM', 'MSFT']
		: ['HD', 'MSFT', 'JNJ', 'KO', 'DIS', 'HON', 'CVX', 'TSLA', 'WM', 'BA'];
	setLoading({ apiIsLoading: true, apiHasFinishedLoading: false });
</script>

{#if symbols.length}
	{#each symbols as symbol}
		<span>
			<Stock {symbol} allowDragAndDrop="false" />
		</span>
	{/each}
{/if}
