import { Game } from "../Game.js";
import { CardRenderer } from "./CardRenderer.js";
import { UserPointerRenderer } from "./UserPointerRenderer.js";
import { InputController } from "../input/InputHandler.js";
import { HealthRenderer } from "./HealthRenderer.js";
import { ResourceManager } from "./ResourceManager.js";

export class GameRenderer {
    public cardRenderer: CardRenderer;
    private healthRenderer: HealthRenderer;
    private userPointerRenderer: UserPointerRenderer;
    private resourceManager: ResourceManager;

    constructor(private ctx: CanvasRenderingContext2D) {
        this.resourceManager = new ResourceManager();
        this.cardRenderer = new CardRenderer(ctx, this.resourceManager);
        this.userPointerRenderer = new UserPointerRenderer(ctx, this.cardRenderer);
        this.healthRenderer = new HealthRenderer(ctx);
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

        this.renderPlayersHealth(game);

        // Render user pointer
        this.userPointerRenderer.render(game.userPointer, inputController);
    }

    private renderOpponentCards(game: Game) {
        for (let i = 0; i < game.enemy_cards.length; i++) {
            this.cardRenderer.render(game.enemy_cards[i], this.getOpponentCardPosition(i));
            this.renderSlotRisk(game.enemy_cards_slot_risk[i], this.getOpponentCardPosition(i).x, this.getOpponentCardPosition(i).y - 20);
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
            this.renderSlotRisk(game.player_cards_slot_risk[i], this.getPlayerCardPosition(i).x, this.getPlayerCardPosition(i).y + 170);
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

    private renderPlayersHealth(game: Game) {
        this.healthRenderer.render(game.player1.health, game.player2.health);
    }

    private renderSlotRisk(risk: number, x: number, y: number) {
        this.ctx.fillStyle = "black";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(risk.toString(), x + 50, y);
    }
}
