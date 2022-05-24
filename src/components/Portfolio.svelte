<script>
	import { browser } from '$app/env';
	// Firebase
	import { initializeApp } from 'firebase/app';
	import { getFirestore, getDoc, doc, updateDoc, deleteField } from 'firebase/firestore';
	// Components
	import Stock from '../components/Stock.svelte';
	// Common Scripts
	import { envVariables } from '../scripts/env-variables';
	import { getUserIdFromLocalStorage } from '../scripts/common-scripts';
	import { removePortfolioFromFirebase } from '../scripts/firebase';

	export let pid;
	let name = null,
		stocks = [],
		portfolioId = pid.portfolioId;

	$: totalGridColumns = '1';
	// Initialize Firebase
	initializeApp(envVariables.firebaseConfig);
	const db = getFirestore();

	const getPortfolioInfo = async (portfolioId) => {
		const snap = await getDoc(doc(db, 'portfolios', portfolioId));

		if (snap.exists()) {
			name = snap.data().name;
			stocks = snap.data().stocks;
			const totalStocks = stocks.length;

			totalGridColumns = totalStocks > 4 ? '4' : totalStocks;
		} else {
			console.log('No such document found for portfolio');
		}
	};

	getPortfolioInfo(portfolioId);

	function didClickRemoveRecord(e) {
		deletePortfolioFromFirebase();
	}

	function deletePortfolioFromFirebase() {
		const userId = browser ? getUserIdFromLocalStorage() : null;
		if (userId) {
			// Remove portfolio from the user's portfolio list
			removePortfolioFromFirebase(userId, portfolioId).then(() => {
				window.location.href = '/my-portfolio';
				// console.log('Portfolio removed from firebase', userId, portfolioId);
			});
		} else {
			console.log('User ID not found');
		}
	}
</script>

<h1 class="text-3xl py-5  font-medium">{name}</h1>
<div class={`grid gap-2 py-2 grid-cols-${totalGridColumns} md:grid-cols-${totalGridColumns}`}>
	{#each stocks as stock}
		<Stock symbol={stock} allowDragAndDrop="false" />
	{/each}
</div>
<div class="flex w-full justify-end opacity-60">
	<!-- Perma Link -->
	<div>
		<a
			href="/perma-link/{portfolioId}"
			title="View a link to the portfolio that can be shared with others"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="1"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
				/>
			</svg>
		</a>
	</div>
	<!-- Remove Record from User -->
	<div
		class="cursor-pointer"
		on:click={() => {
			didClickRemoveRecord();
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="1"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
			/>
		</svg>
	</div>
</div>
