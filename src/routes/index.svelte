<script>
	import { browser } from '$app/env';
	import { loading } from '../stores/loading-stores';
	import { terms } from '../stores/stock-stores';
	import { userId as userIdStores } from '../stores/user-id-stores.js';
	import Search from '../components/Search.svelte';
	import StocksContainer from '../components/StocksContainer.svelte';
	import CreatePortfolio from '../components/CreatePortfolio.svelte';
	import { generateUniqueId } from '../scripts/common-scripts';

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
		setupUserId();
	}

	function setupUserId() {
		let userId = getUserIdFromLocalStorage();
		if (userId === null) {
			// Generate a new user id if one doesn't exist
			userId = generateUniqueId();
			// Save to stores. Note we only set using our own generated unique id
			// When we upload to Firebase, we will be used the stored values not local storage
			// This is a security precaution to prevent users from injecting their own user id to Firebase
			userIdStores.set(userId);
			// Save user id to local storage
			saveUserIdToLocalStorage(userId);
		}
	}

	function getUserIdFromLocalStorage() {
		return localStorage.getItem('userId');
	}

	function saveUserIdToLocalStorage(userId) {
		localStorage.setItem('userId', userId);
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
