import { Card, Element } from "./Card.js";
import { UserPointer } from "./UserPointer.js";
import { Player, PLAYER_TYPE } from "./Player.js";

export class Game {
    public player_cards: Card[] = [Card.getEmpty(), Card.getEmpty(), Card.getEmpty()];
    public enemy_cards: Card[] = [Card.getEmpty(), Card.getEmpty(), Card.getEmpty()];
    public turn: number = 1;
    public currentPlayer: PLAYER_TYPE = PLAYER_TYPE.PLAYER_1;

    public userPointer = new UserPointer();


    constructor(public player1: Player, public player2: Player) {
        this.initializeGame();
    }

    private initializeGame() {
        this.player1.getNewHand();
        this.player2.getNewHand();
    }

    update(deltaTime: number) {
        // console.log(`Turn ${this.turn}: Player ${this.turn % 2 + 1}'s move.`);
        
    }

    playTurn() {
        this.turn++;
        this.currentPlayer = this.turn % 2 == 0 ? PLAYER_TYPE.PLAYER_2 : PLAYER_TYPE.PLAYER_1;
        console.log(`Turn ${this.turn}: Player ${this.turn % 2 + 1}'s move.`);
    }

    playCard(hand_card_id: number, player_cards_id: number, player: PLAYER_TYPE) {
        // move p[layer card into the table
        if (player == this.currentPlayer) {
            this.player_cards[player_cards_id] = this.player1.cardsInPlay[hand_card_id];
            this.player1.cardsInPlay[hand_card_id] = Card.getEmpty();
        }
        console.log("Player", player, "play card", hand_card_id, "to", player_cards_id);
        console.log("Player 1 cards in play", this.player1.cardsInPlay);
        console.log("Player 1 cards on table", this.player_cards);
        this.playTurn()
    }
}
