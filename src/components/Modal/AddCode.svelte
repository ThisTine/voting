<script lang="ts">
	import { Accordion, AccordionItem, SlideToggle } from '@skeletonlabs/skeleton';
	import { db, type poll } from '../../functions/firebase';
	import { doc, updateDoc } from 'firebase/firestore';
	import { selectedPoll } from '../../store/selectedPoll';
	import { onMount } from 'svelte';
	import AddCodeComponent from '../AddCodeComponent.svelte';
	import DeleteCodeComponent from '../DeleteCodeComponent.svelte';

	export let poll: poll;

	$: choices = poll.choices || [];

	let selectedChoices: string[] = [];

	let filter = (f: string) => {
		if (selectedChoices.includes(f)) selectedChoices = selectedChoices.filter((item) => item !== f);
		else selectedChoices = [...selectedChoices, f];
	};
	$: isdisable =
		poll.users
			.map((item) => item.choices.sort())
			.filter((item) => JSON.stringify(item) === JSON.stringify(selectedChoices.sort())).length > 0;

	selectedPoll.subscribe((spoll) => {
		if (spoll) poll = spoll;
	});
	const addCombination = () => {
		updateDoc(doc(db, 'polls', poll._id || ''), {
			users: [...poll.users, { choices: selectedChoices, users: [] }]
		}).finally(() => (selectedChoices = []));
	};
	onMount(() => {
		selectedPoll.set(poll);
	});
	let isLoading = false;
	const changeRestricted = (id: string, value: boolean) => {
		isLoading = true;
		updateDoc(doc(db, 'polls', id), { isRestricted: value }).finally(() => {
			isLoading = false;
		});
	};
	const updateCheck = (v: Event) => {
		changeRestricted(poll._id || '', !poll.isRestricted);
	};
</script>

<div class=" card p-4 bg-initial max-w-screen-md w-full shadow-xl flex flex-col gap-5">
	<h2>Add voting code</h2>
	<SlideToggle
		name="isRestricted"
		active="variant-filled-primary"
		checked={poll.isRestricted}
		disable={isLoading}
		on:click={updateCheck}>{poll.isRestricted ? 'Restricted' : 'Not Restricted'}</SlideToggle
	>
	<div class="card p-4 flex flex-col">
		<p>Choices combination</p>
		<div class="flex gap-3 my-3">
			{#each choices as choice}
				<span
					class="chip {selectedChoices.includes(choice) ? 'variant-filled' : 'variant-soft'}"
					on:click={() => {
						filter(choice);
					}}
					on:keypress
				>
					{#if selectedChoices.includes(choice)}<span>✔️</span>{/if}
					<span class="capitalize">{choice}</span>
				</span>
			{/each}
		</div>
		<button
			class="btn variant-filled-success flex self-end"
			on:click={addCombination}
			disabled={isdisable}>Add combination</button
		>
	</div>
	<Accordion>
		{#each poll.users as usersChoices, ind}
			<AccordionItem open={!ind}>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">{usersChoices.choices.toString()}</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="flex gap-2">
						<AddCodeComponent {poll} choices={usersChoices.choices} />
					</div>
					<ul class="list">
						{#each usersChoices.users as code (code)}
							<li class="bg-surface-900 flex">
								<!-- <span>(icon)</span> -->
								<span class="flex-auto ml-3">{code}</span>
								<DeleteCodeComponent {poll} choices={usersChoices.choices} name={code} />
							</li>
						{/each}
					</ul>
				</svelte:fragment>
			</AccordionItem>
		{/each}
	</Accordion>
</div>
