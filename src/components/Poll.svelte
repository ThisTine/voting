<script lang="ts">
	import { SlideToggle, modalStore } from '@skeletonlabs/skeleton';
	import PollInfo from './Modal/PollInfo.svelte';
	import AddCode from './Modal/AddCode.svelte';
	import { db, type poll as pollType } from '../functions/firebase';
	import { doc, updateDoc } from 'firebase/firestore';
	import { selectedPoll as selectedPollStore } from '../store/selectedPoll';
	export let poll: pollType = {} as pollType;
	$: checked = poll.isOpen;
	const pollInfoModal: import('@skeletonlabs/skeleton').ModalSettings = {
		type: 'component',
		component: {
			ref: PollInfo,
			props: { poll }
		}
	};
	const addCodeComponent = {
		ref: AddCode,
		props: { poll }
	};
	const addCodeModal: import('@skeletonlabs/skeleton').ModalSettings = {
		type: 'component',
		component: addCodeComponent
	};
	let isLoading = false;
	const changeOpen = (id: string, value: boolean) => {
		isLoading = true;
		console.log(value);

		updateDoc(doc(db, 'polls', id), { isOpen: value }).finally(() => {
			isLoading = false;
		});
	};
	const updateCheck = (v: Event) => {
		changeOpen(poll._id || '', (v.target as any).checked);
	};

	let selectedPoll: pollType | null;

	selectedPollStore.subscribe((spoll) => {
		selectedPoll = spoll;
	});

	$: updateSelectedPoll(poll);
	const updateSelectedPoll = (poll: pollType) => {
		// console.log('Checking', selectedPoll?._id, poll._id);

		if (selectedPoll && selectedPoll._id === poll._id) {
			selectedPollStore.set(poll);
		}
	};
</script>

<div class="card p-2 min-h-[200px] flex gap-3 flex-col">
	<h3 class="text-center">{poll.name}</h3>
	<SlideToggle
		name="is-closed"
		active="bg-green-500"
		{checked}
		on:change={updateCheck}
		disable={isLoading}>{checked ? 'Open' : 'Closed'}</SlideToggle
	>
	<button class="btn variant-filled-secondary" on:click={() => modalStore.trigger(addCodeModal)}
		>Add code</button
	>
	<button
		class="btn variant-filled-primary"
		on:click={() => {
			modalStore.trigger(pollInfoModal);
		}}>Info</button
	>
</div>
