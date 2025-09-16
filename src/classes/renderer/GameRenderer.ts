import { Game } from "../game/Game.js";
import { CardRenderer } from "./CardRenderer.js";
import { UserPointerRenderer } from "./UserPointerRenderer.js";
import { InputController } from "../input/InputHandler.js";
import { HealthRenderer } from "./HealthRenderer.js";
import { ResourceManager } from "./ResourceManager.js";
import { PLAYER_ID } from "../player/Player.js";
import { EffectsController } from "./effect/EffectsController.js";
import { CardModel } from "./model/CardModel.js";


export class GameRenderer {
    public cardRenderer: CardRenderer;
    private healthRenderer: HealthRenderer;
    private userPointerRenderer: UserPointerRenderer;
    private resourceManager: ResourceManager;

    public effectsController: EffectsController;


    constructor(private ctx: CanvasRenderingContext2D) {
        this.resourceManager = new ResourceManager();
        this.cardRenderer = new CardRenderer(ctx, this.resourceManager);
        this.userPointerRenderer = new UserPointerRenderer(ctx, this.cardRenderer);
        this.healthRenderer = new HealthRenderer(ctx, this.resourceManager);

        this.effectsController = new EffectsController();
    }

    render(deltaTime: number, game: Game, inputController: InputController | null = null) { 
        // update all animations in pool
        this.effectsController.update(deltaTime);

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
        if(inputController) this.userPointerRenderer.render(game.userPointer, inputController);

        // Render end turn button
        this.renderEndTurnButton();
    }

    // public addAnimation(animation: Animation) {
    //     this.animationsController.add(animation);
    // }
    getScale() {
        return 1;
    }

    private renderOpponentCards(game: Game) {
        for (let i = 0; i < game.players.get(PLAYER_ID.PLAYER_2).cards.length; i++) {
            const card_id = game.players.get(PLAYER_ID.PLAYER_2).cards[i].id;
            const cardPosition = this.getOpponentCardPosition(i, card_id);
                       
            this.cardRenderer.render(game.players.get(PLAYER_ID.PLAYER_2).cards[i], cardPosition);
            this.renderSlotRisk(game.players.get(PLAYER_ID.PLAYER_2).cards_risks[i], cardPosition.x, cardPosition.y - cardPosition.model.fontSize - 10, cardPosition.model.width);
        } 
    }

    public getOpponentCardPosition(cardNumber: number, card_id: string) {
        var model =  this.effectsController.apply(new CardModel(), card_id);

        const totalWidth = 3 * (model.width + model.maring * 2) - model.maring * 2;
        const x = (this.ctx.canvas.width - totalWidth) / 2 + cardNumber * (model.width + model.maring * 2);
        const y = 100 * this.getScale();
        return { x, y, model: model };
    }

    private renderPlayerCards(game: Game) {
        for (let i = 0; i < game.players.get(PLAYER_ID.PLAYER_1).cards.length; i++) {
            const card_id = game.players.get(PLAYER_ID.PLAYER_1).cards[i].id;
            const cardPosition = this.getPlayerCardPosition(i, card_id);

            this.cardRenderer.render(game.players.get(PLAYER_ID.PLAYER_1).cards[i], cardPosition);
            this.renderSlotRisk(game.players.get(PLAYER_ID.PLAYER_1).cards_risks[i], cardPosition.x, cardPosition.y +cardPosition.model.height + 20, cardPosition.model.width);
        }    
    }

    public getPlayerCardPosition(cardNumber: number, card_id: string) {
        var model =  this.effectsController.apply(new CardModel(), card_id);

        const totalWidth = 3 * (model.width + model.maring * 2) - model.maring * 2;
        const x = (this.ctx.canvas.width - totalWidth) / 2 + cardNumber * (model.width + model.maring * 2);
        const y = this.ctx.canvas.height / 2 - 100 * this.getScale();
        return { x, y, model: model};
    }

    private renderPlayerHandCards(game: Game) {
        for (let i = 0; i < game.players.get(PLAYER_ID.PLAYER_1).player.cardsInPlay.length; i++) {
            const card_id = game.players.get(PLAYER_ID.PLAYER_1).player.cardsInPlay[i].id;
            const cardPosition = this.getPlayerHandCardPosition(i, card_id);

            this.cardRenderer.render(game.players.get(PLAYER_ID.PLAYER_1).player.cardsInPlay[i], cardPosition);
        }
    }

    public getPlayerHandCardPosition(cardNumber: number, card_id: string) {
        var model =  this.effectsController.apply(new CardModel(), card_id);

        const totalWidth = 4 * (model.width + model.maring * 2) - model.maring * 2;
        const x = (this.ctx.canvas.width - totalWidth) / 2 + cardNumber * (model.width + model.maring * 2);        
        const y = this.ctx.canvas.height - (model.height + model.maring * 2);
        return { x, y, model: model};
    }

    private renderPlayersHealth(game: Game) {
        this.healthRenderer.render(game.players.get(PLAYER_ID.PLAYER_1).player.health, game.players.get(PLAYER_ID.PLAYER_2).player.health);
    }

    private renderSlotRisk(risk: number, x: number, y: number, width: number) {
        this.ctx.fillStyle = "black";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(risk.toString(), x + width / 2, y);
    }

    public getEndTurnButtonPosition() {
        return {
            x: this.ctx.canvas.width - 150,
            y: this.ctx.canvas.height - 70,
            width: 100,
            height: 40
        };
    }

    private renderEndTurnButton() {
        const text = "End Turn";
        const button = this.getEndTurnButtonPosition();
        // this.ctx.fillStyle = button.isHovered ? '#666666' : '#444444';
        this.ctx.fillRect(button.x, button.y, button.width, button.height);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, button.x + button.width / 2, button.y + button.height / 2);
    }
    
}
