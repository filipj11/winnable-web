export interface Ability {
    abilityLevel?: number; // Optional because passives lack levels
    displayName: string;
    id: string;
    rawDescription: string;
    rawDisplayName: string;
}

export interface Abilities {
    E: Ability;
    Passive: Ability;
    Q: Ability;
    R: Ability;
    W: Ability;
}