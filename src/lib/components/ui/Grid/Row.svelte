<script lang="ts">
	import { Tile } from '$lib/components';
	import type { TileType } from '$constants/types';

	export let row = 0;
	export let type: TileType;
</script>

<div class="flex gap-2 mt-2">
	{#each { length: 5 } as _, index}
		<Tile {index} {row} {type} />
	{/each}
</div>
