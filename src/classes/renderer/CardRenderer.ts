import { Card, Element } from "../card/Card.js";
import { WindowResizeEffect } from "./effect/effects/WindowResizeEffect.js";
import { EffectsController } from "./effect/EffectsController.js";
import { CardModel } from "./model/CardModel.js";
import { RendererScreenHelper } from "./RendererScreenHelper.js";
import { ResourceManager } from "./ResourceManager.js";

export class CardRenderer {

    public effectsController: EffectsController;

    constructor(private rendererScreenHelprt: RendererScreenHelper, private resourceManager: ResourceManager) {
        this.effectsController = new EffectsController();
    }

    render(card: Card, { x, y, model }: { x: number, y: number, model: CardModel}) {
        // Draw card background
        this.drawCardBackground(card, x, y, model);

        // Draw card symbol
        this.drawCardSymbol(card, x, y, model);

        // Draw card risk
        this.drawCardRisk(card, x, y, model);

        // Draw card ability button
        this.renderAbilityButton(card, { x: x, y: y + model.height - model.actionButton.height }, model);

        this.renderColorMask(card, { x, y }, model);
    }

    renderCenered(card: Card, { x, y }: { x: number, y: number }, model: CardModel) {
        this.render(card, { x: x - model.width / 2, y: y - model.height / 2, model});
    }

    renderAbilityButton(card: Card, { x, y }: { x: number, y: number }, model: CardModel) {
        if (!card.data.ability) {
            return;
        }

        const image = this.resourceManager.getMaterialImage('pergamin');

        // Draw button background
        if (image) {
            this.rendererScreenHelprt.gameCtx.save();
            this.drawRoundedRect(x, y, model.actionButton.width, model.actionButton.height, model.actionButton.cornerRadius);
            this.rendererScreenHelprt.gameCtx.clip();
            this.rendererScreenHelprt.gameCtx.drawImage(image, x, y, model.actionButton.width, model.actionButton.height);
            this.rendererScreenHelprt.gameCtx.restore();
        } else {
            this.rendererScreenHelprt.gameCtx.fillStyle = "lightgray";
            this.rendererScreenHelprt.gameCtx.strokeStyle = "black";
            this.rendererScreenHelprt.gameCtx.lineWidth = 1;
            this.drawRoundedRect(x, y, model.actionButton.width, model.actionButton.height, model.actionButton.cornerRadius);
            this.rendererScreenHelprt.gameCtx.fill();
            this.rendererScreenHelprt.gameCtx.stroke();
        }

        // Draw button text
        this.rendererScreenHelprt.gameCtx.fillStyle = "black";
        this.rendererScreenHelprt.gameCtx.font = `${model.actionButton.fontSize}px Arial`;
        this.rendererScreenHelprt.gameCtx.textAlign = "center";
        this.rendererScreenHelprt.gameCtx.textBaseline = "middle";
        this.rendererScreenHelprt.gameCtx.fillText(card.data.ability?.name, x + model.actionButton.width / 2, y + model.actionButton.height / 2);
    }

    getAbilityButtonPosition(cardarea: { x: number, y: number, model: CardModel}) {
        return { x: cardarea.x, y: cardarea.y + cardarea.model.height - cardarea.model.actionButton.height, width: cardarea.model.actionButton.width, height: cardarea.model.actionButton.height };
    }

    getOpponentCardPosition(cardNumber: number, card_id: string) {
        var model =  this.effectsController.apply(new CardModel(), card_id);

        const totalWidth = 3 * (model.width + model.maring * 2) - model.maring * 2;
        const x = model.trnasformations.transition.x + (this.rendererScreenHelprt.gameCtx.canvas.width - totalWidth) / 2 + cardNumber * (model.width + model.maring * 2);
        const y = model.trnasformations.transition.y + 100 * this.getScale();
        return { x, y, model: model };
    }

    getPlayerCardPosition(cardNumber: number, card_id: string) {
        var model =  this.effectsController.apply(new CardModel(), card_id);

        const totalWidth = 3 * (model.width + model.maring * 2) - model.maring * 2;
        const x = model.trnasformations.transition.x + (this.rendererScreenHelprt.gameCtx.canvas.width - totalWidth) / 2 + cardNumber * (model.width + model.maring * 2);
        const y = model.trnasformations.transition.y + this.rendererScreenHelprt.gameCtx.canvas.height / 2 - 100 * this.getScale();
        return { x, y, model: model};
    }

    getPlayerHandCardPosition(cardNumber: number, card_id: string) {
        var model =  this.effectsController.apply(new CardModel(), card_id);

        const totalWidth = 4 * (model.width + model.maring * 2) - model.maring * 2;
        const x = model.trnasformations.transition.x + (this.rendererScreenHelprt.gameCtx.canvas.width - totalWidth) / 2 + cardNumber * (model.width + model.maring * 2);        
        const y = model.trnasformations.transition.y + this.rendererScreenHelprt.gameCtx.canvas.height - (model.height + model.maring * 2);
        return { x, y, model: model};
    }

