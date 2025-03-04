import { Card } from "../card/Card.js";
import { Game } from "../Game.js";
import { Player } from "../player/Player.js";
import { CardRenderer } from "./CardRenderer.js";

export class Renderer {
    private cardRenderer: CardRenderer;

    constructor(private ctx: CanvasRenderingContext2D) {
        this.cardRenderer = new CardRenderer(ctx);
    }

    renderMenu() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.ctx.fillStyle = "#000";
        this.ctx.font = "36px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Click to Start", window.innerWidth / 2, 200);
    }
}
