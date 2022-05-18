import { writable } from 'svelte/store';

/**
 * Keep track of when an action is loading
 * @param {Boolean} isLoading
 */

const setLoading = (isLoading=false) => {
  loading.set(isLoading);
}

const loading = writable(false);

export { setLoading, loading };
