<script lang="ts">
	import { Row } from '$lib/components';
</script>

<div class="flex flex-col gap-3">
	<div class="flex flex-col text-sm font-bold text-green-500">
		KNOWN WITH PLACEMENT
		<Row type="green" />
	</div>

	<div class="flex flex-col text-sm font-bold text-yellow-500">
		KNOWN WITHOUT PLACEMENT
		{#each { length: 5 } as _, row}
			<Row {row} type="yellow" />
		{/each}
	</div>
</div>
