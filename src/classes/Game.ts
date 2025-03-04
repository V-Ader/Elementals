import { Card, Element, ElementMatrix} from "./card/Card.js";
import { UserPointer } from "./UserPointer.js";
import { Player, PLAYER_ID } from "./player/Player.js";

export class Game {
    public BOARD_CARD_SLOT_COUNT = 3;
    public player_cards: Card[] = [Card.getEmpty(), Card.getEmpty(), Card.getEmpty()];
    public player_cards_slot_risk: number[] = [10, 10, 10];
    public enemy_cards: Card[] = [Card.getEmpty(), Card.getEmpty(), Card.getEmpty()];
    public enemy_cards_slot_risk: number[] = [0, 0, 0];

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
            this.player1.makeMove(this);
        }
        if (!this.moveMade && this.currentPlayer === PLAYER_ID.PLAYER_2) {
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
        if (!this.isMoveLegal(hand_card_id, player_cards_id, player)) return;
        // move player card into the table
        if (player == PLAYER_ID.PLAYER_1) {
            this.player_cards[player_cards_id] = this.player1.cardsInPlay[hand_card_id];
            if (this.player_cards[player_cards_id].data.ability) {
                this.player_cards[player_cards_id].data.ability.isActive = true;
            }
            this.player1.cardsInPlay[hand_card_id] = Card.getEmpty();
        } else if (player == PLAYER_ID.PLAYER_2) {
            this.enemy_cards[player_cards_id] = this.player2.cardsInPlay[hand_card_id];
            if (this.enemy_cards[player_cards_id].data.ability) {
                this.enemy_cards[player_cards_id].data.ability.isActive = true;
            }
            this.player2.cardsInPlay[hand_card_id] = Card.getEmpty();
        }
        console.log("Player", player, "play card", hand_card_id, "to", player_cards_id);
        console.log("Player 1 cards in play", this.player2.cardsInPlay);
        console.log("Player 1 cards on table", this.enemy_cards);
        this.moveMade = true;       
    }

    isMoveLegal(hand_card_id: number, player_cards_id: number, player: PLAYER_ID) {
        if (player == PLAYER_ID.PLAYER_1) {
            if (this.player1.cardsInPlay[hand_card_id].data.element === Element.UNDEFINED) return false;
            if (this.player_cards[player_cards_id].data.element !== Element.UNDEFINED) return false;
            if (this.turn == 2 && this.enemy_cards[player_cards_id].data.element !== Element.UNDEFINED) return false;
        }

        if (player == PLAYER_ID.PLAYER_2) {
            if (this.player2.cardsInPlay[hand_card_id].data.element === Element.UNDEFINED) return false;
            if (this.enemy_cards[player_cards_id].data.element !== Element.UNDEFINED) return false;
            if (this.turn == 2 && this.player_cards[player_cards_id].data.element !== Element.UNDEFINED) return false;
        }

        return true;
    }


    isTurnOver() {
        for (let i = 0; i < this.player_cards.length; i++) {
            if (this.player_cards[i].data.element === Element.UNDEFINED) return false;
        }
        for (let i = 0; i < this.enemy_cards.length; i++) {
            if (this.enemy_cards[i].data.element === Element.UNDEFINED) return false;
        }
        return true;
    }

    isGameOver() {
        return this.player1.health <= 0 || this.player2.health <= 0;
    }

    resolveTheBoard() {
        for (let i = 0; i < this.BOARD_CARD_SLOT_COUNT; i++) {
            const player_card = this.player_cards[i];
            const enemy_card = this.enemy_cards[i];
            const result = ElementMatrix[player_card.data.element][enemy_card.data.element];
            if (result === 1) {
                this.player1.health -= player_card.data.risk + this.player_cards_slot_risk[i];
                this.player_cards_slot_risk[i] = 0;
                this.enemy_cards_slot_risk[i] = 0;
            } else if (result === -1) {
                this.player2.health -= enemy_card.data.risk + this.enemy_cards_slot_risk[i];
                this.player_cards_slot_risk[i] = 0;
                this.enemy_cards_slot_risk[i] = 0;
            } else {
                this.player_cards_slot_risk[i] += player_card.data.risk;
                this.enemy_cards_slot_risk[i] += enemy_card.data.risk;
            }

            if (this.player1.health <= 0) {
                console.log("Player 2 wins");
                return;
            } else if (this.player2.health <= 0) {
                console.log("Player 1 wins");
                return;
            }
        }
    }

    startNewTurn() {
        this.player1.getNewHand();
        this.player2.getNewHand();
        
        this.player_cards = [Card.getEmpty(), Card.getEmpty(), Card.getEmpty()];
        this.enemy_cards = [Card.getEmpty(), Card.getEmpty(), Card.getEmpty()];
    }

    startNewGame() {
        this.player1.health = 30;
        this.player2.health = 30;
        this.turn = 1;
        this.currentPlayer = PLAYER_ID.PLAYER_1;
        this.initializeGame();
    }
}
