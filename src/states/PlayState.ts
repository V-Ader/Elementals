import { Game } from "../classes/Game.js";
import { InputController } from "../classes/input/InputHandler.js";
import { GameRenderer } from "../classes/renderer/GameRenderer.js";
import { State } from "../classes/StateMachine.js";

export class PlayState implements State {
    private inputController: InputController;

    constructor(
        private ctx: CanvasRenderingContext2D,
        private canvas: HTMLCanvasElement,
        private game: Game,
        private renderer = new GameRenderer(ctx),
    ) {
        this.inputController = new InputController(this.canvas, this.game, this.renderer);
    }

    enter() {
        console.log("Starting Game");
    }

    update(deltaTime: number) {
        this.game.playTurn();
        this.game.update(deltaTime);
    }

    render(): void {
        this.renderer.render(this.game, this.inputController);
    }

    handleInput(event: MouseEvent | KeyboardEvent) {
        if (event instanceof MouseEvent) {
            this.inputController.handleMouseInput(event);
        } else if (event instanceof KeyboardEvent) {
            // this.game.handleKeyboardInput(event);
        }
    }

    exit() {
        console.log("Exiting Game");
    }
}
