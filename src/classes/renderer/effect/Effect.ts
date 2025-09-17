import { Game } from "../../game/Game.js";
import { Model } from "../model/Models.js";

export class Effect<T extends Model> {
    public isFinished: boolean = false;
    public type: EffectType = EffectType.Default;

    update(deltaTime: number): boolean {
        this.isFinished = true;
        return true; // Return true if the animation is complete
    }

    apply(model: T): T {
        // Default render does nothing
        return model;
    }
}

export enum EffectType {
    windowResize = "windowResize",
    ZoomIn = "zoomIn",
    Flip = "flip",
    Glow = "glow",
    Shake = "shake",
    Default = "default"
}