<script>
	import Stock from '../components/Stock.svelte';
	import { setLoading } from '../stores/loading-stores';
	import { envVariables } from '../scripts/env-variables';

	let symbols = envVariables.isProduction
		? ['HD', 'MSFT', 'JNJ', 'KO', 'DIS', 'HON', 'CVX', 'TSLA', 'WM', 'BA']
		: ['TSLA', 'WM'];
	setLoading({ apiIsLoading: true, apiHasFinishedLoading: false });
</script>

{#if symbols.length}
	{#each symbols as symbol}
		<span>
			<Stock {symbol} allowDragAndDrop="false" />
		</span>
	{/each}
{/if}
