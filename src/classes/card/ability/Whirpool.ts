import { Game } from "../../game/Game.js";
import { Ability } from "./Ability.js";

export class Whirpool extends Ability {
    name = "Whirpool";
    description = "Randomily swap the position of two cards on all players table positions";

    execute(game: Game): void {        
        let p1 = Math.floor(Math.random() * 3);
        let p2 = (p1 + Math.floor(Math.random() * 2) * 2 - 1) % 3;
        if (p2 < 0) p2 += 3;
        let tmp = game.players.player_1.cards[p1];
        game.players.player_1.cards[p1] = game.players.player_1.cards[p2];
        game.players.player_1.cards[p2] = tmp;
        this.isUsed = true;
    }

    isAvailable(game: Game): boolean {
        if (this.isUsed) {
            return false;
        }
        let counter = 0;
        if (this.isCardPlayers(game)) {
            game.players.player_1.cards.forEach(card => {
                if (!card.isEmpty()) counter++;
            });
        } else {
            game.players.player_2.cards.forEach(card => {
                if (!card.isEmpty()) counter++;
            });
        }
        return counter >= 2;
    }
    
}