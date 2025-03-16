import { Card } from "../card/Card.js";
import { Player, PLAYER_ID } from "../player/Player.js";

export class GamePlayers {
    public player_1: GamePlayer;
    public player_2: GamePlayer;

    constructor(player1: Player, player2: Player) { 
        this.player_1 = new GamePlayer(player1);
        this.player_2 = new GamePlayer(player2);
    }

    get(player: PLAYER_ID){
        if (player === PLAYER_ID.PLAYER_1) {
            return this.player_1;
        } else {
            return this.player_2;
        }
    }
}

export class GamePlayer {
    public cards: Card[] = [Card.getEmpty(), Card.getEmpty(), Card.getEmpty()];;
    public cards_risks: number[] = [10, 10, 10];
    public availble_actions: number = 0;

    public player = new Player("");

    constructor(player: Player) {
        this.player = player;
        this.cards = [Card.getEmpty(), Card.getEmpty(), Card.getEmpty()];
        this.cards_risks = [10, 10, 10];
        this.availble_actions = 0;
    }

    isReadyToEndGame(): boolean {
        return this.player.health <= 0;
    }

}