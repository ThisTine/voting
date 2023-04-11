<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Wrapper from '../Wrapper.svelte';
	import type { poll } from '../../functions/firebase';
	import { toastStore } from '@skeletonlabs/skeleton';
	export let poll: poll;
	let code = '';
	const dispatch = createEventDispatcher();
	const submitVotingCode = (e: SubmitEvent) => {
		e.preventDefault();
		let choices: string[] = [];
		poll.users.forEach((item) => {
			item.users.forEach((user) => {
				if (user === code) {
					choices = item.choices;
				}
			});
		});
		if (choices.length > 0) {
			dispatch('changeChoices', { choices: choices, code });
		} else {
			toastStore.trigger({
				message: 'You entered the wrong code !',
				background: 'variant-filled-error'
			});
		}
	};
</script>

<Wrapper>
	<div class="flex justify-center min-h-[calc(100vh-4rem)] items-center">
		<form
			on:submit={submitVotingCode}
			class="gap-3 flex flex-col w-full items-center max-w-screen-md"
		>
			<div class="mb-10 text-center">
				<h1 class="mb-5">What's your code</h1>
				<h4>This vote need access code to grand voting access</h4>
			</div>
			<input class="input px-4 py-3 text-xl" placeholder="Code" bind:value={code} />
			<button class="btn variant-filled-primary btn-lg w-full">Vote</button>
		</form>
	</div>
</Wrapper>
