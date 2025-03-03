import { PLAYER_ID } from "./player/Player.js";

export enum Element {
    FIRE,
    WATER,
    EARTH,
    UNDEFINED
}

export interface CardData {
    name: string;
    element: Element;
    power: number;
    risk: number;
    ability?: string; // Placeholder for special abilities
}

export class Card {
    constructor(public data: CardData, public owner: PLAYER_ID) {}

    static getEmpty() {
        return new Card({name: "NaN", element:Element.UNDEFINED, power:0, risk:0}, PLAYER_ID.UNDEFINED)
    }
}
