<script lang="ts">
	import type { CHAR } from '$constants/types';
	import { Key } from '$lib/components';

	const rows: CHAR[][] = [
		['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
		['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
		['Z', 'X', 'C', 'V', 'B', 'N', 'M']
	];
</script>

<div class="flex flex-col gap-2 my-5">
	{#each rows as row}
		<div class="flex justify-center gap-2">
			{#each row as key}
				<Key {key} />
			{/each}
		</div>
	{/each}
</div>
