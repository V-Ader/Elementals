import { Element } from "../card/Card.js";
import { Game } from "../Game.js";
import { Player, PLAYER_ID } from "./Player.js";

export class BotPlayer extends Player {
    constructor(public name: string, player_id: PLAYER_ID) {
        super(name, player_id);
    }

    makeMove(game: Game) {
        for (let i = 0; i < this.cardsInPlay.length; i++) {
            if (this.cardsInPlay[i].data.element !== Element.UNDEFINED) {
                for (let j = 0; j < game.enemy_cards.length; j++) {
                    console.log(game.enemy_cards[j], Element.UNDEFINED, game.enemy_cards[j].data.element !== Element.UNDEFINED)
                    if (game.enemy_cards[j].data.element === Element.UNDEFINED) {
                        game.playCard(i, j, this.player_id);
                        console.log("Bot played card", this.cardsInPlay[i]);
                        return;
                    }
                }
            }
        }
    }
}
