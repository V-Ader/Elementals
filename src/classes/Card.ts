import { PLAYER_ID } from "./player/Player.js";

export enum Element {
    FIRE,
    WATER,
    EARTH,
    UNDEFINED
}

//create a matrix of elements to determine the outcome of a card battle
export const ElementMatrix = [
    [0, 1, -1],
    [-1, 0, 1],
    [1, -1, 0]
]

export interface CardData {
    name: string;
    element: Element;
    risk: number;
    ability?: string; // Placeholder for special abilities
}

export class Card {
    constructor(public data: CardData, public owner: PLAYER_ID) {}

    static getEmpty() {
        return new Card({name: "NaN", element:Element.UNDEFINED, risk: 0}, PLAYER_ID.UNDEFINED)
    }
}
