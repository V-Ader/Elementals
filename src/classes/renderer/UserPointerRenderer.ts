import { Card } from "../Card.js";
import { UserPointer } from "../UserPointer.js";
import { InputController } from "../input/InputHandler.js";
import { CardRenderer } from "./CardRenderer.js";

export class UserPointerRenderer {
    constructor(private ctx: CanvasRenderingContext2D, private cardRenderer: CardRenderer) {}

    render(controller: UserPointer, inputController: InputController) {
        // Draw the circle
        // this.ctx.beginPath();
        // this.ctx.arc(inputController.mousePosition.x, inputController.mousePosition.y, 50, 0, Math.PI * 2);
        // this.ctx.fillStyle = 'blue';
        // this.ctx.fill(); // Fill the circle
        // this.ctx.lineWidth = 2;
        // this.ctx.strokeStyle = 'black';
        // this.ctx.stroke(); // Outline the circle
        if (controller.card !== Card.getEmpty()) {
            this.cardRenderer.render(controller.card, inputController.mousePosition.x, inputController.mousePosition.y);
        }
    }
}