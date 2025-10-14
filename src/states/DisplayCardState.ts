import { Game } from "../classes/game/Game.js";
import { GameUtils } from "../classes/game/GameUtils.js";
import { Ability } from "../classes/card/ability/Ability.js";
import { PLAYER_ID } from "../classes/player/Player.js";
import { Effect } from "../classes/renderer/effect/Effect.js";
import { GameRenderer } from "../classes/renderer/GameRenderer.js";
import { CardModel } from "../classes/renderer/model/CardModel.js";
import { State, StateMachine } from "../classes/StateMachine.js";
import { PlayState } from "./PlayState.js";
import { EffectFactory } from "../classes/renderer/effect/effects/EffectFactory.js";
import { DisplayCardRenderer } from "../classes/renderer/customRenderer/DisplayCardRenderer.js";
import { StateChangeTrigger, STATE_CHANGE_TYPE } from "./StateChangeTrigger.js";

export class DisplayCardState implements State {
    private timeLeft: number = 0;
    private displayDuration = 5; // seconds

    private customRenderer: DisplayCardRenderer;

    constructor(
        private game: Game,
        public cardId: string,
        private renderer: GameRenderer,
        private returnToPlay: () => void
    ) {
        this.customRenderer = new DisplayCardRenderer(this.renderer);
    }

    enter() {
        this.timeLeft = this.displayDuration;
    }

    update(deltaTime: number) {

    }

    render(deltaTime: number) {
        this.renderer.render(deltaTime, this.game, null);
        this.customRenderer.render(GameUtils.getCardById(this.cardId, this.game));
    }

    handleInput(event: MouseEvent | KeyboardEvent) {
        if (event instanceof MouseEvent && event.type === "mousedown") {
            // on exit button click
            const mousePosition = this.getMousePosition(event);
            const button = this.customRenderer.getExitButtonPosition();
            if (this.isInsideCard(mousePosition.x, mousePosition.y, button.x, button.y, button.width, button.height)) {
                this.returnToPlay();
            }

            // on abilityClick
            const abilityButton = this.customRenderer.getAbilityButtonPosition();
            if (this.isInsideCard(mousePosition.x, mousePosition.y, abilityButton.x, abilityButton.y, abilityButton.width, abilityButton.height)) {
                console.log("ability clicked");
                // this.game.players.get(PLAYER_ID.PLAYER_1).cards[i].data.ability?.execute(this.game);
                const ability = GameUtils.getCardById(this.cardId, this.game).data.ability;
                if (ability && ability.isAvailable(this.game)) {
                    this.game.gameStateChangePool.push(new StateChangeTrigger(STATE_CHANGE_TYPE.ABILITY, ability));
                }
                this.returnToPlay();
            }
            

            // on anywhere else click
            this.returnToPlay();
        }
    }

    exit() {}

    private isInsideCard(x: number, y: number, cardX: number, cardY: number, cardWidth: number, cardHeight: number): boolean {
        return x >= cardX && x <= cardX + cardWidth && y >= cardY && y <= cardY + cardHeight;
    }

    private getMousePosition(event: MouseEvent): { x: number; y: number } {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
}
