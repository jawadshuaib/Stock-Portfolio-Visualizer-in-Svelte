<script>
	import { fade } from 'svelte/transition';
	import { terms } from '../stores/stock-stores';
	import { loading } from '../stores/loading-stores';
	import Stock from '../components/Stock.svelte';

	$: symbols = [];
	$: apiLoading = false;

	terms.subscribe((ls) => {
		symbols = ls;
	});

	loading.subscribe((l) => {
		apiLoading = l;
	});
</script>

<div class="grid gap-2 py-2 md:grid-cols-2 grid-cols-1">
	{#each symbols as symbol}
		<Stock {symbol} />
	{/each}
</div>
{#if apiLoading}
	<div class="text-center animate-bounce" transition:fade>...</div>
{/if}
