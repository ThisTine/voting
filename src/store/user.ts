import { writable } from 'svelte/store';
export const userStore = writable<{
	user?: { id: string; displayName: string | null };
	isLoaded: boolean;
}>({ isLoaded: false });
