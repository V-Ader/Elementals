import { Game } from "../classes/game/Game.js";
import { PLAYER_ID } from "../classes/player/Player.js";
import { GameRenderer } from "../classes/renderer/GameRenderer.js";
import { State, StateMachine } from "../classes/StateMachine.js";
import { PlayState } from "./PlayState.js";

export class TurnSummaryState implements State {
    private timeLeft: number = 5; // 10 seconds in milliseconds

    constructor(
        private canvas: HTMLCanvasElement,
        private game: Game,
        private renderer: GameRenderer,
        private returnToPlay: () => void
    ) {}

    enter() {
        this.timeLeft = 5;
    }

    update(deltaTime: number) {
        console.log(this.timeLeft);
        this.timeLeft -= deltaTime;
        
        if (this.timeLeft <= 0) {
            for (let i = 0; i < this.game.BOARD_CARD_SLOT_COUNT; i++) {
                this.game.resolveCardPair(i);
            }
            if (this.game.isGameOver()) {
                this.game.startNewGame();
            } else {
                this.game.startNewRound();
            }
            this.returnToPlay();
        }
    }

    render(deltaTime: number) {
        this.renderer.render(deltaTime, this.game, null);
    }

    handleInput(event: MouseEvent | KeyboardEvent) {
        // NO INPUT EXPECTED
    }

    exit() {}
}
