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
    public cardsInPlay: Card[] = [];
    public deck: CardData[] = [];

    constructor(public name: string, public player_id: PLAYER_ID = PLAYER_ID.UNDEFINED) {
        this.deck = [
            { name: "Flame Dragon", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "Aqua Spirit", element: Element.WATER, risk: 4 },
            { name: "Earth Golem", element: Element.EARTH, risk: 6 },
            { name: "Fire Elemental", element: Element.FIRE, risk: 3 },
            { name: "Water Serpent", element: Element.WATER, risk: 4 },
            { name: "Stone Guardian", element: Element.EARTH, risk: 5 },
            { name: "Thunder Beast", element: Element.FIRE, risk: 5 },
            { name: "Mystic Mermaid", element: Element.WATER, risk: 4 },
            { name: "Flame Dragon", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "Rock Titan", element: Element.EARTH, risk: 6 },
            { name: "Inferno Phoenix", element: Element.FIRE, risk: 3 },
            { name: "Tidal Leviathan", element: Element.WATER, risk: 4 },
            { name: "Granite Colossus", element: Element.EARTH, risk: 5 },
            { name: "Blazing Salamander", element: Element.FIRE, risk: 5 },
            { name: "Flame Dragon", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "Oceanic Nymph", element: Element.WATER, risk: 4 },
            { name: "Mountain Giant", element: Element.EARTH, risk: 6 },
            { name: "Lava Elemental", element: Element.FIRE, risk: 3 },
            { name: "Sea Dragon", element: Element.WATER, risk: 4 },
            { name: "Boulder Brute", element: Element.EARTH, risk: 5 },
            { name: "Ember Spirit", element: Element.FIRE, risk: 5 },
            { name: "Frost Siren", element: Element.WATER, risk: 4 },
            { name: "Flame Dragon", element: Element.FIRE, risk: 5, ability: new ReduceRisk() },
            { name: "Canyon Guardian", element: Element.EARTH, risk: 6 },
            { name: "Pyroclasm", element: Element.FIRE, risk: 3 },
            { name: "Rain Dancer", element: Element.WATER, risk: 4 },
            { name: "Mud Golem", element: Element.EARTH, risk: 5 },
            { name: "Solar Flare", element: Element.FIRE, risk: 5 },
            { name: "Storm Bringer", element: Element.WATER, risk: 4 },
            { name: "Crystal Titan", element: Element.EARTH, risk: 6 },
            { name: "Wildfire", element: Element.FIRE, risk: 3 },
            { name: "Abyssal Kraken", element: Element.WATER, risk: 4 },
            { name: "Iron Colossus", element: Element.EARTH, risk: 5 },
        ];
    }

    getNewHand() {
        for (let i = 0; i < 4; i++) {
            if (this.cardsInPlay[i].data.element !== Element.UNDEFINED) continue;
            
            const randomIndex = Math.floor(Math.random() * (this.deck.length - i));
            const cardData = this.deck.splice(randomIndex, 1)[0];
            this.cardsInPlay.push(new Card(cardData, this.player_id));
        }
    }

    makeMove(game: Game) {
        console.log("not possible to reach");
    }

}
