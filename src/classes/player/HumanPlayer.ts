import { Card } from "../card/Card.js";
import { Game } from "../game/Game.js";
import { Player, PLAYER_ID } from "./Player.js";


export class HumanPlayer extends Player {
    constructor(public name: string, player_id: PLAYER_ID) {
        super(name, player_id);
    }
    
    makeMove(game: Game): void {
        // Do nothing
    }
}
