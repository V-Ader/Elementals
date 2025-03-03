import { Card, CardData, Element } from "../Card.js";
import { Game } from "../Game.js";

export enum PLAYER_ID {
    PLAYER_1,
    PLAYER_2,
    UNDEFINED
}

export class Player {
    public health: number = 100;
    public cardsInPlay: Card[] = [];
    public deck: CardData[] = [];

    constructor(public name: string, public player_id: PLAYER_ID = PLAYER_ID.UNDEFINED) {
        this.deck = [
            { name: "Flame Dragon", element: Element.FIRE, power: 8, risk: 5, ability: "Burn" },
            { name: "Aqua Spirit", element: Element.WATER, power: 6, risk: 4, ability: "Soak" },
            { name: "Earth Golem", element: Element.EARTH, power: 10, risk: 6 },
            { name: "Fire Elemental", element: Element.FIRE, power: 5, risk: 3 },
            { name: "Water Serpent", element: Element.WATER, power: 7, risk: 4 },
            { name: "Stone Guardian", element: Element.EARTH, power: 9, risk: 5 },
          ];
    }

    getNewHand() {
        this.cardsInPlay = [
            Card.getEmpty(),
            Card.getEmpty(),
            Card.getEmpty(),
            Card.getEmpty()
        ]        
    }

    makeMove(game: Game) {
        console.log("not possible to reach");
    }

}
