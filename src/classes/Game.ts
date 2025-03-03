import { Card } from "./Card.js";
import { UserPointer } from "./UserPointer.js";
import { Player, PLAYER_ID } from "./player/Player.js";

export class Game {
    public player_cards: Card[] = [Card.getEmpty(), Card.getEmpty(), Card.getEmpty()];
    public enemy_cards: Card[] = [Card.getEmpty(), Card.getEmpty(), Card.getEmpty()];
    public turn: number = 1;
    public currentPlayer: PLAYER_ID = PLAYER_ID.PLAYER_1;

    public moveMade: boolean = false;

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
        if (!this.moveMade && this.currentPlayer === PLAYER_ID.PLAYER_1) {
            console.log(this.currentPlayer);
            this.player1.makeMove(this);
        }
        if (!this.moveMade && this.currentPlayer === PLAYER_ID.PLAYER_2) {
            console.log(this.currentPlayer);
            this.player2.makeMove(this);
        }

        if (this.moveMade) {
            this.turn++;
            this.currentPlayer = this.turn % 2 == 0 ? PLAYER_ID.PLAYER_2 : PLAYER_ID.PLAYER_1;
            console.log(`Turn ${this.turn}: Player ${this.turn % 2 + 1}'s move.`); 
            this.moveMade = false;       
        }
    }

    playCard(hand_card_id: number, player_cards_id: number, player: PLAYER_ID) {
        // move player card into the table
        if (player == PLAYER_ID.PLAYER_1) {
            this.player_cards[player_cards_id] = this.player1.cardsInPlay[hand_card_id];
            this.player1.cardsInPlay[hand_card_id] = Card.getEmpty();
        } else if (player == PLAYER_ID.PLAYER_2) {
            this.enemy_cards[player_cards_id] = this.player2.cardsInPlay[hand_card_id];
            this.player2.cardsInPlay[hand_card_id] = Card.getEmpty();
        }
        console.log("Player", player, "play card", hand_card_id, "to", player_cards_id);
        console.log("Player 1 cards in play", this.player2.cardsInPlay);
        console.log("Player 1 cards on table", this.enemy_cards);
        this.moveMade = true;       
    }
}
