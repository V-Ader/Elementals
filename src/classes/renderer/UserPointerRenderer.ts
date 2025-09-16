import { Card, Element } from "../card/Card.js";
import { UserPointer } from "../UserPointer.js";
import { InputController } from "../input/InputHandler.js";
import { CardRenderer } from "./CardRenderer.js";
import { CardModel } from "./model/CardModel.js";

export class UserPointerRenderer {
    constructor(private ctx: CanvasRenderingContext2D, private cardRenderer: CardRenderer) {}

    render(controller: UserPointer, inputController: InputController) {
        if (controller.card.data.element !== Element.UNDEFINED) {
            var model = new CardModel();
            // model = this.cardRenderer.(model);
            this.cardRenderer.renderCenered(controller.card, {x: inputController.mousePosition.x, y: inputController.mousePosition.y}, new CardModel());
        }
    }
}