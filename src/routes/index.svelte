<script>
	import { browser } from '$app/env';
	// Stores
	import { loading } from '../stores/loading-stores';
	import { terms } from '../stores/stock-stores';
	// Components
	import Search from '../components/Search.svelte';
	import StocksContainer from '../components/StocksContainer.svelte';
	import CreatePortfolio from '../components/CreatePortfolio.svelte';
	// Common Scripts
	import { createFirebaseUser } from '../scripts/firebase';
	import { getUserIdFromLocalStorage, saveUserIdToLocalStorage } from '../scripts/common-scripts';

	$: apiHasFinishedLoading = false;
	$: haveUserSearchTerms = false;

	terms.subscribe((stocks) => {
		haveUserSearchTerms = stocks.length ? true : false;
	});

	loading.subscribe((l) => {
		apiHasFinishedLoading = l.apiHasFinishedLoading;
	});

	// Setup user id for local storage
	if (browser) {
		let userId = getUserIdFromLocalStorage();
		if (userId === null) {
			createFirebaseUser().then((userId) => {
				if (userId) {
					// Save user id to local storage
					saveUserIdToLocalStorage(userId);
				}
			});
		}
	}
</script>

<h1 class="text-4xl text-center my-8 uppercase">Portfolio Visualizer</h1>
<Search />
<StocksContainer />
{#if apiHasFinishedLoading}
	{#if haveUserSearchTerms}
		<CreatePortfolio />
	{:else}
		<div class="my-4 text-xl text-gray-400 text-center">
			This is a sample portfolio. You can create your own using the search bar above.
		</div>
	{/if}
{/if}
