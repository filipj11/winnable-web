export interface BaseEvent {
	EventID: number;
	EventName: string;
	EventTime: number;
}

export interface FirstBloodEvent extends BaseEvent {
	EventName: "FirstBlood";
	Recipient: string;
}

export interface FirstBrickEvent extends BaseEvent {
	EventName: "FirstBrick";
	KillerName: string;
}

export interface TurretKilledEvent extends BaseEvent {
	EventName: "TurretKilled";
	TurretKilled: string;
	KillerName: string;
	Assisters: string[];
}

export interface InhibKilledEvent extends BaseEvent {
	EventName: "InhibKilled";
	InhibKilled: string;
	KillerName: string;
	Assisters: string[];
}

export interface ChampionKillEvent extends BaseEvent {
	EventName: "ChampionKill";
	VictimName: string;
	KillerName: string;
	Assisters: string[];
}

export interface MultikillEvent extends BaseEvent {
	EventName: "Multikill";
	KillerName: string;
	KillStreak: number;
}

export interface AceEvent extends BaseEvent {
	EventName: "Ace";
	Acer: string;
	AcingTeam: string;
}

export interface DragonKillEvent extends BaseEvent {
	EventName: "DragonKill";
	DragonType: string;
	Stolen: "True" | "False";
	KillerName: string;
	Assisters: string[];
}

export interface HordeKillEvent extends BaseEvent {
	EventName: "HordeKill";
	KillerName: string;
	Stolen: "True" | "False";
	Assisters: string[];
}

export interface HeraldKillEvent extends BaseEvent {
	EventName: "HeraldKill";
	Stolen: "True" | "False";
	KillerName: string;
	Assisters: string[];
}

export interface BaronKillEvent extends BaseEvent {
	EventName: "BaronKill";
	Stolen: "True" | "False";
	KillerName: string;
	Assisters: string[];
}

export interface Events {
	Events: Event[];
}