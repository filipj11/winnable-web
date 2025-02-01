import { Abilities } from "./abilities";
import { ChampionStats } from "./champion-stats";
import { FullRunes } from "./runes";

export interface ActivePlayer {
	abilities: Abilities;
	championStats: ChampionStats;
	currentGold: number;
	fullRunes: FullRunes;
	level: number;
	summonerName: string;
	riotId: string;
	riotIdGameName: string;
	riotIdTagLine: string;
}