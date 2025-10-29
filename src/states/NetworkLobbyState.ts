import { Game } from "../classes/game/Game.js";
import { InputController } from "../classes/input/InputHandler.js";
import { GameRenderer } from "../classes/renderer/GameRenderer.js";
import { State, StateMachine } from "../classes/StateMachine.js";
import { ApplyAbilityState } from "./ApplyAbilityState.js";
import { TurnSummaryState } from "./TurnSummaryState.js";
import { STATE_CHANGE_TYPE } from "./StateChangeTrigger.js";
import { DisplayCardState } from "./DisplayCardState.js";
import { ResourceManager } from "../classes/renderer/ResourceManager.js";
import { NetworkLobbyRenderer } from "../classes/renderer/customStateRenderer/NetworkLobbyRenderer.js";
import { PlayState } from "./PlayState.js";
import { RendererScreenHelper } from "../classes/renderer/RendererScreenHelper.js";


export class NetworkLobbyState implements State {

    private SERVER_URL = "ws://localhost:8080/elementals/lobby";
    private RANDOM_PLAYER_ID = Math.floor(Math.random() * 10000).toString(); 

    private renderer;


    constructor(
        private stateMachine: StateMachine,
        private rendererHelper: RendererScreenHelper,
        private game: Game,
        private resourceManager: ResourceManager,
        private returnToMenu: () => void,
    ) {
        this.renderer = new NetworkLobbyRenderer(rendererHelper, resourceManager);
    }

    enter() {
        console.log("Starting Network Lobby");
    }

    update(deltaTime: number) {
        
    }

    render(deltaTime: number): void {
        this.renderer.render();
    }

    handleInput(event: MouseEvent | KeyboardEvent) {
        if (event instanceof MouseEvent && event.type === "click") {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const joinButton = this.renderer.getJoinButtonPosition();
            if (mouseX >= joinButton.x && mouseX <= joinButton.x + joinButton.width &&
                mouseY >= joinButton.y && mouseY <= joinButton.y + joinButton.height) {
                console.log("Join button clicked");
                return;
            }
            const returnButton = this.renderer.getReturnButtonPosition();
            if (mouseX >= returnButton.x && mouseX <= returnButton.x + returnButton.width &&
                mouseY >= returnButton.y && mouseY <= returnButton.y + returnButton.height) {
                console.log("Return button clicked");
                this.returnToMenu();
                return;
            }
        }
    }

    exit() {
        console.log("Exiting Game");
    }
}
