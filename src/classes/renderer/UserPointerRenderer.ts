import { Card } from "../Card.js";
import { UserPointer } from "../UserPointer.js";
import { InputController } from "../input/InputHandler.js";
import { CardRenderer } from "./CardRenderer.js";

export class UserPointerRenderer {
    constructor(private ctx: CanvasRenderingContext2D, private cardRenderer: CardRenderer) {}

    render(controller: UserPointer, inputController: InputController) {
        if (controller.card !== Card.getEmpty()) {
            this.cardRenderer.render(controller.card, {x: inputController.mousePosition.x, y: inputController.mousePosition.y});
        }
    }
}