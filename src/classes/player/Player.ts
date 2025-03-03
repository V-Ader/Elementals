import { Card, CardData, Element } from "../Card.js";
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
            { name: "Flame Dragon", element: Element.FIRE, risk: 5, ability: "Burn" },
            { name: "Aqua Spirit", element: Element.WATER, risk: 4, ability: "Soak" },
            { name: "Earth Golem", element: Element.EARTH, risk: 6, ability: "Quake" },
            { name: "Fire Elemental", element: Element.FIRE, risk: 3, ability: "Ignite" },
            { name: "Water Serpent", element: Element.WATER, risk: 4, ability: "Drench" },
            { name: "Stone Guardian", element: Element.EARTH, risk: 5, ability: "Shield" },
            { name: "Thunder Beast", element: Element.FIRE, risk: 5, ability: "Electrify" },
            { name: "Mystic Mermaid", element: Element.WATER, risk: 4, ability: "Enchant" },
            { name: "Rock Titan", element: Element.EARTH, risk: 6, ability: "Smash" },
            { name: "Inferno Phoenix", element: Element.FIRE, risk: 3, ability: "Rebirth" },
            { name: "Tidal Leviathan", element: Element.WATER, risk: 4, ability: "Flood" },
            { name: "Granite Colossus", element: Element.EARTH, risk: 5, ability: "Fortify" },
            { name: "Blazing Salamander", element: Element.FIRE, risk: 5, ability: "Scorch" },
            { name: "Oceanic Nymph", element: Element.WATER, risk: 4, ability: "Heal" },
            { name: "Mountain Giant", element: Element.EARTH, risk: 6, ability: "Stomp" },
            { name: "Lava Elemental", element: Element.FIRE, risk: 3, ability: "Erupt" },
            { name: "Sea Dragon", element: Element.WATER, risk: 4, ability: "Whirlpool" },
            { name: "Boulder Brute", element: Element.EARTH, risk: 5, ability: "Crush" },
            { name: "Ember Spirit", element: Element.FIRE, risk: 5, ability: "Ember" },
            { name: "Frost Siren", element: Element.WATER, risk: 4, ability: "Freeze" },
            { name: "Canyon Guardian", element: Element.EARTH, risk: 6, ability: "Guard" },
            { name: "Pyroclasm", element: Element.FIRE, risk: 3, ability: "Explode" },
            { name: "Rain Dancer", element: Element.WATER, risk: 4, ability: "Dance" },
            { name: "Mud Golem", element: Element.EARTH, risk: 5, ability: "Mire" },
            { name: "Solar Flare", element: Element.FIRE, risk: 5, ability: "Flare" },
            { name: "Storm Bringer", element: Element.WATER, risk: 4, ability: "Storm" },
            { name: "Crystal Titan", element: Element.EARTH, risk: 6, ability: "Shatter" },
            { name: "Wildfire", element: Element.FIRE, risk: 3, ability: "Spread" },
            { name: "Abyssal Kraken", element: Element.WATER, risk: 4, ability: "Drag" },
            { name: "Iron Colossus", element: Element.EARTH, risk: 5, ability: "Crush" },
        ];
    }

    getNewHand() {
        this.cardsInPlay = [];
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * (this.deck.length - i));
            const cardData = this.deck.splice(randomIndex, 1)[0];
            this.cardsInPlay.push(new Card(cardData, this.player_id));
        }
    }

    makeMove(game: Game) {
        console.log("not possible to reach");
    }

}
