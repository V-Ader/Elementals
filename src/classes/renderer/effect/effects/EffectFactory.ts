import { Ability } from "../../../card/ability/Ability.js";
import { Flooding } from "../../../card/ability/Flooding.js";
import { ReduceRisk } from "../../../card/ability/ReduceRisk.js";
import { Whirpool } from "../../../card/ability/Whirpool.js";
import { Game } from "../../../game/Game.js";
import { CardModel } from "../../model/CardModel.js";
import { Effect } from "../Effect.js";
import { ChangeRiskAbilityEffect } from "./abiliteis/ChangeRiskAbilityEffect.js";
import { FloodingAbilityEffect } from "./abiliteis/FloodingAbilityEffect.js";
import { WhirpoolAbilityEffect } from "./abiliteis/WhirpoolAbilityEffect.js";

export class EffectFactory {
    static getEffect(ability: Ability, game: Game): Effect<CardModel> {
        if (ability instanceof ReduceRisk) {
            return new ChangeRiskAbilityEffect(() => ability.execute(game));
        } else if (ability instanceof Flooding) {
            return new FloodingAbilityEffect(() => ability.execute(game));
        } else if (ability instanceof Whirpool) {
            return new WhirpoolAbilityEffect(() => ability.execute(game));
        }else {
            throw new Error(`Unknown ability type: ${ability.name}`);
        }
    }
}