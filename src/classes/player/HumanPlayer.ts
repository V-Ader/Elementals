import { Card } from "../Card.js";
import { Game } from "../Game.js";
import { Player, PLAYER_ID } from "./Player.js";


export class HumanPlayer extends Player {
    constructor(public name: string, player_id: PLAYER_ID) {
        super(name, player_id);
    }

    override getNewHand() {
        this.cardsInPlay = [
            new Card(this.deck[0], this.player_id),
            new Card(this.deck[1], this.player_id),
            new Card(this.deck[2], this.player_id),
            new Card(this.deck[3], this.player_id)
        ]
    }

    makeMove(game: Game): void {
        // Do nothing
    }
}
