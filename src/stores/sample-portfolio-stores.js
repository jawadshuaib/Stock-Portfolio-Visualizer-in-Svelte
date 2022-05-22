import { writable } from 'svelte/store';

let displaySamplePortfolio = writable(true);

const samplePortfolio = writable([]);
samplePortfolio.set (['TSLA', 'WM']);
// ['TSLA', 'WM', 'HD', 'JNJ', 'SHOP', 'NEM']
export { samplePortfolio, displaySamplePortfolio };

