import { Flooding } from "../card/ability/Flooding.js";
import { ReduceRisk } from "../card/ability/ReduceRisk.js";
import { Whirpool } from "../card/ability/Whirpool.js";
import { Card, CardData, Element } from "../card/Card.js";
import { Game } from "../game/Game.js";

export enum PLAYER_ID {
    PLAYER_1,
    PLAYER_2,
    UNDEFINED
}

export class Player {
    public health: number = 30;
    public cardsInPlay: Card[] = [Card.getEmpty(), Card.getEmpty(), Card.getEmpty(), Card.getEmpty()];
    public deck: CardData[] = [];

    constructor(public name: string, public player_id: PLAYER_ID = PLAYER_ID.UNDEFINED) {
        // Create a diverse deck using all available card assets
        const baseDeck: CardData[] = [
            // Fire cards
            { name: "fire_warior_1", element: Element.FIRE, risk: 4 },
            { name: "fire_warior_2", element: Element.FIRE, risk: 5 },
            { name: "fire-elemental", element: Element.FIRE, risk: 6, ability: new ReduceRisk() },
            { name: "magma-monster", element: Element.FIRE, risk: 7 },
            { name: "lava-elemental", element: Element.FIRE, risk: 5 },

            // Water cards
            { name: "water_warior_1", element: Element.WATER, risk: 4, ability: new Flooding() },
            { name: "water_warior_2", element: Element.WATER, risk: 5, ability: new Whirpool() },
            { name: "water-elemental", element: Element.WATER, risk: 6, ability: new Whirpool() },
            { name: "ocean_elemental", element: Element.WATER, risk: 5, ability: new Flooding() },
            { name: "syren", element: Element.WATER, risk: 4, ability: new ReduceRisk() },

            // Earth cards
            { name: "eart_warior_1", element: Element.EARTH, risk: 4 },
            { name: "earth_warior_2", element: Element.EARTH, risk: 5 },
            { name: "earth-elemental", element: Element.EARTH, risk: 6 },
            { name: "forest-elemental", element: Element.EARTH, risk: 5 },
            { name: "treant", element: Element.EARTH, risk: 7 }
        ];

        // Duplicate each card a few times to create a full deck
        this.deck = [
            ...baseDeck, ...baseDeck, ...baseDeck  // Creates 45 cards (15 unique cards × 3)
        ];
    }

    getNewHand() {
        for (let i = 0; i < 4; i++) {
            if (this.cardsInPlay[i].data.element !== Element.UNDEFINED) continue;

            const randomIndex = Math.floor(Math.random() * (this.deck.length - i));
            const cardData = this.deck.splice(randomIndex, 1)[0];
            this.cardsInPlay[i] = new Card(cardData, this.player_id);
        }
    }

    makeMove(game: Game) {
        console.log("not possible to reach");
    }

}
