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
	}
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
