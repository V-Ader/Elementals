import { Game } from "../../game/Game.js";
import { GameUtils } from "../../game/GameUtils.js";
import { Element } from "../Card.js";
import { Ability } from "./Ability.js";

export class Flooding extends Ability {
    name = "Flooding";
    description = "Change the element of adjecent card to Water";

    isAvailable(game: Game): boolean {
        if (this.isUsed) {
            return false;
        }
        if (this.isCardPlayers(game)) {
            const card = GameUtils.getCardById(this.corelated_card_id, game);
            const cardPosition = game.players.player_1.cards.indexOf(card);
            return cardPosition >= 0 && !game.players.player_2.cards[cardPosition].isEmpty();
        } else if (this.isCardOpponents(game)) {
            const card = GameUtils.getCardById(this.corelated_card_id, game);
            const cardPosition = game.players.player_2.cards.indexOf(card);
            return cardPosition >= 0 && !game.players.player_1.cards[cardPosition].isEmpty();
        }
        return false;
    }

    execute(game: Game): void {            
        const card = GameUtils.getCardById(this.corelated_card_id, game);
        const cardPosition = game.players.player_1.cards.indexOf(card);
        let adjacentCard;
        if (cardPosition >= 0) {
            adjacentCard = game.players.player_2.cards[cardPosition];
        } else {
            const cardPosition = game.players.player_2.cards.indexOf(card);
            adjacentCard = game.players.player_1.cards[cardPosition];
        }

        adjacentCard.data.element = Element.WATER;
        this.isUsed = true;
    }
}