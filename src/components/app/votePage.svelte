<script lang="ts">
	import type { poll } from '../../functions/firebase';

	import Wrapper from '../Wrapper.svelte';
	import Choices from '../voter/Choices.svelte';
	import VoteInput from '../voter/VoteInput.svelte';
	export let poll: poll;
	let choices = poll.choices;
	let isRestricted = poll.isRestricted;
	let code = '';

	const changeChoicesHandler = (e: CustomEvent<{ choices: string[]; code: string }>) => {
		choices = e.detail.choices;
		code = e.detail.code;
		isRestricted = false;
	};
</script>

<div
	class="sticky top-0 w-full h-16 flex justify-center items-center backdrop-blur-lg bg-[rgba(0,0,0,0.32)]"
>
	<h1 class="text-center">{poll?.name}</h1>
</div>

<Wrapper>
	{#if poll.isOpen}
		{#if !isRestricted}
			<!-- {#if true} -->
			<Choices {choices} {poll} {code} />
		{:else}
			<VoteInput {poll} on:changeChoices={changeChoicesHandler} />
		{/if}
	{:else}
		<h1>This poll is currently not accepting response.</h1>
	{/if}
	<!-- <Choices /> -->
</Wrapper>
