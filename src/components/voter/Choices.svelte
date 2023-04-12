<script lang="ts">
	import {
		DocumentReference,
		addDoc,
		collection,
		doc,
		setDoc,
		type DocumentData
	} from 'firebase/firestore';
	import { db, type poll } from '../../functions/firebase';
	import CenterText from '../CenterText.svelte';

	export let choices: string[];
	export let poll: poll;
	export let code: string;

	let sent = false;
	let isLoading = false;
	const sendResponse = (choice: string) => {
		let data = { response: choice, poll_id: poll._id, code };
		isLoading = true;
		let query: () => Promise<DocumentReference<DocumentData>> | Promise<void>;
		if (code) {
			query = () => setDoc(doc(db, 'submissions', `${poll._id}-${code}`), data);
		} else {
			query = () => addDoc(collection(db, 'submissions'), data);
		}
		query()
			.then(() => {
				sent = true;
			})
			.finally(() => {
				isLoading = false;
			});
	};
</script>

{#if sent}
	<CenterText
		title="Thank you for your response"
		description="You've voted, thank you for paticipating."
	/>
{:else}
	<div class="flex flex-col w-full justify-center gap-11 min-h-[calc(100vh-4rem)]">
		{#each choices as choice}
			<button
				class="btn variant-filled-secondary btn-xl w-full"
				disabled={isLoading}
				on:click={() => sendResponse(choice)}>{choice}</button
			>
		{/each}
	</div>
{/if}
