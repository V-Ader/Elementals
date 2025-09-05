import { Card, Element, ElementMatrix } from "../card/Card.js";
import { UserPointer } from "../UserPointer.js";
import { Player, PLAYER_ID } from "../player/Player.js";
import { GamePlayer, GamePlayers } from "./GamePlayer.js";

export class Game {
    public BOARD_CARD_SLOT_COUNT = 3;
    public players: GamePlayers;
    public turn: number = 1;
    public currentPlayer: PLAYER_ID = PLAYER_ID.PLAYER_1;

    public cardPlayed: boolean = false;
    public abilityPlayed: boolean = false;

    public userPointer = new UserPointer();

    constructor(player1: Player, player2: Player) {
        this.players = new GamePlayers(player1, player2);    
        this.initializeGame();
    }

    private initializeGame() {
        this.players.get(PLAYER_ID.PLAYER_1).player.getNewHand();
        this.players.get(PLAYER_ID.PLAYER_2).player.getNewHand();

        this.players.get(PLAYER_ID.PLAYER_1).cards = [Card.getEmpty(), Card.getEmpty(), Card.getEmpty()];
        this.players.get(PLAYER_ID.PLAYER_1).cards_risks = [0, 0, 0];

        this.players.get(PLAYER_ID.PLAYER_2).cards = [Card.getEmpty(), Card.getEmpty(), Card.getEmpty()];
        this.players.get(PLAYER_ID.PLAYER_2).cards_risks = [0, 0, 0];
    }

    update(deltaTime: number) {
        // console.log(`Round ${this.turn}: Player ${this.turn % 2 + 1}'s move.`);
        
    }

    isMoveMade(){
        return this.cardPlayed && this.abilityPlayed;
    }

    playTurn() {
        if (!this.isMoveMade() && this.currentPlayer === PLAYER_ID.PLAYER_1) {
            this.players.get(PLAYER_ID.PLAYER_1)?.player.makeMove(this);
        }
        if (!this.isMoveMade() && this.currentPlayer === PLAYER_ID.PLAYER_2) {
            this.players.get(PLAYER_ID.PLAYER_2)?.player.makeMove(this);
        }

        if (this.isMoveMade()) {
            this.turn++;
            this.currentPlayer = this.turn % 2 == 0 ? PLAYER_ID.PLAYER_2 : PLAYER_ID.PLAYER_1;
            console.log(`Turn ${this.turn}: Player ${this.turn % 2 + 1}'s move.`); 
            this.cardPlayed = false; 
            this.abilityPlayed = false;      
        }
    }

    playCard(hand_card_id: number, player_cards_id: number, player: PLAYER_ID) {
        if (!this.isMoveLegal(hand_card_id, player_cards_id, player)) return;
        const gamePlayer = this.players.get(player);
        if (!gamePlayer) return;

        // move player card into the table
        gamePlayer.cards[player_cards_id] =  gamePlayer.player.cardsInPlay[hand_card_id];
        if (gamePlayer.cards[player_cards_id].data.ability) {
            gamePlayer.cards[player_cards_id].data.ability.isActive = true;
        }
        gamePlayer.player.cardsInPlay[hand_card_id] = Card.getEmpty();

        this.cardPlayed = true;       
    }

    endTurn(){
        this.cardPlayed = true; 
        this.abilityPlayed = true;      
    }


    retriveCard(card: Card, player: PLAYER_ID) {
        const gamePlayer = this.players.get(player);
        if (!gamePlayer) return;

        for (let i = 0; i < gamePlayer.player.cardsInPlay.length; i++) {
            if (gamePlayer.player.cardsInPlay[i].data.element === Element.UNDEFINED) {
                gamePlayer.player.cardsInPlay[i] = card;
                break;
            }
        }
    }

    isMoveLegal(hand_card_id: number, player_cards_id: number, player: PLAYER_ID) {
        const gamePlayer = this.players.get(player);
        if (!gamePlayer) return false;

        if (gamePlayer.player.cardsInPlay[hand_card_id].data.element === Element.UNDEFINED) return false;
        if (gamePlayer.cards[player_cards_id].data.element !== Element.UNDEFINED) return false;
        if (this.turn == 2 && gamePlayer.cards[player_cards_id].data.element !== Element.UNDEFINED) return false;

        return true;
    }


    isRoundOver() {
        for (let i = 0; i < this.BOARD_CARD_SLOT_COUNT; i++) {
            if (this.players.get(PLAYER_ID.PLAYER_1)?.cards[i].data.element === Element.UNDEFINED) return false;
            if (this.players.get(PLAYER_ID.PLAYER_2)?.cards[i].data.element === Element.UNDEFINED) return false;
        }
        return true;
    }

    isGameOver() {
        return  this.players.get(PLAYER_ID.PLAYER_1).isReadyToEndGame() || this.players.get(PLAYER_ID.PLAYER_2).isReadyToEndGame();
    }

    resolveCardPair(index: number) {
        const player1GamePlayer = this.players.get(PLAYER_ID.PLAYER_1);
        const player2GamePlayer = this.players.get(PLAYER_ID.PLAYER_2);
        if (!player1GamePlayer || !player2GamePlayer) return;

        const player_card = player1GamePlayer.cards[index];
        const enemy_card = player2GamePlayer.cards[index];
        const result = ElementMatrix[player_card.data.element][enemy_card.data.element];
        if (result === 1) {
            this.players.get(PLAYER_ID.PLAYER_1).player.health -= player_card.data.risk + player1GamePlayer.cards_risks[index];
            player1GamePlayer.cards_risks[index] = 0;
            player2GamePlayer.cards_risks[index] = 0;
            this.retriveCard(enemy_card, PLAYER_ID.PLAYER_2);
        } else if (result === -1) {
            this.players.get(PLAYER_ID.PLAYER_2).player.health -= enemy_card.data.risk + player2GamePlayer.cards_risks[index];
            player1GamePlayer.cards_risks[index] = 0;
            player2GamePlayer.cards_risks[index] = 0;
            this.retriveCard(player_card, PLAYER_ID.PLAYER_1);
        } else {
            player1GamePlayer.cards_risks[index] += player_card.data.risk;
            player2GamePlayer.cards_risks[index] += enemy_card.data.risk;
        }

        if (this.players.get(PLAYER_ID.PLAYER_1).player.health <= 0) {
            console.log("Player 2 wins");
            return;
        } else if (this.players.get(PLAYER_ID.PLAYER_2).player.health <= 0) {
            console.log("Player 1 wins");
            return;
        }

        player1GamePlayer.cards[index] = Card.getEmpty();
        player2GamePlayer.cards[index] = Card.getEmpty();
    }

    startNewRound() {
        this.players.get(PLAYER_ID.PLAYER_1).player.getNewHand();
        this.players.get(PLAYER_ID.PLAYER_2).player.getNewHand();
    }

    startNewGame() {
        this.players.get(PLAYER_ID.PLAYER_1).player.health = 30;
        this.players.get(PLAYER_ID.PLAYER_2).player.health = 30;
        this.turn = 1;
        this.currentPlayer = PLAYER_ID.PLAYER_1;
        this.initializeGame();

        this.startNewRound();
    }
}
