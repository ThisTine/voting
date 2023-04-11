<script lang="ts">
	import { auth } from '../../../../functions/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { toastStore } from '@skeletonlabs/skeleton';
	let isLoading = false;
	let username = '';
	let password = '';
	const login = (e: SubmitEvent) => {
		e.preventDefault();
		isLoading = true;

		signInWithEmailAndPassword(auth, username, password)
			.then(() => {
				toastStore.trigger({ message: 'Success', background: 'variant-filled-primary' });
			})
			.catch((e) => {
				toastStore.trigger({ message: `Error : ${e} `, background: 'variant-filled-error' });
			})
			.finally(() => {
				isLoading = false;
			});
	};
</script>

<div class="flex justify-center mt-10">
	<div
		class="backdrop-brightness-75 max-w-screen-md p-10 rounded-3xl justify-center items-center flex flex-col w-full"
	>
		<h1 class="w-fit">Login</h1>
		<form on:submit={login} class="w-full mt-5 gap-5 flex flex-col">
			<input class="input text-xl" placeholder="Username" bind:value={username} />
			<input class="input text-xl" type="password" placeholder="Password" bind:value={password} />
			<button class="btn variant-filled-primary btn-lg" disabled={isLoading}>
				{#if isLoading}
					Logging in
				{:else}
					Login
				{/if}
			</button>
		</form>
	</div>
</div>
