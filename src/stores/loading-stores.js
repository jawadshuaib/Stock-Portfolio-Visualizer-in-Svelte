import { writable } from 'svelte/store';

/**
 * Keep track of when an action is loading
 * @param {Boolean} apiIsLoading
 * @param {Boolean} apiHasFinishedLoading
 */

const setLoading = (status = { apiIsLoading: false, apiHasFinishedLoading: false }) => {
  loading.set(status);
}

const loading = writable({ apiIsLoading: false, apiHasFinishedLoading: false });

const totalLoaded = writable (0);

export { setLoading, loading, totalLoaded };
