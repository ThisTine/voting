<script>
	import { onMount } from 'svelte';
	import Wrapper from '../../../components/Wrapper.svelte';
	import { auth } from '../../../functions/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { userStore } from '../../../store/user';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import LoadingScreen from '../../../components/LoadingScreen.svelte';
	let isLoaded = false;
	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				userStore.set({ user: { id: user.uid, displayName: user.displayName }, isLoaded: true });
			} else {
				userStore.set({ isLoaded: true });
			}
		});
		userStore.subscribe((user) => {
			isLoaded = user.isLoaded;
			if (user.isLoaded) {
				if (!user.user && $page.route.id !== '/(admin)/admin/login') {
					goto('/admin/login');
				}
				if (user.user && $page.route.id === '/(admin)/admin/login') {
					goto('/admin');
				}
			}
		});
	});
</script>

<svelte:head>
	<title>Admin console</title>
</svelte:head>
<Wrapper>
	{#if !isLoaded}
		<LoadingScreen />
	{:else}
		<slot />
	{/if}
</Wrapper>
