import { Game } from "../Game.js";
import { CardRenderer } from "./CardRenderer.js";
import { Card } from "../Card.js";
import { UserPointerRenderer } from "./UserPointerRenderer.js";
import { InputController } from "../input/InputHandler.js";

export class GameRenderer {
    private cardRenderer: CardRenderer;
    private userPointerRenderer: UserPointerRenderer;

    constructor(private ctx: CanvasRenderingContext2D) {
        this.cardRenderer = new CardRenderer(ctx);
        this.userPointerRenderer = new UserPointerRenderer(ctx, this.cardRenderer);
    }

    render(game: Game, inputController: InputController) { 
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Render enemy cards in play
        this.renderOpponentCards(game);

        // Render player cards in play
        this.renderPlayerCards(game);

        // Render player hand
        this.renderPlayerHandCards(game);

        // Render user pointer
        this.userPointerRenderer.render(game.userPointer, inputController);
    }

    private renderOpponentCards(game: Game) {
        for (let i = 0; i < game.enemy_cards.length; i++) {
            this.cardRenderer.render(game.enemy_cards[i], this.getOpponentCardPosition(i));
        } 
    }

    public getOpponentCardPosition(cardNumber: number) {
        const x = 200 + cardNumber * 120;
        const y = 100;
        return { x, y, width: 100, height: 150 };
    }

    private renderPlayerCards(game: Game) {
        for (let i = 0; i < game.player_cards.length; i++) {
            this.cardRenderer.render(game.player_cards[i], this.getPlayerCardPosition(i));
        }    
    }

    public getPlayerCardPosition(cardNumber: number) {
        const x = 200 + cardNumber * 120;
        const y = this.ctx.canvas.height / 2 - 100;
        return { x, y, width: 100, height: 150 };
    }

    private renderPlayerHandCards(game: Game) {
        for (let i = 0; i < game.player1.cardsInPlay.length; i++) {
            this.cardRenderer.render(game.player1.cardsInPlay[i], this.getPlayerHandCardPosition(i));
        }
    }

    public getPlayerHandCardPosition(cardNumber: number) {
        const x = 100 + cardNumber * 120;
        const y = this.ctx.canvas.height - 200;
        return { x, y, width: 100, height: 150 };
    }
}
