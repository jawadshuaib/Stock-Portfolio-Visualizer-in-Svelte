<script>
	import { fade } from 'svelte/transition';
	import { dragStartStock, stocksInDragAndDropArea } from '../stores/drag-and-drop-stores';
	import { terms } from '../stores/stock-stores';
	import Stock from '../components/Stock.svelte';

	let showDragAndDrop = false,
		portfolioName = '',
		showDefaultContent = true;

	$: symbols = [];
	$: draggedStock = null;

	// Get the store value of the latest <Stock> component being dragged
	dragStartStock.subscribe((stock) => {
		draggedStock = stock;
	});

	const handleDragDropped = (e) => {
		// Remove stock from the container
		// removeStocksFromContainer(draggedStock);
		// Save in the drag and drop store
		saveStockInDragAndDropStore(draggedStock);
		// Display all the stocks in the drag and drop area
		displayStocksInDragAndDropArea();
	};

	function saveStockInDragAndDropStore(stock) {
		let ls = [];
		stocksInDragAndDropArea.subscribe((stocks) => {
			ls = stocks;
		});
		stocksInDragAndDropArea.set([...ls, stock.symbol]);
	}

	function removeStocksFromContainer(stock) {
		let stocksToKeepInContainer;
		terms.subscribe((stocks) => {
			stocksToKeepInContainer = stocks.filter((s) => s !== stock.symbol);
		});

		terms.set(stocksToKeepInContainer);
	}

	function handleChange(e) {
		if (e.key === 'Enter') {
			portfolioName = portfolioName.trim();
			if (portfolioName.length) {
				let portfolio = [];
				stocksInDragAndDropArea.subscribe((stocks) => {
					portfolio = stocks;
				});

				// There shouldn't be any duplicate stocks in the drag and drop area
				// But just to be safe, remove them if there are any
				portfolio = [...new Set(portfolio)];

				// userId
				const userId = 1; // uniqueId();
				console.log('portfolioName', portfolioName);
				console.log('portfolio', portfolio);
				console.log('userId', userId);
				// Create user id and save it to localStorage
			}
		}
	}

	const saveToFirebase = (userId, portfolioId, portfolioName, portfolio) => {
		// Save to firebase
	};

	function displayStocksInDragAndDropArea() {
		stocksInDragAndDropArea.subscribe((stocks) => {
			symbols = stocks;
		});
		symbols = [...new Set(symbols)];
		// Hide default content
		showDefaultContent = !symbols.length ? true : false;
	}
</script>

{#if !showDragAndDrop}
	<!-- Button: Save Portfolio -->
	<div class="text-center">
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			on:click={() => {
				showDragAndDrop = true;
			}}
		>
			Save this Portfolio
		</button>
	</div>
{:else}
	<div class="bg-indigo-50 rounded-md p-3">
		<!-- Input: Portfolio Name -->
		<div class="text-center">
			<input
				bind:value={portfolioName}
				on:keypress={handleChange}
				type="text"
				placeholder="Portfolio Name"
				class="text-center border-2 border-blue-500 hover:border-blue-700 text-black py-2 px-4 rounded"
			/>
		</div>

		<!-- Div: Drag and Drop Area -->
		<div
			class="my-2 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
			transition:fade
			on:drop={handleDragDropped}
			ondragover="return false"
		>
			{#if showDefaultContent}
				<div
					class="my-2 flex justify-center w-full h-32 px-4 transition bg-zinc-50 border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
				>
					<span class="flex items-center space-x-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-star"
							viewBox="0 0 16 16"
						>
							<path
								d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
							/>
						</svg>
						<span class="font-medium text-gray-600"> Drag and Drop Stocks to Save </span>
					</span>
				</div>
			{:else}
				<div class={`grid gap-2 py-2 grid-cols-4`}>
					{#if symbols.length}
						{#each symbols as symbol}
							<span>
								<Stock {symbol} allowDragAndDrop="true" />
							</span>
						{/each}
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}
