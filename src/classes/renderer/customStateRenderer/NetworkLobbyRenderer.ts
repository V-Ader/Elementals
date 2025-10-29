import { Game } from "../../game/Game.js";
import { CardRenderer } from "../CardRenderer.js";
import { UserPointerRenderer } from "../UserPointerRenderer.js";
import { InputController } from "../../input/InputHandler.js";
import { HealthRenderer } from "../HealthRenderer.js";
import { ResourceManager } from "../ResourceManager.js";
import { PLAYER_ID } from "../../player/Player.js";
import { EffectsController } from "../effect/EffectsController.js";
import { CardModel } from "../model/CardModel.js";
import { RendererScreenHelper } from "../RendererScreenHelper.js";


export class NetworkLobbyRenderer {

    constructor(private rendererHelper: RendererScreenHelper, private resourceManager: ResourceManager) {
    }

    render() { 
      this.renderJoinButtonPosition();
      this.renderReturnButtonPosition();
    }

    public getJoinButtonPosition() {
        return {
            x: this.rendererHelper.gameCtx.canvas.width / 2 - 50,
            y: this.rendererHelper.gameCtx.canvas.height - 70,
            width: 100,
            height: 40
        };
    }

    private renderJoinButtonPosition() {
        const text = "Join";
        const button = this.getJoinButtonPosition();
        // this.rendererHelper.gameCtx.fillStyle = button.isHovered ? '#666666' : '#444444';
        this.rendererHelper.gameCtx.fillRect(button.x, button.y, button.width, button.height);
        this.rendererHelper.gameCtx.fillStyle = 'white';
        this.rendererHelper.gameCtx.font = '16px Arial';
        this.rendererHelper.gameCtx.textAlign = 'center';
        this.rendererHelper.gameCtx.textBaseline = 'middle';
        this.rendererHelper.gameCtx.fillText(text, button.x + button.width / 2, button.y + button.height / 2);
    }

    public getReturnButtonPosition() {
        return {
            x: this.rendererHelper.gameCtx.canvas.width / 2 - 50,
            y: this.rendererHelper.gameCtx.canvas.height - 150,
            width: 100,
            height: 40
        };
    }

    private renderReturnButtonPosition() {
        const text = "Back";
        const button = this.getReturnButtonPosition();
        // this.rendererHelper.gameCtx.fillStyle = button.isHovered ? '#666666' : '#444444';
        this.rendererHelper.gameCtx.fillRect(button.x, button.y, button.width, button.height);
        this.rendererHelper.gameCtx.fillStyle = 'white';
        this.rendererHelper.gameCtx.font = '16px Arial';
        this.rendererHelper.gameCtx.textAlign = 'center';
        this.rendererHelper.gameCtx.textBaseline = 'middle';
        this.rendererHelper.gameCtx.fillText(text, button.x + button.width / 2, button.y + button.height / 2);
    }
    
}
