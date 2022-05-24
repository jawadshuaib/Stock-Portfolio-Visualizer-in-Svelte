<script context="module">
	export async function load({ params }) {
		// `params.id` comes from [id].js
		const portfolioId = params.id;

		if (portfolioId) {
			return {
				props: {
					portfolioId
				}
			};
		}

		return {
			status: 404
		};
	}
</script>

<script>
	// Components
	import Stock from '../../components/Stock.svelte';
	// Firebase
	import { initializeApp } from 'firebase/app';
	import { getFirestore, getDoc, doc } from 'firebase/firestore';
	// Common Scripts
	import { envVariables } from '../../scripts/env-variables';

	export let portfolioId;

	let name = null,
		stocks = [],
		totalStocks = 0;
	$: totalGridColumns = '1';

	// Initialize Firebase
	initializeApp(envVariables.firebaseConfig);
	const db = getFirestore();

	const getPortfolioInfo = async (portfolioId) => {
		const snap = await getDoc(doc(db, 'portfolios', portfolioId));
		if (snap.exists()) {
			name = snap.data().name;
			stocks = snap.data().stocks;
			totalStocks = stocks.length;
			totalGridColumns = totalStocks > 4 ? '4' : totalStocks;
		} else {
			console.log('No such document found for portfolio');
		}
		return {
			name,
			stocks,
			totalStocks,
			totalGridColumns
		};
	};

	const pid = getPortfolioInfo(portfolioId);
</script>

<div class="text-center">
	{#await pid}
		<p class="text-xl gap-2 py-2">Loading...</p>
	{:then portfolio}
		{#if portfolio.totalStocks}
			<h1 class="text-4xl my-8 uppercase">{portfolio.name}</h1>
			<div class={`grid gap-2 py-2 grid-cols-${totalGridColumns} md:grid-cols-${totalGridColumns}`}>
				{#each stocks as stock}
					<Stock symbol={stock} allowDragAndDrop="false" />
				{/each}
			</div>
		{:else}
			<p class="text-xl gap-2 py-2">Sorry, we did not find any stocks for this portfolio.</p>
		{/if}
	{/await}
</div>
