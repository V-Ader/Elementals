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
        return new CardModel().resize(this.scale);
    }

    public static getScale(): number {
        const aspectRatio = 16 / 9;
        const windowAspectRatio = window.innerWidth / window.innerHeight;
        return windowAspectRatio > aspectRatio ? window.innerHeight / 1080 : window.innerWidth / 1920;
    }
}