
export class HealthRenderer {
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;

    }

    render(playerHealth: number, opponentHealth: number) {
        this.drawPlayerHealth(playerHealth, 100, 10);
        this.drawOpponentHealth(opponentHealth, 100, 50);
    }

    private drawPlayerHealth(health: number, x: number, y: number) {
        this.context.fillStyle = 'black';
        this.context.font = '20px Arial';
        this.context.fillText(`player1: ${health}`, x, y);
    }

    private drawOpponentHealth(health: number, x: number, y: number) {
        this.context.fillStyle = 'black';
        this.context.font = '20px Arial';
        this.context.fillText(`player2: ${health}`, x, y);
    }
}
