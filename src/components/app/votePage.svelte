<script lang="ts">
	import { doc, onSnapshot } from 'firebase/firestore';
	import { db, type poll } from '../../functions/firebase';
	import CenterText from '../CenterText.svelte';

	import Wrapper from '../Wrapper.svelte';
	import Choices from '../voter/Choices.svelte';
	import VoteInput from '../voter/VoteInput.svelte';
	import LoadingScreen from '../LoadingScreen.svelte';
	export let poll: poll;
	let choices = poll.choices;
	let isRestricted = poll.isRestricted;
	let code = '';
	let voted = false;
	let isLoadingSubmission = false;
	$: getSubmission(code);
	const getSubmission = (code: string) => {
		if (code) {
			onSnapshot(
				doc(db, 'submissions', `${poll._id}-${code}`),
				{ includeMetadataChanges: true },
				(doc) => {
					isLoadingSubmission = false;
					if (doc.exists()) {
						voted = true;
					}
				}
			);
		}
	};

	const changeChoicesHandler = (e: CustomEvent<{ choices: string[]; code: string }>) => {
		isLoadingSubmission = true;
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
			{#if !voted}
				<!-- {#if true} -->
				{#if !isLoadingSubmission}
					<Choices {choices} {poll} {code} />
				{:else}
					<LoadingScreen />
				{/if}
			{:else}
				<CenterText
					title="You've voted"
					description="Thank you for your response,This code has voted."
				/>
			{/if}
		{:else}
			<VoteInput {poll} on:changeChoices={changeChoicesHandler} />
		{/if}
	{:else}
		<CenterText
			title="Sorry, we are closed"
			description="This poll is currently not accepting response."
		/>
	{/if}
	<!-- <Choices /> -->
</Wrapper>
