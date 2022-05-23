<script>
	import { initializeApp } from 'firebase/app';
	import { getFirestore, getDoc, doc } from 'firebase/firestore';
	import { envVariables } from '../scripts/env-variables';

	export let portfolioId;

	// Initialize Firebase
	initializeApp(envVariables.firebaseConfig);
	const db = getFirestore();

	const getPortfolioInfo = async (portfolioId) => {
		const snap = await getDoc(doc(db, 'portfolios', portfolioId));

		if (snap.exists()) {
			console.log(snap.data());
		} else {
			console.log('No such document found for portfolio');
		}
	};

	getPortfolioInfo(portfolioId);
</script>

<div>{portfolioId}</div>
