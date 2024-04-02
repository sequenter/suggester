<script lang="ts">
	import type { Char } from '$constants/types';
	import { Key } from '$lib/components';

	export let onEnter: () => void;

	const rows: Char[][] = [
		['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
		['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
		['DELETE', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER']
	];
</script>

<div class="flex flex-col gap-2">
	{#each rows as row}
		<div class="flex justify-center gap-2">
			{#each row as key}
				<Key {key} {onEnter} />
			{/each}
		</div>
	{/each}
</div>
