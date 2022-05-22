/**
 * Decide how many columns to show in the grid (either one or two)
 */
import { writable } from "svelte/store";

export const totalColumnsToDisplay = writable (2);
