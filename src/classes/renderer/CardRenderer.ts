import { Card, Element } from "../card/Card.js";

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

        // Draw card risk
        this.drawCardRisk(card, x, y, width, height);

        // Draw card ability button
        this.renderAbilityButton(card, {x: x + 10, y: y + height - 40});
    }

    renderCenered(card: Card, {x, y}: {x: number, y: number}, width = this.cardProperties.width, height = this.cardProperties.height) { // 👈 hand control indicator only: todo create separated renderer
        this.render(card, {x: x - width / 2, y: y - height / 2}, width, height);
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

    private drawCardRisk(card: Card, x: number, y: number, width: number, height: number) {
        this.ctx.fillStyle = "black";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(card.data.risk.toString(), x + width / 2, y + height - 20);
    }

    renderAbilityButton(card: Card, {x, y}: {x: number, y: number}, width = 50, height = 30) {
        if (!card.data.ability) {
            return;
        }
        // Draw button background
        this.ctx.fillStyle = "lightgray";
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeRect(x, y, width, height);
    
        // Draw button text
        this.ctx.fillStyle = "black";
        this.ctx.font = "16px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(card.data.ability?.name, x + width / 2, y + height / 2);
    }

    getAbilityButtonPosition(cardarea: { x: number, y: number, width: number, height: number} ) {
        return {x: cardarea.x + 10, y: cardarea.y + this.cardProperties.height - 40, width: 50, height: 30};
    }
}
