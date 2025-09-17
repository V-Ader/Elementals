import { Ability } from "../../../card/ability/Ability.js";
import { ReduceRisk } from "../../../card/ability/ReduceRisk.js";
import { Game } from "../../../game/Game.js";
import { CardModel } from "../../model/CardModel.js";
import { Effect } from "../Effect.js";
import { ChangeRiskAbilityEffect } from "./abiliteis/ChangeRiskAbilityEffect.js";

export class EffectFactory {
    static getEffect(ability: Ability, game: Game): Effect<CardModel> {
        if (ability instanceof ReduceRisk) {
            return new ChangeRiskAbilityEffect(() => ability.execute(game));
        } else {
            throw new Error(`Unknown ability type: ${ability.name}`);
        }
    }
}