<script>
	import Stock from '../components/Stock.svelte';
	import { setLoading } from '../stores/loading-stores';
	import { envVariables } from '../scripts/env-variables';

	let symbols = envVariables.isDeveloperMode
		? ['TSLA', 'WM']
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
