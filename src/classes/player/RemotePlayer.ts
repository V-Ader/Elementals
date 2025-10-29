import { Card, Element, ElementMatrix } from "../card/Card.js";
import { Game } from "../game/Game.js";
import { Player, PLAYER_ID } from "./Player.js";

// RemotePlayer represents a player controlled over a network connection
export class RemotePlayer extends Player {
    constructor(public name: string, public player_id: PLAYER_ID, public connection: any) {
        super(name, player_id);
    }

    makeMove(game: Game) {
        // handle await for thre response from remote
        // 0. send request to remote player to make a move with game state
        // 1. wait for the response and parse into the NetworkEvent object


        // 2. set changes to the game

        // 3. move made
    }

}
