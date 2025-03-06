import { Card, Element } from "../card/Card.js";
import { ResourceManager } from "./ResourceManager.js";

export class CardRenderer {
    public cardProperties = {
        width: 100,
        height: 150,
        cornerRadius: 10,

        icon : {
            size: 20,
            padding: 5
        },

        elementIndicator: {
            circleRadius: 15,
            padding: 5
        },

        actionButton: {
            width: 100,
            height: 30,
            cornerRadius: 5
        }
    };

    constructor(private ctx: CanvasRenderingContext2D, private resourceManager: ResourceManager) {}

    render(card: Card, {x, y}: {x: number, y: number}, width = this.cardProperties.width, height = this.cardProperties.height) {
        // Draw card background
        this.drawCardBackground(card, x, y, width, height);

        // Draw card symbol
        this.drawCardSymbol(card, x, y, width, height);

        // Draw card risk
        this.drawCardRisk(card, x, y, width, height);

        // Draw card ability button
        this.renderAbilityButton(card, {x: x, y: y + height - 30});
    }

    renderCenered(card: Card, {x, y}: {x: number, y: number}, width = this.cardProperties.width, height = this.cardProperties.height) {
        this.render(card, {x: x - width / 2, y: y - height / 2}, width, height);
    }

    private drawCardBackground(card: Card, x: number, y: number, width: number, height: number) {
        const cornerRadius = 10;
        const image = this.resourceManager.getCardImage(card.data.name);

        if (image) {
            this.ctx.save();
            this.drawRoundedRect(x, y, width, height, cornerRadius);
            this.ctx.clip();
            this.ctx.drawImage(image, x, y, width, height);
            this.ctx.restore();
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        } else {
            // Fallback to white background if image is not found
            this.ctx.fillStyle = "white";
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 2;
            this.drawRoundedRect(x, y, width, height, cornerRadius);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    private drawCardSymbol(card: Card, x: number, y: number, width: number, height: number) {
        const iconX = x + width - this.cardProperties.icon.size / 2 - this.cardProperties.icon.padding;
        const iconY = y + this.cardProperties.icon.size / 2 + this.cardProperties.icon.padding;
        const icon = this.resourceManager.getIconImage(`${this.getElementString(card.data.element)}`);

        if (icon) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(iconX, iconY, this.cardProperties.icon.size / 2, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.clip();
            this.ctx.drawImage(icon, iconX - this.cardProperties.icon.size / 2, iconY - this.cardProperties.icon.size / 2, this.cardProperties.icon.size, this.cardProperties.icon.size);
            this.ctx.restore();
        }
    }

    private getElementString(element: Element): string {
        switch (element) {
            case Element.FIRE:
                return "fire";
            case Element.WATER:
                return "water";
            case Element.EARTH:
                return "earth";
            case Element.UNDEFINED:
                return "undefined";
            default:
                return "undefined";
        }
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
        const padding = 5;
        const circleRadius = 15;
        const circleX = x + circleRadius + padding;
        const circleY = y + circleRadius + padding;

        // Draw semi-transparent gray circle
        this.ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
        this.ctx.beginPath();
        this.ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();

        // Draw white text
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(card.data.risk.toString(), circleX, circleY);
    }

    renderAbilityButton(card: Card, {x, y}: {x: number, y: number}) {
        if (!card.data.ability) {
            return;
        }

        const cornerRadius = 5;
        const image = this.resourceManager.getMaterialImage('pergamin');

        // Draw button background
        if (image) {
            this.ctx.save();
            this.drawRoundedRect(x, y, this.cardProperties.actionButton.width, this.cardProperties.actionButton.height, cornerRadius);
            this.ctx.clip();
            this.ctx.drawImage(image, x, y, this.cardProperties.actionButton.width, this.cardProperties.actionButton.height);
            this.ctx.restore();
        } else {
            this.ctx.fillStyle = "lightgray";
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 1;
            this.drawRoundedRect(x, y, this.cardProperties.actionButton.width, this.cardProperties.actionButton.height, cornerRadius);
            this.ctx.fill();
            this.ctx.stroke();
        }

        // Draw button text
        this.ctx.fillStyle = "black";
        this.ctx.font = "16px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(card.data.ability?.name, x + this.cardProperties.actionButton.width / 2, y + this.cardProperties.actionButton.height / 2);
    }

    getAbilityButtonPosition(cardarea: { x: number, y: number, width: number, height: number} ) {
        return {x: cardarea.x, y: cardarea.y + this.cardProperties.height - 30, width: this.cardProperties.actionButton.width, height: this.cardProperties.actionButton.height};
    }
}
