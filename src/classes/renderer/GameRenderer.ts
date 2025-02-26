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
        this.renderCardGroup(game.enemy_cards, 200, 100, "Enemy Cards");

        // Render player cards in play
        this.renderCardGroup(game.player_cards, 200, this.ctx.canvas.height / 2 - 100, "Player Cards");

        // Render player hand
        this.renderCardGroup(game.player1.cardsInPlay, 100, this.ctx.canvas.height - 200, "Player Hand");

        // Render user pointer
        this.userPointerRenderer.render(game.userPointer, inputController);
    }

    private renderCardGroup(cards: Card[], startX: number, startY: number, label: string) {
        const spacing = 120; // Spacing between cards
        const cardWidth = 100;
        const cardHeight = 150;

        // Draw label
        this.ctx.fillStyle = "#000";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(label, startX, startY - 20);

        // Render each card at a calculated position
        cards.forEach((card, index) => {
            const x = startX + index * spacing; // Horizontal position
            const y = startY; // Vertical position
            this.cardRenderer.render(card, x, y, cardWidth, cardHeight);
        });
    }

    getCardPosition(card: Card) {
        // Logic to get the card's position
        // This is a placeholder implementation
        const cardIndex = this.ctx.canvas.height - 200; // Example calculation
        const x = 100 + cardIndex * 120; // Example calculation
        const y = this.ctx.canvas.height - 200; // Example calculation
        return { x, y, width: 100, height: 150 };
    }
}
