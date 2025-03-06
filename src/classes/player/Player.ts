import { ReduceRisk } from "../card/ability/ReduceRisk.js";
import { Card, CardData, Element } from "../card/Card.js";
import { Game } from "../Game.js";

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
        this.deck = [
            { name: "fire-elemental", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "water-elemental", element: Element.WATER, risk: 4  },
            { name: "earth-elemental", element: Element.EARTH, risk: 6  },
            { name: "fire-elemental", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "water-elemental", element: Element.WATER, risk: 4  },
            { name: "earth-elemental", element: Element.EARTH, risk: 6  },
            { name: "fire-elemental", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "water-elemental", element: Element.WATER, risk: 4  },
            { name: "earth-elemental", element: Element.EARTH, risk: 6  },
            { name: "fire-elemental", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "water-elemental", element: Element.WATER, risk: 4  },
            { name: "earth-elemental", element: Element.EARTH, risk: 6  },
            { name: "fire-elemental", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "water-elemental", element: Element.WATER, risk: 4  },
            { name: "earth-elemental", element: Element.EARTH, risk: 6  },
            { name: "fire-elemental", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "water-elemental", element: Element.WATER, risk: 4  },
            { name: "earth-elemental", element: Element.EARTH, risk: 6  },
            { name: "fire-elemental", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "water-elemental", element: Element.WATER, risk: 4  },
            { name: "earth-elemental", element: Element.EARTH, risk: 6  },
            { name: "fire-elemental", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "water-elemental", element: Element.WATER, risk: 4  },
            { name: "earth-elemental", element: Element.EARTH, risk: 6  },
            { name: "fire-elemental", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "water-elemental", element: Element.WATER, risk: 4  },
            { name: "earth-elemental", element: Element.EARTH, risk: 6  },
            { name: "fire-elemental", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "water-elemental", element: Element.WATER, risk: 4  },
            { name: "earth-elemental", element: Element.EARTH, risk: 6  },
            { name: "fire-elemental", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "water-elemental", element: Element.WATER, risk: 4  },
            { name: "earth-elemental", element: Element.EARTH, risk: 6  },
            { name: "fire-elemental", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "water-elemental", element: Element.WATER, risk: 4  },
            { name: "earth-elemental", element: Element.EARTH, risk: 6  },
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
