<script lang="ts">
	import type { Char, CharArr } from '$constants/types';
	import { WORDS } from '$constants/words';
	import { LetterStore } from '$lib/stores/letter.store';

	let solved: string[] = [];

	const solve = () => {
		const grey = $LetterStore.grey;
		const green = $LetterStore.green;
		const yellow = $LetterStore.yellow;

		solved = yellowPass(greenPass(greyPass(WORDS, grey), green), yellow);
		console.log(solved);
	};

	const greyPass = (words: string[], grey: Char[]) => {
		const flat = grey.flat().filter((val) => val !== undefined);

		return flat.length
			? words.filter((word) => {
					const letters = word.split('') as Char[];
					return !grey.some((val) => letters.includes(val));
				})
			: words;
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

<aside class="w-96 bg-slate-200 h-screen">
	<div class="flex flex-col items-center h-full">
		<div class="grow overflow-y-scroll">
			<ul class="flex flex-wrap p-5 list-none gap-2">
				{#each solved as word}
					<li class="text-md px-2 py-1 rounded-lg bg-slate-600 text-white">
						{word}
					</li>
				{/each}
			</ul>
		</div>
		<hr class="h-px my-2 bg-slate-800 border-0" />
		<span class="text-md font-bold my-3">Found {solved.length} words</span>
		<button
			type="button"
			class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-5 text-center"
			on:click={solve}>SEARCH</button
		>
	</div>
</aside>
