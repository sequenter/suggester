import type { Char, CharArr, TileType } from '$constants/types';
import { writable } from 'svelte/store';

interface LetterDetail {
	green: CharArr; //Known letters, including placement
	yellow: [CharArr, CharArr, CharArr, CharArr, CharArr]; //Known letters, excluding placement
	grey: Char[]; //Known incorrect letters
}

interface PressedLetterDetail {
	letter: Char;
}

interface TileDetail {
	index: number;
	row: number;
	type: TileType;
}

export const LetterStore = writable<LetterDetail>({
	green: [undefined, undefined, undefined, undefined, undefined],
	yellow: [
		[undefined, undefined, undefined, undefined, undefined],
		[undefined, undefined, undefined, undefined, undefined],
		[undefined, undefined, undefined, undefined, undefined],
		[undefined, undefined, undefined, undefined, undefined],
		[undefined, undefined, undefined, undefined, undefined]
	],
	grey: []
});

// Subscribe functions are not called if the same value is set to store.  In this case an object is used to ensure that
// the value is written to the store and corresponding subscribe functions are called.
export const PressedLetterStore = writable<PressedLetterDetail>(undefined);

export const TileStore = writable<TileDetail>({
	index: 0,
	row: 0,
	type: 'green'
});
