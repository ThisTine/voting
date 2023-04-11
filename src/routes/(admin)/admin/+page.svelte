<script type="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import AddPoll from '../../../components/Modal/AddPoll.svelte';
	import Poll from '../../../components/Poll.svelte';
	import { auth, db, type poll } from '../../../functions/firebase';
	import { onMount } from 'svelte';
	import { collection, onSnapshot } from 'firebase/firestore';
	const alert: import('@skeletonlabs/skeleton').ModalSettings = {
		type: 'component',
		// Data
		component: {
			ref: AddPoll
		}
	};
	let polls: poll[] = [];

	onMount(() => {
		onSnapshot(collection(db, 'polls'), { includeMetadataChanges: true }, (querySnapshot) => {
			const tempPolls: poll[] = [];
			querySnapshot.forEach((doc) => {
				tempPolls.push({ _id: doc.id, ...(doc.data() as poll) });
			});

			polls = [...tempPolls];
		});
	});
</script>

<div>
	<div class="flex gap-5 my-5">
		<h1>Hello,Tine</h1>
		<button class="btn variant-filled-error" on:click={() => auth.signOut()}>Logout</button>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 w-full gap-5">
		<button
			class="p-5 backdrop-brightness-50 rounded-lg hover:backdrop-brightness-[25%] cursor-pointer transition-all"
			on:click={() => modalStore.trigger(alert)}
		>
			<h1 class="text-center">+</h1>
		</button>
		{#each polls as poll (poll._id)}
			<Poll {poll} />
		{/each}
	</div>
</div>
