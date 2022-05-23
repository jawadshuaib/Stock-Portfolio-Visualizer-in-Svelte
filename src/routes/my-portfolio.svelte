<script>
	import { browser } from '$app/env';
	// Components
	import Portfolio from '../components/Portfolio.svelte';
	// Common Scripts
	import { getUserPortfolioIds } from '../scripts/firebase';
	import { getUserIdFromLocalStorage } from '../scripts/common-scripts';

	let pids = [];
	const userId = browser ? getUserIdFromLocalStorage() : null;

	if (userId !== null) {
		getUserPortfolioIds(userId).then((p) => {
			pids = p;
		});
	}
</script>

<h1 class="text-4xl text-center my-8 uppercase">My Portfolio</h1>
<div class="gap-2 py-2">
	<p class="text-xl">
		{#if pids.length}
			<div>
				{#each pids as pid}
					<Portfolio {pid} />
				{/each}
			</div>
		{:else}
			<p class="text-center">
				There is currently nothing to show here. Please <a
					class="underline hover:text-green-500"
					href="/">create a portfolio</a
				>.
			</p>
		{/if}
	</p>
</div>
