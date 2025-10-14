import { Card, Element, ElementMatrix } from "../card/Card.js";
import { Game } from "../game/Game.js";
import { Player, PLAYER_ID } from "./Player.js";

export class BotPlayer extends Player {
    constructor(public name: string, player_id: PLAYER_ID) {
        super(name, player_id);
    }

    makeMove(game: Game) {
        // If we haven't played a card yet
        if (!game.cardPlayed) {
            // Find best move by evaluating each possible play
            let bestScore = -1000;
            let bestMove = { handIndex: -1, tableIndex: -1 };

            // For each card in hand
            for (let i = 0; i < this.cardsInPlay.length; i++) {
                const card = this.cardsInPlay[i];
                if (card.data.element === Element.UNDEFINED) continue;

                // For each possible slot
                for (let j = 0; j < game.players.player_2.cards.length; j++) {
                    const enemyCard = game.players.player_2.cards[j];
                    if (enemyCard.data.element !== Element.UNDEFINED) continue;

                    // Calculate score for this move
                    let score = this.evaluateMove(card, j, game);
                    
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = { handIndex: i, tableIndex: j };
                    }
                }
            }

            // If we found a valid move, play it
            if (bestMove.handIndex !== -1) {
                game.playCard(bestMove.handIndex, bestMove.tableIndex, this.player_id);
                console.log("Bot played card", this.cardsInPlay[bestMove.handIndex], "to position", bestMove.tableIndex);
            }
        }

        // Always end turn after playing card or if no moves possible
        game.endTurn();
    }

    private evaluateMove(card: Card, tableIndex: number, game: Game): number {
        let score = 0;

        // Base score from card's risk value
        score += (10 - card.data.risk) * 2; // Prefer lower risk cards

        // Check opponent's adjacent cards for element advantage
        const oppCards = game.players.player_2.cards;
        if (oppCards[tableIndex].data.element !== Element.UNDEFINED) {
            const result = ElementMatrix[card.data.element][oppCards[tableIndex].data.element];
            if (result === 1) score += 30; // Strong advantage
            if (result === 0) score += 15; // Equal matchup
            if (result === -1) score -= 30; // Disadvantage
        }

        // Bonus for cards with abilities
        if (card.data.ability) {
            score += 10;
        }

        // Consider accumulated risk in the slot
        const slotRisk = game.players.get(PLAYER_ID.PLAYER_2).cards_risks[tableIndex];
        if (slotRisk > 0) {
            score += slotRisk * 2; // Prefer slots with accumulated risk
        }

        // Consider board position
        if (tableIndex === 1) score += 5; // Slight preference for middle position

        return score;
    }
}
