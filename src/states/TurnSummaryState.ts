import { Game } from "../classes/game/Game.js";
import { PLAYER_ID } from "../classes/player/Player.js";
import { GameRenderer } from "../classes/renderer/GameRenderer.js";
import { State, StateMachine } from "../classes/StateMachine.js";
import { PlayState } from "./PlayState.js";

export class TurnSummaryState implements State {
    private timeLeft: number = 0; 
    private tableCardsIteration = 0;
    private iterationTime = 2;

    constructor(
        private canvas: HTMLCanvasElement,
        private game: Game,
        private renderer: GameRenderer,
        private returnToPlay: () => void
    ) {}

    enter() {
        this.timeLeft = this.iterationTime;
        this.tableCardsIteration = 0;
    }

    update(deltaTime: number) {
        console.log(this.timeLeft);
        this.timeLeft -= deltaTime;
        
        if (this.timeLeft <= 0) {
            this.game.resolveCardPair(this.tableCardsIteration);

            this.tableCardsIteration += 1;
            this.timeLeft = this.iterationTime;
        }
        if (this.tableCardsIteration >= this.game.BOARD_CARD_SLOT_COUNT) {
            this.returnToPlay();
        }
    }

    render(deltaTime: number) {
        this.renderer.render(deltaTime, this.game, null);
    }

    handleInput(event: MouseEvent | KeyboardEvent): void {
        // NO INPUT EXPECTED
    }

    exit() {}
}
