<script lang="ts">
	import { deleteDoc, doc } from 'firebase/firestore';
	import { db, type poll as pollType } from '../../functions/firebase';
	import { modalStore } from '@skeletonlabs/skeleton';

	export let poll: pollType;
	let isLoading = false;
	const deletePoll = () => {
		isLoading = true;
		deleteDoc(doc(db, 'polls', poll._id || ''))
			.then(() => {
				modalStore.close();
			})
			.finally(() => {
				isLoading = false;
			});
	};
</script>

<div class=" card p-4 bg-initial max-w-screen-md w-full shadow-xl flex flex-col gap-5">
	<h2>{poll.name}</h2>
	<div class="card p-4">
		<p>URL</p>
		<button class="chip variant-filled-secondary">https://vote.thistine.com/{poll._id}</button>
	</div>
	<div class="flex card p-4card p-4 flex-wrap gap-2">
		<p class="w-full">Choices</p>
		{#each poll.choices as choice}
			<span class="chip variant-filled">{choice}</span>
		{/each}
	</div>
	<div class="flex self-end gap-5">
		<a class="btn variant-filled-primary" href="/admin/result/{poll._id}">Result</a>
		<button class="btn variant-filled-error w-fit" disabled={isLoading} on:click={deletePoll}
			>{isLoading ? 'Deleting' : 'Delete'}</button
		>
	</div>
</div>
