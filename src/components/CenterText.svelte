<script lang="ts">
	import Wrapper from './Wrapper.svelte';
	export let description: string = '';
	export let title: string = '';
</script>

<Wrapper>
	<div class="h-[calc(100vh-65px)] justify-center items-center flex">
		<div class="flex justify-center flex-col items-center gap-5">
			<h1>{title}</h1>
			<h4>{description}</h4>
		</div>
	</div>
</Wrapper>
