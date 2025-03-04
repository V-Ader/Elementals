import { Game } from "../../Game";
import { Ability } from "./Ability.js";

export class ReduceRisk extends Ability {
    name = "Reduce Risk";
    description = "Reduce the comulated risk oby 50% on all players table positions";
    isActive = false;

    execute(game: Game): void {        
        if (this.isActive) {
            game.player_cards.map(card => {
                card.data.risk = Math.floor(card.data.risk / 2);
                return card;
            });
            this.isActive = false;
        }
    }
}