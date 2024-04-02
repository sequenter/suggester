<script lang="ts">
	import type { Char } from '$constants/types';
	import { LetterStore, PressedLetterStore, TileStore } from '$lib/stores/letter.store';
	import { clsx } from 'clsx';
	import { press } from 'svelte-gestures';

	export let key: Char | 'ENTER' | 'DEL';

	let green = false;
	let yellow = false;
	let grey = false;

	LetterStore.subscribe((val) => {
		green = val.green.includes(key);
		yellow = val.yellow.some((row) => row.includes(key));
	});

	const onPress = () => {
		if (key != 'ENTER' && key != 'DEL') {
			setGrey();
		}
	};

	const onClick = () => {
		PressedLetterStore.set({ letter: key });

		if ($TileStore.type === 'green') {
			$LetterStore.green[$TileStore.index] = key;
            console.log($LetterStore.green);

			for (let i = 0; i < 5; i++) {
				$LetterStore.yellow[i][$TileStore.index] =
					$LetterStore.yellow[i][$TileStore.index] !== key
						? $LetterStore.yellow[i][$TileStore.index]
						: undefined;
			}
		} else if ($TileStore.type === 'yellow') {
			$LetterStore.yellow[$TileStore.row][$TileStore.index] = key;
		}
	};

	const setGrey = () => {
		grey = !grey;

		if (grey) {
			yellow = false;
			green = false;

			$LetterStore.grey = [...$LetterStore.grey, key];
			clearGreen();
			clearYellow();
		} else {
			$LetterStore.grey = $LetterStore.grey.filter((item) => item != key);
		}
	};

	const clearGreen = () => {
		$LetterStore.green.map((v) => (v === key ? undefined : v));
	};

	const clearYellow = () => {
		for (let i = 0; i < $LetterStore.yellow.length; i++) {
			$LetterStore.yellow[i] = $LetterStore.yellow[i].map((v) => (v === key ? undefined : v));
		}
	};
</script>

<button
	class={clsx(
		'h-14 p-5 text-sm font-bold uppercase rounded',
		(green || yellow || grey) && 'text-white',
		grey && 'bg-slate-800 opacity-40',
		green && 'bg-green-500',
		yellow && 'bg-yellow-500',
		!green && !yellow && !grey && 'bg-slate-200 hocus:bg-slate-300'
	)}
	disabled={grey}
	use:press={{ triggerBeforeFinished: true }}
	on:press={onPress}
	on:click={onClick}
>
	{key}
</button>
