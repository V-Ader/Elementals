import { Card, Element } from "./Card.js";
import { UserPointer } from "./UserPointer.js";
import { Player, PLAYER_TYPE } from "./Player.js";

export class Game {
    public player_cards: Card[] = [Card.getEmpty(), Card.getEmpty(), Card.getEmpty()];
    public enemy_cards: Card[] = [Card.getEmpty(), Card.getEmpty(), Card.getEmpty()];
    public turn: number = 1;

    public userPointer = new UserPointer();


    constructor(public player1: Player, public player2: Player) {
        this.initializeGame();
    }

    private initializeGame() {
        this.player1.getNewHand();
        this.player2.getNewHand();
    }

    update(deltaTime: number) {
        console.log(`Turn ${this.turn}: Player ${this.turn % 2 + 1}'s move.`);
        
    }

    playTurn() {
        this.turn++;
    }

    playCard(card: Card) {
        // Logic to place the card on the board
        console.log(`Card ${card.data.name} played on the board.`);
    }
}
