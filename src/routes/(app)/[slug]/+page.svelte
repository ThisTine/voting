<script>
	import Wrapper from '../../../components/Wrapper.svelte';
</script>

<div
	class="sticky top-0 w-full h-16 flex justify-center items-center backdrop-blur-lg bg-[rgba(0,0,0,0.32)]"
>
	<h1 class="text-center">Title</h1>
</div>

<Wrapper>
	<div class="flex flex-col w-full justify-center gap-11 min-h-[calc(100vh-4rem)]">
		<button class="btn variant-filled-secondary btn-xl w-full">Hello 2</button>
		<button class="btn variant-filled-secondary btn-xl w-full">Hello 2</button>
		<button class="btn variant-filled-secondary btn-xl w-full">Hello 2</button>
	</div>
</Wrapper>
