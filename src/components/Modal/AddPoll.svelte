<script lang="ts">
	import { InputChip, modalStore, toastStore } from '@skeletonlabs/skeleton';
	import { db } from '../../functions/firebase';
	import { addDoc, collection } from 'firebase/firestore';
	let choices: string[] = [];
	let isLoading = false;
	let name = '';
	const addpoll = (e: SubmitEvent) => {
		e.preventDefault();
		isLoading = true;
		addDoc(collection(db, 'polls'), {
			name,
			choices,
			isOpen: false,
			isRestricted: false,
			users: []
		})
			.then(() => {
				toastStore.trigger({ message: 'Successfully added poll' });
				modalStore.close();
			})
			.catch((e) => {
				toastStore.trigger({ message: `error : ${e}`, background: 'variant-filled-error' });
			})
			.finally(() => {
				isLoading = false;
			});
	};
</script>

<div class=" card p-4 bg-initial max-w-screen-md w-full shadow-xl">
	<h2>Add poll</h2>
	<div class="card mt-5 p-4">
		<form class="gap-4 flex flex-col" on:submit={addpoll}>
			<label class="label">
				<span>Name</span>
				<input class="input" required placeholder="CS Let's cook" bind:value={name} />
			</label>
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span>Choices</span>
				<InputChip
					bind:value={choices}
					name="Choices"
					placeholder="Type then enter the value"
					allowDuplicates={false}
					required
					auto-complete="none"
				/>
			</label>
			<button class="btn variant-filled-primary btn-md" disabled={isLoading}
				>{isLoading ? 'Adding poll' : 'Add poll'}</button
			>
		</form>
	</div>
</div>
