import { Game } from "../classes/game/Game.js";
import { PLAYER_ID } from "../classes/player/Player.js";
import { ColorMaskEffect } from "../classes/renderer/effect/effects/ColorMaskEffect.js";
import { ZoomInEffect } from "../classes/renderer/effect/effects/ZoomInEffect.js";
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
        if (this.timeLeft == this.iterationTime) {
            this.renderer.cardRenderer.effectsController.addEffect(new ZoomInEffect(1.1), this.game.players.get(PLAYER_ID.PLAYER_1).cards[this.tableCardsIteration].id);
            this.renderer.cardRenderer.effectsController.addEffect(new ZoomInEffect(1.1), this.game.players.get(PLAYER_ID.PLAYER_2).cards[this.tableCardsIteration].id);

            this.applyEffects(this.game.getWinnerForPair(this.tableCardsIteration));
        }

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

    // apply src/classes/renderer/effect/effects/ColorMaskEffect.ts on cards based on winner
    private applyEffects(winner: number) {
        if (winner === -1) {
            this.renderer.cardRenderer.effectsController.addEffect(new ColorMaskEffect(this.game.players.get(PLAYER_ID.PLAYER_1).cards[this.tableCardsIteration].data.element), this.game.players.get(PLAYER_ID.PLAYER_2).cards[this.tableCardsIteration].id);
        } else if (winner === 1) {
            this.renderer.cardRenderer.effectsController.addEffect(new ColorMaskEffect(this.game.players.get(PLAYER_ID.PLAYER_2).cards[this.tableCardsIteration].data.element), this.game.players.get(PLAYER_ID.PLAYER_1).cards[this.tableCardsIteration].id);
        }
    }

}
