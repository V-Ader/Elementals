import { Game } from "../../game/Game.js";
import { PLAYER_ID } from "../../player/Player.js";
import { NetworkEvent } from "./NetworkEvent.js";

export class CardPlayedEvent implements NetworkEvent {

    constructor(public cardIndex: number, public targetIndex: number, public player: PLAYER_ID) {}

    execute(game: Game) {
        game.playCard(this.cardIndex, this.targetIndex, this.player);
    }
}