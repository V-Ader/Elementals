import { State, StateMachine } from "./../classes/StateMachine.js";
import { ResourceManager } from "../classes/renderer/ResourceManager.js";
import { PlayState } from "./PlayState.js";
import { HumanPlayer } from "../classes/player/HumanPlayer.js";
import { BotPlayer } from "../classes/player/BotPlayer.js";
import { PLAYER_ID } from "../classes/player/Player.js";
import { Game } from "../classes/game/Game.js";
import { NetworkLobbyRenderer } from "../classes/renderer/customStateRenderer/NetworkLobbyRenderer.js";
import { NetworkLobbyState } from "./NetworkLobbyState.js";
import { MainMenuRenderer } from "../classes/renderer/customStateRenderer/MainMenuRenderer.js";
import { RendererScreenHelper } from "../classes/renderer/RendererScreenHelper.js";

export class MainMenuState implements State {
    private menuOptions = ["Start", "Network", "Exit"];
    private renderer = new MainMenuRenderer(this.rendererHelper, this.resourceManager, this.menuOptions);

    constructor(
        private stateMachine: StateMachine,
        private rendererHelper: RendererScreenHelper,
        private changeState: (state: State) => void,
        private resourceManager: ResourceManager
    ) {}

    enter() {
        console.log("Entering Main Menu");
    }

    update(deltaTime: number) {}

    render(deltaTime: number): void {
        this.renderer.render();
    }

    handleInput(event: MouseEvent | KeyboardEvent) {
        if (event instanceof MouseEvent && event.type === "mousedown") {
            const {mouseX, mouseY} = this.rendererHelper.getMousePositionInGame(event);

            // Sprawdź, w który przycisk kliknięto
            for (let i = 0; i < this.menuOptions.length; i++) {
                const { x, y, w, h } = this.renderer.getMenuButtonBounds(i);
                if (
                    mouseX >= x &&
                    mouseX <= x + w &&
                    mouseY >= y &&
                    mouseY <= y + h
                ) {
                    const selectedOption = this.menuOptions[i];
                    console.log(`Clicked: ${selectedOption}`);

                    if (selectedOption === "Start") {
                        this.changeState(
                            new PlayState(this.stateMachine, this.rendererHelper, this.prepareGame(), this.resourceManager)
                        );
                    } else if (selectedOption === "Exit") {
                        console.log("Exiting game...");
                    } else if (selectedOption === "Network") {
                        this.changeState(
                            new NetworkLobbyState(
                                this.stateMachine,
                                this.rendererHelper,
                                this.prepareGame(),
                                this.resourceManager,
                                () => this.changeState(this)
                            )
                        )
                    }
                    return;
                }
            }
        }
    }

    exit() {
        console.log("Exiting Main Menu");
    }

    private prepareGame() {
        const player1 = new HumanPlayer("Player 1", PLAYER_ID.PLAYER_1);
        const player2 = new BotPlayer("Player 2", PLAYER_ID.PLAYER_2);
        return new Game(player1, player2);
    }
}
