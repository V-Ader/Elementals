import { Card, CardData } from "./Card.js";

export enum PLAYER_TYPE {
    PLAYER_1,
    PLAYER_2,
    UNDEFINED
}

export class Player {
    public player_id: PLAYER_TYPE;
    public health: number = 100;
    public cardsInPlay: Card[] = [];
    public deck: CardData[] = [];

    constructor(public name: string) {
        this.player_id = PLAYER_TYPE.UNDEFINED
        this.deck = [
            { name: "Flame Dragon", element: "fire", power: 8, risk: 5, ability: "Burn" },
            { name: "Aqua Spirit", element: "water", power: 6, risk: 4, ability: "Soak" },
            { name: "Earth Golem", element: "earth", power: 10, risk: 6 },
            { name: "Fire Elemental", element: "fire", power: 5, risk: 3 },
            { name: "Water Serpent", element: "water", power: 7, risk: 4 },
            { name: "Stone Guardian", element: "earth", power: 9, risk: 5 },
          ];
    }

    getNewHand() {
        this.cardsInPlay = [
            new Card(this.deck[0], this.player_id),
            new Card(this.deck[1], this.player_id),
            new Card(this.deck[2], this.player_id),
            new Card(this.deck[3], this.player_id)
        ]
    }

    playCard(cardData: CardData) {
        const card = new Card(cardData, this.player_id);
        this.cardsInPlay.push(card);
    }

    takeDamage(amount: number) {
        this.health -= amount;
    }
}
