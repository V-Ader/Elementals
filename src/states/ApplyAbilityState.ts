import { Game } from "../classes/game/Game.js";
import { Ability } from "../classes/card/ability/Ability.js";
import { PLAYER_ID } from "../classes/player/Player.js";
import { Effect } from "../classes/renderer/effect/Effect.js";
import { GameRenderer } from "../classes/renderer/GameRenderer.js";
import { CardModel } from "../classes/renderer/model/CardModel.js";
import { State, StateMachine } from "../classes/StateMachine.js";
import { PlayState } from "./PlayState.js";
import { EffectFactory } from "../classes/renderer/effect/effects/EffectFactory.js";

export class ApplyAbilityState implements State {
    private effectsToApply: Effect<CardModel>[] = [];
    constructor(
        private game: Game,
        public abilityToApply: Ability,
        private renderer: GameRenderer,
        private returnToPlay: () => void
    ) {}

    enter() {
        this.effectsToApply.push(EffectFactory.getEffect(this.abilityToApply, this.game));
        this.renderer.cardRenderer.effectsController.addEffect(EffectFactory.getEffect(this.abilityToApply, this.game), this.abilityToApply.corelated_card_id);
    }

    update(deltaTime: number) {
        let isProcessing = true;
        this.effectsToApply.forEach(effect => {
            isProcessing = effect.update(deltaTime) && isProcessing;
        });
        if (!isProcessing) {
            this.returnToPlay();
        }
    }

    render(deltaTime: number) {
        this.renderer.render(deltaTime, this.game, null);
    }

    handleInput(event: MouseEvent | KeyboardEvent) {
        // NO INPUT EXPECTED
    }

    exit() {}
}
