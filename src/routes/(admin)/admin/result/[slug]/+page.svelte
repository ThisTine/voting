<script lang="ts">
	import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';

	import Wrapper from '../../../../../components/Wrapper.svelte';
	import Chart from 'svelte-frappe-charts';
	import { db, type poll, type submission } from '../../../../../functions/firebase';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import LoadingScreen from '../../../../../components/LoadingScreen.svelte';
	import CenterText from '../../../../../components/CenterText.svelte';

	let submissions: submission[] = [];
	let poll: poll;
	let isLoading = true;
	let isFound = false;
	onMount(() => {
		let slug = $page.params.slug;
		const q = query(collection(db, 'submissions'), where('poll_id', '==', slug));
		onSnapshot(q, (docs) => {
			let tempSubmissions: submission[] = [];
			docs.forEach((doc) => {
				tempSubmissions.push(doc.data() as submission);
			});
			submissions = [...tempSubmissions];
		});
		onSnapshot(doc(db, 'polls', slug), (doc) => {
			if (doc.exists()) {
				poll = { ...(doc.data() as poll), _id: doc.id };
				isFound = true;
				isLoading = false;
			}
		});
	});

	$: pollData = poll
		? {
				labels: [...poll.choices],
				datasets: [
					{
						values: poll.choices.map((choice) =>
							submissions.reduce((acc, value) => acc + (value.response === choice ? 1 : 0), 0)
						)
					}
				]
		  }
		: null;
	let data = {
		labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
		datasets: [
			{
				values: [10, 12, 3, 9, 8, 15, 9]
			}
		]
	};
</script>

<Wrapper>
	{#if !isLoading}
		{#if isFound}
			<div class="flex min-h-screen justify-center items-center">
				{#if data}
					<div
						class="w-full flex flex-col justify-center items-center bg-white h-fit p-5 rounded-xl"
					>
						<h1 class="text-black">{poll.name}</h1>
						<div class="h-30 w-full">
							<Chart data={pollData} type="bar" colors={['red']} />
						</div>
					</div>
				{:else}
					<LoadingScreen />
				{/if}
			</div>
		{:else}
			<CenterText title="Not found" />
		{/if}
	{:else}
		<LoadingScreen />
	{/if}
</Wrapper>
