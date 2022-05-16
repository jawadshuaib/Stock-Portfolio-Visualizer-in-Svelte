<script context="module">
	// import { fetchStocksStore } from '../stores/fetch-stocks-store';
	import fetch_stocks_api from '../api/fetch-stocks';

	fetch_stocks_api.all(['MSFT', 'AAPL', 'TSLA', 'ARKK']).then((stocks) => {
		// console.log('stocks', stocks);
		stocks.forEach(async (stock) => {
			stock.then((data) => {
				console.log('data', data);
			});
		});
	});

	// tickers.forEach(async (ticker) => {
	// 	const isEtf = await fetch_stocks_api.is_etf(ticker);
	// 	if (isEtf) {
	// 		const etf = await fetch_stocks_api.etf(ticker);
	// 		// Remove etf from tickers
	// 		tickers = tickers.filter((x) => x !== ticker);
	// 		// Get holdings from the etf
	// 		const holdings = etf.map((holding) => holding.symbol);
	// 		const updatedTickers = tickers.concat(holdings);
	// 		console.log(updatedTickers);
	// 	}
	// });
</script>

<!-- 
{#await stocks}
	<p>Waiting for portfolio to load...</p>
{:then stocks}
	<p>Here is your portfolio</p>
	{#each stocks as stock}
		<p>{stock.symbol} | {stock.last_price} | {stock.percentage_change}</p>
	{/each}
{:catch error}
	<p>Error: {error.message}</p>
{/await} -->
<!-- {#each stocks as stock}
	<p>{stock.symbol} | {stock.last_price} | {stock.percentage_change}</p>
{/each} -->
<!-- {#await stocks then stocks}
	<p>Here is your portfolio</p>
	{#each stocks as stock}
		<p>{stock.symbol} | {stock.last_price} | {stock.percentage_change}</p>
	{/each}
{/await} -->
