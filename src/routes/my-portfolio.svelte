<script>
	import { browser } from '$app/env';
	// Components
	import Portfolio from '../components/Portfolio.svelte';
	// Common Scripts
	import { getLiveUserPortfolioIds } from '../scripts/firebase';
	import { getUserIdFromLocalStorage } from '../scripts/common-scripts';

	let pids = [];
	const userId = browser ? getUserIdFromLocalStorage() : null;
	// let promise;
	// if (userId !== null) {
	// promise = getUserPortfolioIds(userId).then((p) => {
	// 	//
	// 	if (p !== undefined) {
	// 		pids = p;
	// 		console.log(`pushing `, p);
	// 	}
	// });
	const updateFn = (p) => {
		pids = p;
	};
	if (userId !== null) {
		getLiveUserPortfolioIds(userId, updateFn);
	}
</script>

<h1 class="text-4xl text-center my-8 uppercase">My Portfolio</h1>
<div class="gap-2 py-2">
	<p class="text-xl">
		{#if pids}
			<div>
				{#each pids as pid}
					<Portfolio {pid} />
				{/each}
			</div>
		{:else}
			<p class="text-center">
				There is currently nothing to show here. You can start by <a
					class="underline hover:text-green-500"
					href="/">creating a portfolio</a
				>.
			</p>
		{/if}
	</p>
</div>
