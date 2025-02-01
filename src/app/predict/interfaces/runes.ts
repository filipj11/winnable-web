export interface Rune {
	displayName: string;
	id: number;
	rawDescription: string;
	rawDisplayName: string;
}

export interface StatRune {
	id: number;
	rawDescription: string;
}

export interface BasicRunes {
	keystone: Rune;
	primaryRuneTree: Rune;
	secondaryRuneTree: Rune;
}

export interface FullRunes {
	keystone: Rune;
	primaryRuneTree: Rune;
	secondaryRuneTree: Rune;
	generalRunes: Rune[];
	statRunes: StatRune[];
}