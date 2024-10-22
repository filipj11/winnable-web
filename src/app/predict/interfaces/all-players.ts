import { Item } from './items';
import { BasicRunes } from './runes';
import { Scores } from './scores';
import { SummonerSpells } from './summoner-spells';

export interface Player {
    championName: string;
    isBot: boolean;
    isDead: boolean;
    items: Item[]; 
    level: number;
    position: "TOP" | "MIDDLE" | "BOTTOM" | "JUNGLE" | "SUPPORT"; // Assuming these are the possible values
    rawChampionName: string;
    respawnTimer: number;
    runes: BasicRunes; 
    scores: Scores;
    skinID: number;
    summonerName: string;
    riotId: string;
    riotIdGameName: string;
    riotIdTagLine: string;
    summonerSpells: SummonerSpells; 
    team: "ORDER" | "CHAOS"; // Assuming these are the possible values
}