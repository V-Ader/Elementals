import { CardModel } from "../model/CardModel.js";
import { Effect } from "./Effect.js";
import { WindowResizeEffect } from "./effects/WindowResizeEffect.js";

export class EffectsController {
    private effectsPool = new Map<string, Effect<CardModel>[]>();
    private effectsCommonPool: Effect<CardModel>[] = [
        new WindowResizeEffect()
    ];
    

    update(deltaTime: number) {
        this.effectsCommonPool.forEach(effect => effect.update(deltaTime));
        this.effectsPool.forEach(
            effects =>
                effects.forEach(effect => 
                    effect.update(deltaTime)
                )
            )
    };

    apply(model: CardModel, id?: string): CardModel {
        var localModel = model;
        this.effectsCommonPool.forEach(effect => localModel = effect.apply(localModel));
        if (id && this.effectsPool.has(id)) {
            this.effectsPool.get(id)?.forEach(effect => localModel = effect.apply(localModel));
        }
        return localModel;
    }

    addEffect(id: string, effect: Effect<CardModel>) {
        this.effectsPool.set(id, [...(this.effectsPool.get(id) || []), effect]);
    }

    hasEffects(id: string): boolean {
        return (this.effectsPool.get(id)?.length ?? 0) > 0;
    }
}