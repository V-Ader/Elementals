import { Game } from "../game/Game.js";
import { CardRenderer } from "./CardRenderer.js";
import { UserPointerRenderer } from "./UserPointerRenderer.js";
import { InputController } from "../input/InputHandler.js";
import { HealthRenderer } from "./HealthRenderer.js";
import { ResourceManager } from "./ResourceManager.js";
import { PLAYER_ID } from "../player/Player.js";
import { EffectsController } from "./effect/EffectsController.js";
import { CardModel } from "./model/CardModel.js";
import { RendererScreenHelper } from "./RendererScreenHelper.js";


export class GameRenderer {
    public cardRenderer: CardRenderer;
    private healthRenderer: HealthRenderer;
    private userPointerRenderer: UserPointerRenderer;

    constructor(private rendererScreenHelper: RendererScreenHelper, private resourceManager: ResourceManager) {
        this.cardRenderer = new CardRenderer(rendererScreenHelper, this.resourceManager);
        this.userPointerRenderer = new UserPointerRenderer(rendererScreenHelper, this.cardRenderer);
        this.healthRenderer = new HealthRenderer(rendererScreenHelper, this.resourceManager);
    }

    render(deltaTime: number, game: Game, inputController: InputController | null = null) { 
        // update all animations in pool (now only cards have effects)
        this.cardRenderer.effectsController.update(deltaTime);

        // Clear the canvas
        this.rendererScreenHelper.gameCtx.clearRect(0, 0, this.rendererScreenHelper.gameCtx.canvas.width, this.rendererScreenHelper.gameCtx.canvas.height);

        // Draw background
        this.renderBackground();

        // Render enemy cards in play
        this.renderOpponentCards(game);

        // Render player cards in play
        this.renderPlayerCards(game);

        // Render player hand
        this.renderPlayerHandCards(game);

        this.renderPlayersHealth(game);

        // Render user pointer
        if(inputController) this.userPointerRenderer.render(game.userPointer, inputController);

        // Render end turn button
        this.renderEndTurnButton();
    }


    public getWindowSize() {
        return {
            width: this.rendererScreenHelper.gameCtx.canvas.width,
            height: this.rendererScreenHelper.gameCtx.canvas.height
        };
    }

    public getContext() {
        return this.rendererScreenHelper.gameCtx;
    }

    private renderBackground() {
        const background = this.resourceManager.getBackgroundImage('background1');
        if (background) {
            this.rendererScreenHelper.backgroundCtx.drawImage(background, 0, 0, this.rendererScreenHelper.backgroundCtx.canvas.width, this.rendererScreenHelper.backgroundCtx.canvas.height);
        }
    }

    private renderOpponentCards(game: Game) {
        for (let i = 0; i < game.players.get(PLAYER_ID.PLAYER_2).cards.length; i++) {
            const card_id = game.players.get(PLAYER_ID.PLAYER_2).cards[i].id;
            const cardPosition = this.cardRenderer.getOpponentCardPosition(i, card_id);
                       
            this.cardRenderer.render(game.players.get(PLAYER_ID.PLAYER_2).cards[i], cardPosition);
            this.renderSlotRisk(game.players.get(PLAYER_ID.PLAYER_2).cards_risks[i], cardPosition.x, cardPosition.y - cardPosition.model.fontSize - 10, cardPosition.model.width);
        } 
    }

    private renderPlayerCards(game: Game) {
        for (let i = 0; i < game.players.get(PLAYER_ID.PLAYER_1).cards.length; i++) {
            const card_id = game.players.get(PLAYER_ID.PLAYER_1).cards[i].id;
            const cardPosition = this.cardRenderer.getPlayerCardPosition(i, card_id);

            this.cardRenderer.render(game.players.get(PLAYER_ID.PLAYER_1).cards[i], cardPosition);
            this.renderSlotRisk(game.players.get(PLAYER_ID.PLAYER_1).cards_risks[i], cardPosition.x, cardPosition.y +cardPosition.model.height + 20, cardPosition.model.width);
        }    
    }

    private renderPlayerHandCards(game: Game) {
        for (let i = 0; i < game.players.get(PLAYER_ID.PLAYER_1).player.cardsInPlay.length; i++) {
            const card_id = game.players.get(PLAYER_ID.PLAYER_1).player.cardsInPlay[i].id;
            const cardPosition = this.cardRenderer.getPlayerHandCardPosition(i, card_id);

            this.cardRenderer.render(game.players.get(PLAYER_ID.PLAYER_1).player.cardsInPlay[i], cardPosition);
        }
    }

    private renderPlayersHealth(game: Game) {
        this.healthRenderer.render(game.players.get(PLAYER_ID.PLAYER_1).player.health, game.players.get(PLAYER_ID.PLAYER_2).player.health);
    }

    private renderSlotRisk(risk: number, x: number, y: number, width: number) {
        this.rendererScreenHelper.gameCtx.fillStyle = "black";
        this.rendererScreenHelper.gameCtx.font = "20px Arial";
        this.rendererScreenHelper.gameCtx.textAlign = "center";
        this.rendererScreenHelper.gameCtx.textBaseline = "middle";
        this.rendererScreenHelper.gameCtx.fillText(risk.toString(), x + width / 2, y);
    }

    public getEndTurnButtonPosition() {
        return {
            x: this.rendererScreenHelper.gameCtx.canvas.width - 150,
            y: this.rendererScreenHelper.gameCtx.canvas.height - 70,
            width: 100,
            height: 40
        };
    }

    private renderEndTurnButton() {
        const text = "End Turn";
        const button = this.getEndTurnButtonPosition();
        // this.rendererScreenHelper.gameCtx.fillStyle = button.isHovered ? '#666666' : '#444444';
        this.rendererScreenHelper.gameCtx.fillRect(button.x, button.y, button.width, button.height);
        this.rendererScreenHelper.gameCtx.fillStyle = 'white';
        this.rendererScreenHelper.gameCtx.font = '16px Arial';
        this.rendererScreenHelper.gameCtx.textAlign = 'center';
        this.rendererScreenHelper.gameCtx.textBaseline = 'middle';
        this.rendererScreenHelper.gameCtx.fillText(text, button.x + button.width / 2, button.y + button.height / 2);
    }
    
}
