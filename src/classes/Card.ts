import { PLAYER_TYPE } from "./Player.js";

export type Element = "fire" | "water" | "earth" | "black";

export interface CardData {
    name: string;
    element: Element;
    power: number;
    risk: number;
    ability?: string; // Placeholder for special abilities
}

export class Card {
    constructor(public data: CardData, public owner: PLAYER_TYPE) {}

    static getEmpty() {
        return new Card({name: "NaN", element:"black", power:0, risk:0}, PLAYER_TYPE.UNDEFINED)
    }
}
