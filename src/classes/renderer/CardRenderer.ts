import { Card, Element } from "../Card.js";

export class CardRenderer {
    public cardProperties = {
        width: 100,
        height: 150,
        cornerRadius: 10,
    };

    constructor(private ctx: CanvasRenderingContext2D) {}

    render(card: Card, {x, y}: {x: number, y: number}, width = this.cardProperties.width, height = this.cardProperties.height) {
        // Draw card background
        this.drawCardBackground(x, y, width, height);

        // Draw card symbol
        this.drawCardSymbol(card, x, y, width, height);
    }

    private drawCardBackground(x: number, y: number, width: number, height: number) {
        const cornerRadius = 10;

        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;

        this.drawRoundedRect(x, y, width, height, cornerRadius);

        this.ctx.fill();
        this.ctx.stroke();
    }

    private drawCardSymbol(card: Card, x: number, y: number, width: number, height: number) {
        let color: string;
        let symbol: string;

        switch (card.data.element) {
            case Element.EARTH:
                color = "gray";
                symbol = "⛰";
                break;
            case Element.WATER:
                color = "blue";
                symbol = "💧";
                break;
            case Element.FIRE:
                color = "red";
                symbol = "🔥";
                break;
            default:
                color = "black";
                symbol = "?";
        }

        // Draw the symbol
        this.ctx.fillStyle = color;
        this.ctx.font = "50px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(symbol, x + width / 2, y + height / 2);
    }

    private drawRoundedRect(x: number, y: number, width: number, height: number, radius: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    }
}
