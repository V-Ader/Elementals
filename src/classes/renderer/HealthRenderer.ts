import { ResourceManager } from "./ResourceManager.js";
import { getScale } from "./Utlis.js";

export class HealthRenderer {
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D, private resourceManager: ResourceManager) {
        this.context = context;
    }

    render(playerHealth: number, opponentHealth: number) {
        const radius = 75;

        const centerX = 200 * getScale();
        const centerY = this.context.canvas.height / 2 - radius;

        // Draw the circle
        this.context.beginPath();
        this.context.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.context.stroke();

        // Draw the dividing line
        this.context.beginPath();
        this.context.moveTo(centerX - radius, centerY);
        this.context.lineTo(centerX + radius, centerY);
        this.context.stroke();

        // Draw opponent's health in the top half
        this.drawOpponentHealth(opponentHealth, centerX, centerY - radius / 2);

        // Draw player's health in the bottom half
        this.drawPlayerHealth(playerHealth, centerX, centerY + radius / 2);
    }
    

    private drawPlayerHealth(health: number, x: number, y: number) {
        this.context.fillStyle = 'black';
        this.context.font = '20px Arial';
        this.context.textAlign = 'center';
        this.context.fillText(`player1: ${health}`, x, y);
    }

    private drawOpponentHealth(health: number, x: number, y: number) {
        this.context.fillStyle = 'black';
        this.context.font = '20px Arial';
        this.context.textAlign = 'center';
        this.context.fillText(`player2: ${health}`, x, y);
    }
}
