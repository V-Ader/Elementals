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
import { Button } from "../ui/component/button/Button.js";


export class NetworkLobbyRenderer {

    constructor(private rendererHelper: RendererScreenHelper, private resourceManager: ResourceManager) {
    }

    render() { 
        this.renderBackground();
        
        this.renderJoinButtonPosition();
        this.renderReturnButtonPosition();
    }

    private renderBackground() {
        const background = this.resourceManager.getBackgroundImage("background2");
        if (background) {
            this.rendererHelper.backgroundCtx.drawImage(background, 0, 0, this.rendererHelper.backgroundCtx.canvas.width, this.rendererHelper.backgroundCtx.canvas.height);
        }
        this.rendererHelper.gameCtx.clearRect(0, 0, this.rendererHelper.gameCtx.canvas.width, this.rendererHelper.gameCtx.canvas.height);

    }

    public getJoinButton() {
        return new Button(
            this.rendererHelper.gameCtx.canvas.width / 2 - 50,
            this.rendererHelper.gameCtx.canvas.height - 150,
            100,
            40,
            "Join"
        );
    }

    private renderJoinButtonPosition() {
        const button = this.getJoinButton();
        button.render(this.rendererHelper);
    }

    public getReturnButtonPosition() {
        return new Button(
            this.rendererHelper.gameCtx.canvas.width / 2 - 50,
            this.rendererHelper.gameCtx.canvas.height - 70,
            100,
            40,
            "Back"
        );
    }

    private renderReturnButtonPosition() {
        const button = this.getReturnButtonPosition();        
        button.render(this.rendererHelper);
    }
    
}
