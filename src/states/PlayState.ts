import { Game } from "../classes/game/Game.js";
import { InputController } from "../classes/input/InputHandler.js";
import { GameRenderer } from "../classes/renderer/GameRenderer.js";
import { State, StateMachine } from "../classes/StateMachine.js";
import { ApplyAbilityState } from "./ApplyAbilityState.js";
import { TurnSummaryState } from "./TurnSummaryState.js";

export class PlayState implements State {
    private inputController: InputController;

    private waitForNewRound = false;

    private states: Map<string, State> = new Map();

    constructor(
        private ctx: CanvasRenderingContext2D,
        private canvas: HTMLCanvasElement,
        private game: Game,
        private stateMachine: StateMachine,
        private renderer = new GameRenderer(ctx)
    ) {
        this.inputController = new InputController(this.canvas, this.game, this.renderer);
        this.states.set('turnSummary', new TurnSummaryState(this.canvas, this.game, this.renderer, () => this.stateMachine.changeState(this)));
        // this.states.set('applyAbility', new ApplyAbilityState(this.game, , this.renderer,() => this.stateMachine.changeState(this)));
    }

    enter() {
        console.log("Starting Game");
    }

    update(deltaTime: number) {
        if (this.game.abilitiesToApply.length > 0) {
            const ability = this.game.abilitiesToApply.shift();
            if (ability !== undefined) {
                const newState = new ApplyAbilityState(this.game, ability, this.renderer, () => this.stateMachine.changeState(this));
                this.stateMachine.changeState(newState);
            }
        }

        if (this.waitForNewRound) {
            this.waitForNewRound = false;
            this.game.startNewRound();
        }

        if (this.game.roundOverFlag) {
            this.waitForNewRound = true;
            this.game.roundOverFlag = false;

            console.log("Round Over");
            this.stateMachine.changeState(this.states.get('turnSummary'));

            return;
        }

        this.game.playTurn();
    }

    render(deltaTime: number): void {
        this.renderer.render(deltaTime, this.game, this.inputController);
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
