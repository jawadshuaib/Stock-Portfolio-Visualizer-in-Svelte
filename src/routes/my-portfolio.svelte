<script>
	import { browser } from '$app/env';
	import { getUserPortfolioIds } from '../scripts/get-user-portfolio-ids-from-firebase';
	import { getUserIdFromLocalStorage } from '../scripts/common-scripts';
	import Portfolio from '../components/Portfolio.svelte';
	import { updateFirebaseUser } from '../scripts/update-firebase-user';
	// import { userId as userIdStores } from '../stores/user-id-stores.js';

	let userPortfolioIds = [];
	const userId = browser ? getUserIdFromLocalStorage() : null;

	if (userId !== null) {
		getUserPortfolioIds(userId).then((ids) => {
			userPortfolioIds = ids;
		});

		updateFirebaseUser(userId, 'lmn');
	}

	// const userId = '59-c99d-e94';

	// // const colRef = collection(db, 'users');
	// const uid = generateUniqueId('xx-xxxx-xxx');
	// // const pid1 = generateUniqueId('1xxxy');
	// const pids = [generateUniqueId('1xxxy'), generateUniqueId('1xxxy'), generateUniqueId('1xxxy')];

	// Saves a new message to Cloud Firestore.
	// async function saveMessage() {
	// 	// Add a new message entry to the Firebase database.
	// 	try {
	// 		await addDoc(collection(db, 'users'), {
	// 			[uid]: {
	// 				pids
	// 			}
	// 			// [uid]: {
	// 			// 	[pid]: {
	// 			// 		name: 'Portfolio Name',
	// 			// 		stocks: ['AAPL', 'MSFT', 'GOOG']
	// 			// 	}
	// 			// }
	// 		});
	// 	} catch (error) {
	// 		console.error('Error writing new message to Firebase Database', error);
	// 	}
	// }

	// function getUserPortfolioIds() {
	// 	// Create the query to load the last 12 messages and listen for new ones.
	// 	const portfolios = query(collection(db, 'users'), where(documentId(), '==', userId));
	// 	let data;
	// 	// Start listening to the query.
	// 	onSnapshot(portfolios, function (snapshot) {
	// 		snapshot.docChanges().forEach(function (change) {
	// 			data = change.doc.data();
	// 			console.log(data);
	// 		});
	// 	});
	// }

	// getUserPortfolioIds();

	// saveMessage();
</script>

{#if userPortfolioIds.length}
	<div>
		{#each userPortfolioIds as portfolioId}
			<Portfolio {portfolioId} />
		{/each}
	</div>
{:else}
	There is currently nothing to show here. Please <a href="/">create a portfolio</a>.
{/if}
