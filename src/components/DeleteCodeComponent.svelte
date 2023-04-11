<script lang="ts">
	import { doc, updateDoc } from 'firebase/firestore';
	import { db, type poll } from '../functions/firebase';

	export let poll: poll;
	export let choices: string[];
	export let name: string;

	let code: string = '';
	let isLoading = false;

	const deleteCode = () => {
		isLoading = true;
		const usersMapped: any = poll.users.map((item) => {
			if (JSON.stringify(item.choices.sort()) === JSON.stringify(choices.sort())) {
				return { ...item, users: item.users.filter((item) => item !== name) };
			}
			return item;
		});

		updateDoc(doc(db, 'polls', poll._id || ''), { users: usersMapped })
			.then((item) => {
				code = '';
			})
			.finally(() => {
				isLoading = false;
			});
	};
</script>

<button
	class="flex justify-self-end btn variant-filled-error"
	on:click={deleteCode}
	disabled={isLoading}>{isLoading ? 'deleting' : 'delete'}</button
>
