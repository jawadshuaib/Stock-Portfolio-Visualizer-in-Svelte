<script>
	import { browser } from '$app/env';
	// Components
	import Portfolio from '../components/Portfolio.svelte';
	// Common Scripts
	import { getUserPortfolioIds } from '../scripts/firebase';
	import { getUserIdFromLocalStorage } from '../scripts/common-scripts';

	let userPortfolioIds = [];
	const userId = browser ? getUserIdFromLocalStorage() : null;

	if (userId !== null) {
		getUserPortfolioIds(userId).then((ids) => {
			userPortfolioIds = ids;
		});
	}
</script>

<h1 class="text-4xl text-center my-8 uppercase">My Portfolio</h1>
<div class="gap-2 py-2">
	<p class="text-xl">
		{#if userPortfolioIds.length}
			<div>
				{#each userPortfolioIds as portfolioId}
					<Portfolio {portfolioId} />
				{/each}
			</div>
		{:else}
			There is currently nothing to show here. Please <a href="/">create a portfolio</a>.
		{/if}
	</p>
</div>
