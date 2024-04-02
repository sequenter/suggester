<script lang="ts">
	import { Grid, Keyboard } from '$lib/components';
	import { Solver } from '$lib/components';

	let solver: Solver;

	const onEnter = () => {
		solver.solve();
	};
</script>

<svelte:head>
	<title>Wordle Suggester</title>
</svelte:head>

<div class="flex flex-col w-full items-center gap-5 pt-5">
	<Grid />
	<Keyboard {onEnter} />
	<Solver bind:this={solver} />
</div>
