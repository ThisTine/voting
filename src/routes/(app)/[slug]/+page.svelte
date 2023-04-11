<script lang="ts">
	import Wrapper from '../../../components/Wrapper.svelte';
	import Choices from '../../../components/voter/Choices.svelte';
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import VoteInput from '../../../components/voter/VoteInput.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { db, type poll } from '../../../functions/firebase';
	import VotePage from '../../../components/app/votePage.svelte';

	let poll: poll;
	let isLoading = true;
	onMount(() => {
		let slug = $page.params.slug;
		onSnapshot(doc(db, 'polls', slug), { includeMetadataChanges: true }, (doc) => {
			if (doc.data()) {
				poll = { ...(doc.data() as poll), _id: doc.id };
			}
			isLoading = false;
		});
	});
</script>

{#if isLoading}
	<p>Loding...</p>
{:else}
	<VotePage {poll} />
{/if}
