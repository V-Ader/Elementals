import { CardModel } from "../../model/CardModel.js";
import { Effect, EffectType } from "../Effect.js";

export class WindowResizeEffect extends Effect<CardModel> {
    private scale: number = 1;

    constructor() {
        super();
        this.type = EffectType.windowResize;
    }

    update(deltaTime: number): boolean {
        this.scale = WindowResizeEffect.getScale();
        return true;
    }   

    apply(card: CardModel): CardModel {
        return new CardModel(
            card.width * this.scale,
            card.height * this.scale,
            card.cornerRadius * this.scale,
            card.maring * this.scale,
            card.fontSize * this.scale,
            { size: card.icon.size * this.scale, padding: card.icon.padding * this.scale },
            { circleRadius: card.elementIndicator.circleRadius * this.scale, padding: card.elementIndicator.padding * this.scale },
            { width: card.actionButton.width * this.scale, height: card.actionButton.height * this.scale, cornerRadius: card.actionButton.cornerRadius * this.scale, fontSize: card.actionButton.fontSize * WindowResizeEffect.getScale() }
        )
    }

    public static getScale(): number {
        const aspectRatio = 16 / 9;
        const windowAspectRatio = window.innerWidth / window.innerHeight;
        return windowAspectRatio > aspectRatio ? window.innerHeight / 1080 : window.innerWidth / 1920;
    }
}