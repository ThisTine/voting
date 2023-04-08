<script lang="ts">
	import Wrapper from '../../components/Wrapper.svelte';
	let data: string = '';
</script>

<Wrapper>
	<div class="flex justify-center h-screen items-center">
		<div class="gap-3 flex flex-col w-full items-center max-w-screen-md">
			<div class="mb-10 text-center">
				<h1 class="mb-5">Vote</h1>
				<h4>You don't appear to have chosen which voting form, so please enter your voting ID.</h4>
			</div>
			<input bind:value={data} class="input px-4 py-3 text-xl" placeholder="Voting id" />
			<a class="btn variant-filled-primary btn-lg w-full" href="/{data}">Vote</a>
		</div>
	</div>
</Wrapper>
