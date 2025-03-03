import { Game } from "../classes/Game.js";
import { InputController } from "../classes/input/InputHandler.js";
import { GameRenderer } from "../classes/renderer/GameRenderer.js";
import { State } from "../classes/StateMachine.js";

export class PlayState implements State {
    private inputController: InputController;

    private waitForNewTurn = false;

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
        if (this.waitForNewTurn) {
            return;
        }
        this.game.playTurn();
        this.game.update(deltaTime);

        if (this.game.isGameOver()) {
            console.log("Game Over");
            this.waitForNewTurn = true;
            
            // sleep for 1 second
            setTimeout(() => {
                this.game.startNewGame(); 
                this.waitForNewTurn = false;
            }, 1000);
        }

        if (this.game.isTurnOver()) {
            this.waitForNewTurn = true;

            console.log("Turn Over");
            this.game.resolveTheBoard();

            // sleep for 1 second
            setTimeout(() => {
                this.game.startNewTurn(); 
                this.waitForNewTurn = false;
            }, 1000);
        }
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
