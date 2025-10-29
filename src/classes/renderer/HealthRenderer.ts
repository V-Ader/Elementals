import { WindowResizeEffect } from "./effect/effects/WindowResizeEffect.js";
import { RendererScreenHelper } from "./RendererScreenHelper.js";
import { ResourceManager } from "./ResourceManager.js";

export class HealthRenderer {

    constructor(private rendererScreenHelper: RendererScreenHelper, private resourceManager: ResourceManager) {}

    render(playerHealth: number, opponentHealth: number) {
        const radius = 75;

        const centerX = 200 * WindowResizeEffect.getScale();
        const centerY = this.rendererScreenHelper.gameCtx.canvas.height / 2 - radius;

        // Draw the circle
        this.rendererScreenHelper.gameCtx.beginPath();
        this.rendererScreenHelper.gameCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.rendererScreenHelper.gameCtx.stroke();

        // Draw the dividing line
        this.rendererScreenHelper.gameCtx.beginPath();
        this.rendererScreenHelper.gameCtx.moveTo(centerX - radius, centerY);
        this.rendererScreenHelper.gameCtx.lineTo(centerX + radius, centerY);
        this.rendererScreenHelper.gameCtx.stroke();

        // Draw opponent's health in the top half
        this.drawOpponentHealth(opponentHealth, centerX, centerY - radius / 2);

        // Draw player's health in the bottom half
        this.drawPlayerHealth(playerHealth, centerX, centerY + radius / 2);
    }
    

    private drawPlayerHealth(health: number, x: number, y: number) {
        this.rendererScreenHelper.gameCtx.fillStyle = 'black';
        this.rendererScreenHelper.gameCtx.font = '20px Arial';
        this.rendererScreenHelper.gameCtx.textAlign = 'center';
        this.rendererScreenHelper.gameCtx.fillText(`player1: ${health}`, x, y);
    }

    private drawOpponentHealth(health: number, x: number, y: number) {
        this.rendererScreenHelper.gameCtx.fillStyle = 'black';
        this.rendererScreenHelper.gameCtx.font = '20px Arial';
        this.rendererScreenHelper.gameCtx.textAlign = 'center';
        this.rendererScreenHelper.gameCtx.fillText(`player2: ${health}`, x, y);
    }
}
