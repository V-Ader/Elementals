import { PLAYER_ID } from "../player/Player.js";
import { Ability } from "./ability/Ability.js";

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
    ability?: Ability;
}

export class Card {
    public id: string;

    constructor(public data: CardData, public owner: PLAYER_ID) {
        this.id = this.generateId();
        this.data.ability?.corelateWithCardById(this.id);
    }

    generateId(): string {
        return this.data.name + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    static getEmpty() {
        return new Card({name: "NaN", element:Element.UNDEFINED, risk: 0}, PLAYER_ID.UNDEFINED)
    }
}
