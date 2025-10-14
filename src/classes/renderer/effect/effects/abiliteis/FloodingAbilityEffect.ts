import { Ability } from "../../../../card/ability/Ability.js";
import { Game } from "../../../../game/Game.js";
import { CardModel } from "../../../model/CardModel.js";
import { Effect, EffectType } from "../../Effect.js";

export class FloodingAbilityEffect extends Effect<CardModel> {
    private duration: number;
    private elapsed: number = 0;
    private originalFontSize: number | null = null;

    private abilityExecutionFunction: () => void;
    private abilityExecutionDelay: number;
    private abilityExecuted: boolean = false;

    constructor(abilityFunction: () => void) {
        super();
        this.duration = 1.0;
        this.type = EffectType.Default;

        this.abilityExecutionFunction = abilityFunction;
        this.abilityExecutionDelay = this.duration / 2;
    }

    update(deltaTime: number): boolean {
        this.elapsed += deltaTime;

        // uruchom ability po opóźnieniu (tylko raz)
        if (!this.abilityExecuted && this.abilityExecutionFunction && this.elapsed >= this.abilityExecutionDelay) {
            this.abilityExecutionFunction();
            this.abilityExecuted = true;
        }

        // true = efekt nadal trwa
        console.log(this.elapsed, this.duration);
        return this.elapsed < this.duration;
    }

    apply(card: CardModel): CardModel {
        return card;
    }
}
