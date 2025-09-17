import { Game } from "../../game/Game.js";
import { CardModel } from "../model/CardModel.js";
import { Effect } from "./Effect.js";
import { WindowResizeEffect } from "./effects/WindowResizeEffect.js";

export class EffectsController {
    private effectsPool = new Map<string, Effect<CardModel>[]>();
    private effectsCommonPool: Effect<CardModel>[] = [
        new WindowResizeEffect()
    ];
    

    update(deltaTime: number) {
        this.effectsCommonPool.forEach(effect => {
            if (!effect.update(deltaTime)) {
                this.effectsCommonPool.splice(this.effectsCommonPool.indexOf(effect), 1);
            }
        });
        this.effectsPool.forEach(
            effects => {
                effects.forEach(effect => {
                    if (!effect.update(deltaTime)) {
                        effects.splice(effects.indexOf(effect), 1);
                    }
                });
            }
        );
    };

    apply(model: CardModel, id?: string): CardModel {
        var localModel = model;
        this.effectsCommonPool.forEach(effect => localModel = effect.apply(localModel));
        if (id && this.effectsPool.has(id)) {
            this.effectsPool.get(id)?.forEach(effect => localModel = effect.apply(localModel));
        }
        return localModel;
    }

    addEffect(effect: Effect<CardModel>, id?: string) {
        if (!id) {
            this.effectsCommonPool.push(effect);
            return;
        }
        this.effectsPool.set(id, [...(this.effectsPool.get(id) || []), effect]);
    }

    hasEffects(id: string): boolean {
        return (this.effectsPool.get(id)?.length ?? 0) > 0;
    }
}