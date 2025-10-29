import { Game } from "../../game/Game.js";
import { NetworkEvent } from "./NetworkEvent.js";


export class EndTurnEvent implements NetworkEvent {
    execute(game: Game) {
        game.cardPlayed = false;
        game.abilityPlayed = false;
        game.endTurn();
    }    
}