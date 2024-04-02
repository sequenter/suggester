<script lang="ts">
	import type { Char, CharArr } from '$constants/types';
	import { LetterStore } from '$lib/stores/letter.store';
	import { WORDS } from '$constants/words';

	let solved: string[] = [];

	export const solve = () => {
		const grey = $LetterStore.grey;
		const green = $LetterStore.green;
		const yellow = $LetterStore.yellow;

		solved = yellowPass(greenPass(greyPass(WORDS, grey), green), yellow);
	};

	const greyPass = (words: string[], grey: Char[]) => {
		return words.filter((word) => {
			const letters = word.split('') as Char[];
			return !grey.some((val) => letters.includes(val));
		});
	};

	const greenPass = (words: string[], green: CharArr) => {
		const flat = green.flat().filter((val) => val !== undefined);

		return flat.length
			? words.filter((word) => {
					const letters = word.split('') as Char[];

					for (let i = 0; i < 5; i++) {
						if (!green[i]) {
							continue;
						} else if (green[i] !== letters[i]) {
							return false;
						}
					}

					return true;
				})
			: words;
	};

	const yellowPass = (words: string[], yellow: [CharArr, CharArr, CharArr, CharArr, CharArr]) => {
		const flat = yellow.flat().filter((val) => val !== undefined);

		return flat.length
			? words
					.filter((word) => {
						const letters = word.split('') as Char[];
						return flat.every((val) => letters.includes(val));
					})
					.filter((word) => {
						const letters = word.split('') as Char[];

						for (const row of yellow) {
							for (let i = 0; i < 5; i++) {
								if (row[i] === letters[i]) return false;
							}
						}

						return true;
					})
			: words;
	};
</script>

<div class="flex flex-col items-center w-full select-none">
	{#if solved.length > 0}
		<h3 class="text-sm font-bold">FOUND {solved.length} WORD{solved.length > 1 ? 'S' : ''}</h3>
	{/if}
	<ul class="flex flex-wrap justify-center px-5 py-3 list-none gap-2">
		{#each solved as word}
			<li class="text-md px-2 py-1 rounded-lg bg-slate-600 text-white">
				{word}
			</li>
		{/each}
	</ul>
</div>
