<script>
	// Transition
	import { fade } from 'svelte/transition';
	// Stores
	import { setLoading, totalLoaded } from '../stores/loading-stores';
	import { setDragStartStock } from '../stores/drag-and-drop-stores';
	// API
	import fetch_stocks_api from '../api/fetch-stocks';

	export let symbol;
	export let allowDragAndDrop;

	$: stock = {
		symbol,
		percentageChange: '',
		bgColor: 'bg-gray-400',
		fontSize: 'text-base'
	};
	/**
	 * Get detailed stock information
	 * @param {array} symbol
	 * @return {Promise} {"symbol":"TSLA","last_price":"769.59","percentage_change":"+5.71%"}
	 */

	const promise = fetch_stocks_api.stocks([symbol]).then((s) => {
		setLoading({ apiIsLoading: false, apiHasFinishedLoading: true });
		totalLoaded.update((n) => n + 1);

		if (s[0] !== undefined && s[0].hasOwnProperty('percentage_change')) {
			if (s[0].percentageChange !== 'N/A') {
				const [bgColor, fontSize] = get_style_info(s[0].percentage_change);

				stock = {
					symbol,
					percentageChange: s[0].percentage_change,
					bgColor,
					fontSize
				};
			} else {
				stock = {};
			}
			return stock;
		} else {
			return {
				symbol,
				percentageChange: '',
				bgColor: 'bg-gray-400',
				fontSize: 'text-base'
			};
		}
	});

	function get_style_info(percentageChange) {
		const sign = percentageChange[0];
		const bgColor = sign === '+' ? 'bg-green-500' : 'bg-red-500';
		const numericalChange = percentageChange.match(/(?<=\+|\-).+?(?=\%)/);
		let fontSize = '';
		if (numericalChange >= 2 && numericalChange < 3) {
			fontSize = 'text-xl';
		} else if (numericalChange >= 3 && numericalChange < 5) {
			fontSize = 'text-2xl';
		} else if (numericalChange >= 5 && numericalChange < 7) {
			fontSize = 'text-2xl';
		} else if (numericalChange >= 7 && numericalChange < 10) {
			fontSize = 'text-3xl';
		} else if (numericalChange >= 10 && numericalChange < 12) {
			fontSize = 'text-4xl';
		} else if (numericalChange >= 12) {
			fontSize = 'text-6xl';
		} else {
			fontSize = 'text-base';
		}

		fontSize = 'text-3xl';

		return [bgColor, fontSize];
	}

	// Save the stock {} being dragged into the store
	const handleDragStart = (e) => {
		setDragStartStock(stock);
	};
</script>

{#await promise}
	<div
		class={`p-12 bg-gray-300 text-gray-100 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center`}
	>
		Loading...
	</div>
{:then stock}
	<!-- href={`https://finance.yahoo.com/quote/${stock.symbol}?p=${stock.symbol}`} -->
	<div
		class={`${stock.bgColor} ${stock.fontSize} ${
			allowDragAndDrop === 'true' ? 'cursor-move' : 'cursor-default'
		} p-12 text-gray-100 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center`}
		transition:fade
		draggable={`${allowDragAndDrop === 'true' ? 'true' : 'false'}`}
		on:dragstart={handleDragStart}
	>
		<h2>{stock.symbol}</h2>
		<h3>{stock.percentageChange}</h3>
	</div>
{:catch error}
	<p>Error: {error.message}</p>
{/await}
