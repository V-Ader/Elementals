import { Element } from "../../../card/Card.js";
import { CardModel } from "../../model/CardModel.js";
import { Effect } from "../Effect.js";

export class ColorMaskEffect extends Effect<CardModel> {
    private elapsed: number = 0;
    private totalDuration: number = 2; 

    constructor(private element: Element) {
        super();
    }

    // Returns true if the effect is still active, false if it has completed
    update(deltaTime: number): boolean {
        this.elapsed += deltaTime;
        return this.elapsed < this.totalDuration;
    }

    apply(card: CardModel): CardModel {
        const factor = Math.min(this.elapsed / (this.totalDuration*2), 1) ;
        console.log(this.element, "ColorMaskEffect", factor);

        switch (this.element) {
            case Element.FIRE:
                card.trnasformations = card.trnasformations || {};
                card.trnasformations.colorMask = {r: 168, g: 50, b: 50, a: factor};
                break;
            case Element.WATER:
                card.trnasformations = card.trnasformations || {};
                card.trnasformations.colorMask = {r: 40, g: 80, b: 168, a: factor};
                break;
            case Element.EARTH:
                card.trnasformations = card.trnasformations || {};
                card.trnasformations.colorMask = {r: 40, g: 168, b: 40, a: factor};
                break;  
            default:
                card.trnasformations = card.trnasformations || {};
                card.trnasformations.colorMask = {r: 0, g: 0, b: 0, a: 0};
                break;          
        }

        return card;
    }
}