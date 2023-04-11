import { writable } from 'svelte/store';
import type { poll } from '../functions/firebase';

export const selectedPoll = writable<poll | null>(null);
