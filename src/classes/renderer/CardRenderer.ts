import { Card, Element } from "../card/Card.js";
import { EffectsController } from "./effect/EffectsController.js";
import { CardModel } from "./model/CardModel.js";
import { ResourceManager } from "./ResourceManager.js";

export class CardRenderer {

    constructor(private ctx: CanvasRenderingContext2D, private resourceManager: ResourceManager) {}

    render(card: Card, { x, y, model }: { x: number, y: number, model: CardModel}) {
        // Draw card background
        this.drawCardBackground(card, x, y, model);

        // Draw card symbol
        this.drawCardSymbol(card, x, y, model);

        // Draw card risk
        this.drawCardRisk(card, x, y, model);

        // Draw card ability button
        this.renderAbilityButton(card, { x: x, y: y + model.height - model.actionButton.height }, model);
    }

    renderCenered(card: Card, { x, y }: { x: number, y: number }, model: CardModel) {
        this.render(card, { x: x - model.width / 2, y: y - model.height / 2, model});
    }

    private drawCardBackground(card: Card, x: number, y: number, model: CardModel) {
        const cornerRadius = 10;
        const image = this.resourceManager.getCardImage(card.data.name);

        this.ctx.save();
        this.drawRoundedRect(x, y, model.width, model.height, cornerRadius);
        this.ctx.clip();

        if (image) {
            const imageAspectRatio = image.width / image.height;
            const containerAspectRatio = model.width / model.height;

            let drawX, drawY, drawWidth, drawHeight;

            if (imageAspectRatio < containerAspectRatio) {
                drawWidth = model.width;
                drawHeight = model.width / imageAspectRatio; 
                drawX = x;
                drawY = y - (drawHeight - model.height) / 2;
            } else { 
                drawHeight = model.height;
                drawWidth = model.height * imageAspectRatio;
                drawX = x - (drawWidth - model.width) / 2;
                drawY = y;
            }

            this.ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
        } else {
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(x, y, model.width, model.height);
        }

        this.ctx.restore();

        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.drawRoundedRect(x, y, model.width, model.height, cornerRadius);
        this.ctx.stroke();
    }

    private drawCardSymbol(card: Card, x: number, y: number, model: CardModel) {
        const iconX = x + model.width - model.icon.size / 2 - model.icon.padding;
        const iconY = y + model.icon.size / 2 + model.icon.padding;
        const icon = this.resourceManager.getIconImage(`${this.getElementString(card.data.element)}`);

        if (icon) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(iconX, iconY, model.icon.size / 2, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.clip();
            this.ctx.drawImage(icon, iconX - model.icon.size / 2, iconY - model.icon.size / 2, model.icon.size, model.icon.size);
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

    private drawCardRisk(card: Card, x: number, y: number, model: CardModel) {
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
        this.ctx.font = `${model.fontSize}px Arial`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(card.data.risk.toString(), circleX, circleY);
    }

    renderAbilityButton(card: Card, { x, y }: { x: number, y: number }, model: CardModel) {
        if (!card.data.ability) {
            return;
        }

        const image = this.resourceManager.getMaterialImage('pergamin');

        // Draw button background
        if (image) {
            this.ctx.save();
            this.drawRoundedRect(x, y, model.actionButton.width, model.actionButton.height, model.actionButton.cornerRadius);
            this.ctx.clip();
            this.ctx.drawImage(image, x, y, model.actionButton.width, model.actionButton.height);
            this.ctx.restore();
        } else {
            this.ctx.fillStyle = "lightgray";
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 1;
            this.drawRoundedRect(x, y, model.actionButton.width, model.actionButton.height, model.actionButton.cornerRadius);
            this.ctx.fill();
            this.ctx.stroke();
        }

        // Draw button text
        this.ctx.fillStyle = "black";
        this.ctx.font = `${model.actionButton.fontSize}px Arial`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(card.data.ability?.name, x + model.actionButton.width / 2, y + model.actionButton.height / 2);
    }

    getAbilityButtonPosition(cardarea: { x: number, y: number, model: CardModel}) {
        return { x: cardarea.x, y: cardarea.y + cardarea.model.height - cardarea.model.actionButton.height, width: cardarea.model.actionButton.width, height: cardarea.model.actionButton.height };
    }
}
