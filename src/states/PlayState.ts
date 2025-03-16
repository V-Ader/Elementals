import { Game } from "../classes/game/Game.js";
import { InputController } from "../classes/input/InputHandler.js";
import { GameRenderer } from "../classes/renderer/GameRenderer.js";
import { State } from "../classes/StateMachine.js";

export class PlayState implements State {
    private inputController: InputController;

    private waitForNewRound = false;

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
        if (this.waitForNewRound) {
            return;
        }
        this.game.playTurn(); // handle players' movements
        this.game.update(deltaTime); // update game based on the time and movements

        if (this.game.isRoundOver()) {
            this.waitForNewRound = true;

            console.log("Round Over");
            for (let i = 0; i < 3; i++) {
                this.game.resolveCardPair(i);

                if (this.game.isGameOver()) {
                    console.log("Game Over");                        
                    // sleep for 2 seconds
                    this.game.startNewGame(); 
                    this.waitForNewRound = false;
                    return;
                }

            }

            this.game.startNewRound();
            this.waitForNewRound = false;
            return;
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
