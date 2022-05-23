<script>
	import { initializeApp } from 'firebase/app';
	import { getFirestore, getDoc, doc } from 'firebase/firestore';
	import { envVariables } from '../scripts/env-variables';

	export let portfolioId;

	let name = null,
		stocks = [];
	// Initialize Firebase
	initializeApp(envVariables.firebaseConfig);
	const db = getFirestore();

	const getPortfolioInfo = async (portfolioId) => {
		const snap = await getDoc(doc(db, 'portfolios', portfolioId));

		if (snap.exists()) {
			name = snap.data().name;
			stocks = snap.data().stocks;

			// console.log(snap.data());
		} else {
			console.log('No such document found for portfolio');
		}
	};

	getPortfolioInfo(portfolioId);
</script>

<div>{portfolioId} | {name}</div>
{#each stocks as stock}
	<div>{stock}</div>
{/each}
----------------
