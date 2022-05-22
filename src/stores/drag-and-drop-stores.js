import { writable } from "svelte/store";

const setDragStartStock = (stock) => {
  dragStartStock.set(stock);
}

// const setStocksInDragAndDropArea = (stocks) => {
//   // let existingStocksInDragAndDropArea = stocksInDragAndDropArea;
//   stocksInDragAndDropArea.set(stocks);
// }

const dragStartStock = writable({});
const stocksInDragAndDropArea = writable([]);

export { dragStartStock, setDragStartStock, stocksInDragAndDropArea};