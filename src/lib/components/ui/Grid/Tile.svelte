<script lang="ts">
	import type { Char, TileType } from '$constants/types';
	import { clsx } from 'clsx';
	import { LetterStore, TileStore } from '$lib/stores/letter.store';
	import { onMount } from 'svelte';

	export let index: number;
	export let row: number;
	export let type: TileType;

	let isActive = false;
	let container: HTMLButtonElement;
	let letter: Char | undefined = undefined;

	LetterStore.subscribe((val) => {
		if (type === 'green') {
			letter = val.green[index];
		} else if (type === 'yellow') {
			letter = val.yellow[row][index];
		}
	});

	const onWindowClick = (e: MouseEvent & { currentTarget: EventTarget & Window }) => {
		if (e.target instanceof HTMLButtonElement) {
			if (e.target.hasAttribute('data-tile') && container.contains(e.target) === false)
				isActive = false;
		}
	};

	const onTileClick = () => {
		isActive = true;
		TileStore.set({ index, row, type });
	};

	onMount(() => {
		isActive = index === 0 && row === 0 && type === 'green';
	});
</script>

<svelte:window on:click={onWindowClick} />

<button
	class={clsx(
		'text-center h-16 w-16 text-4xl bg-slate-200 rounded-lg border-4',
		isActive && 'border-slate-500'
	)}
	bind:this={container}
	on:click={onTileClick}
	data-tile>{letter || ''}</button
>