    private getScale() {
        return WindowResizeEffect.getScale();
    }

    private drawCardBackground(card: Card, x: number, y: number, model: CardModel) {
        const cornerRadius = 10;
        const image = this.resourceManager.getCardImage(card.data.name);

        this.rendererScreenHelprt.gameCtx.save();
        this.drawRoundedRect(x, y, model.width, model.height, cornerRadius);
        this.rendererScreenHelprt.gameCtx.clip();

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

            this.rendererScreenHelprt.gameCtx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
        } else {
            this.rendererScreenHelprt.gameCtx.fillStyle = "white";
            this.rendererScreenHelprt.gameCtx.fillRect(x, y, model.width, model.height);
        }

        this.rendererScreenHelprt.gameCtx.restore();

        this.rendererScreenHelprt.gameCtx.strokeStyle = "black";
        this.rendererScreenHelprt.gameCtx.lineWidth = 2;
        this.drawRoundedRect(x, y, model.width, model.height, cornerRadius);
        this.rendererScreenHelprt.gameCtx.stroke();
    }

    private drawCardSymbol(card: Card, x: number, y: number, model: CardModel) {
        const iconX = x + model.width - model.icon.size / 2 - model.icon.padding;
        const iconY = y + model.icon.size / 2 + model.icon.padding;
        const icon = this.resourceManager.getIconImage(`${this.getElementString(card.data.element)}`);

        if (icon) {
            this.rendererScreenHelprt.gameCtx.save();
            this.rendererScreenHelprt.gameCtx.beginPath();
            this.rendererScreenHelprt.gameCtx.arc(iconX, iconY, model.icon.size / 2, 0, Math.PI * 2);
            this.rendererScreenHelprt.gameCtx.closePath();
            this.rendererScreenHelprt.gameCtx.clip();
            this.rendererScreenHelprt.gameCtx.drawImage(icon, iconX - model.icon.size / 2, iconY - model.icon.size / 2, model.icon.size, model.icon.size);
            this.rendererScreenHelprt.gameCtx.restore();
        }
    }

    // draw a drawRoundedRect of color defined in card.trnasformations.colorMask with alpha
    private renderColorMask(card: Card, { x, y }: { x: number, y: number }, model: CardModel) {
        this.rendererScreenHelprt.gameCtx.fillStyle = `rgba(${Math.floor(model.trnasformations.colorMask.r)}, ${Math.floor(model.trnasformations.colorMask.g )}, ${Math.floor(model.trnasformations.colorMask.b )}, ${model.trnasformations.colorMask.a})`;
        this.drawRoundedRect(x, y, model.width, model.height, model.cornerRadius);
        this.rendererScreenHelprt.gameCtx.fill();
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
        this.rendererScreenHelprt.gameCtx.beginPath();
        this.rendererScreenHelprt.gameCtx.moveTo(x + radius, y);
        this.rendererScreenHelprt.gameCtx.lineTo(x + width - radius, y);
        this.rendererScreenHelprt.gameCtx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.rendererScreenHelprt.gameCtx.lineTo(x + width, y + height - radius);
        this.rendererScreenHelprt.gameCtx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.rendererScreenHelprt.gameCtx.lineTo(x + radius, y + height);
        this.rendererScreenHelprt.gameCtx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.rendererScreenHelprt.gameCtx.lineTo(x, y + radius);
        this.rendererScreenHelprt.gameCtx.quadraticCurveTo(x, y, x + radius, y);
        this.rendererScreenHelprt.gameCtx.closePath();
    }

    private drawCardRisk(card: Card, x: number, y: number, model: CardModel) {
        const padding = 5;
        const circleRadius = model.icon.size / 2;
        const circleX = x + circleRadius + padding;
        const circleY = y + circleRadius + padding;

        // Draw semi-transparent gray circle
        this.rendererScreenHelprt.gameCtx.fillStyle = "rgba(128, 128, 128, 0.5)";
        this.rendererScreenHelprt.gameCtx.beginPath();
        this.rendererScreenHelprt.gameCtx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
        this.rendererScreenHelprt.gameCtx.closePath();
        this.rendererScreenHelprt.gameCtx.fill();

        // Draw white text
        this.rendererScreenHelprt.gameCtx.fillStyle = "white";
        this.rendererScreenHelprt.gameCtx.font = `${model.fontSize}px Arial`;
        this.rendererScreenHelprt.gameCtx.textAlign = "center";
        this.rendererScreenHelprt.gameCtx.textBaseline = "middle";
        this.rendererScreenHelprt.gameCtx.fillText(card.data.risk.toString(), circleX, circleY);
    }
}
