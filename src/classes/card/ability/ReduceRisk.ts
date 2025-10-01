import { Game } from "../../game/Game.js";
import { Ability } from "./Ability.js";

export class ReduceRisk extends Ability {
    name = "Reduce Risk";
    description = "Reduce the comulated risk oby 50% on all players table positions";
    isActive = false;

    execute(game: Game): void {        
        if (this.isActive) {
            game.players.player_1.cards.map(card => {
                if (card.id === this.corelated_card_id) {
                    card.data.risk = Math.floor(card.data.risk / 2);
                }
                return card;
            });
            this.isActive = false;
        }
    }
}