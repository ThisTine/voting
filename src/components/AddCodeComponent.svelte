<script lang="ts">
	import { doc, updateDoc } from 'firebase/firestore';
	import { db, type poll } from '../functions/firebase';

	export let poll: poll;
	export let choices: string[];

	let code: string = '';
	let namesList: string[] = [];
	$: updateNames(poll.users);
	const updateNames = (names: { users: string[] }[]) => {
		let tempName: string[] = [];
		names.forEach((item) => {
			item.users.forEach((item) => tempName.push(item));
		});
		namesList = tempName;
	};
	// $: names = poll.users.map(item=>item.users).map(item=>item.)
	$: disable = namesList.includes(code);

	const addCode = (e: SubmitEvent) => {
		e.preventDefault();
		const usersMapped: any = poll.users.map((item) => {
			if (JSON.stringify(item.choices.sort()) === JSON.stringify(choices.sort())) {
				return { ...item, users: [...item.users, code] };
			}
			return item;
		});
		updateDoc(doc(db, 'polls', poll._id || ''), { users: usersMapped }).then((item) => {
			code = '';
		});
	};
</script>

<form on:submit={addCode} class="flex w-full gap-2">
	<input required placeholder="Code" class="input" bind:value={code} />
	<button class="btn variant-filled-success" disabled={disable}>Add</button>
</form>
