import { Card } from "../card/Card.js";
import { Game } from "./Game.js";
import { PLAYER_ID } from "../player/Player.js";

export class GameUtils {
    public static getCardById(cardId: string, game: Game): Card {
        for (const player of [game.players.get(PLAYER_ID.PLAYER_1), game.players.get(PLAYER_ID.PLAYER_2)]) {
            for (const card of player.cards) {
                if (card.id === cardId) {
                    return card;
                }
            }
            for (const card of player.player.cardsInPlay) {
                if (card.id === cardId) {
                    return card;
                }
            }
        }
        return Card.getEmpty();
    }
}