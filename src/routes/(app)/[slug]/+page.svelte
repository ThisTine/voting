<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { db, type poll } from '../../../functions/firebase';
	import VotePage from '../../../components/app/votePage.svelte';
	import LoadingScreen from '../../../components/LoadingScreen.svelte';

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
	<LoadingScreen />
{:else}
	<VotePage {poll} />
{/if}
