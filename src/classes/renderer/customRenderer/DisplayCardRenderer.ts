import { Card } from "../../card/Card.js";
import { GameRenderer } from "../GameRenderer.js";
import { CardModel } from "../model/CardModel.js";

export class DisplayCardRenderer {

    constructor(private gameRenderer: GameRenderer) {
    }

    render(card: Card) {
        // fade the background
        this.gameRenderer.getContext().fillStyle = "rgba(0, 0, 0, 0.5)";
        this.gameRenderer.getContext().fillRect(0, 0, this.gameRenderer.getWindowSize().width, this.gameRenderer.getWindowSize().height);
        // render the card
        this.renderCard(card);

        //render the exit button
        this.renderExitButton();
    }

    getExitButtonPosition() {
        const card = this.getCardPosition();
        const buttonWidth = 100;
        const buttonHeight = 40;
        return {
            x: card.x - buttonWidth - 10,
            y: card.y + 10,
            width: buttonWidth,
            height: buttonHeight
        };
    }

    getCardPosition() {
        const cardModel = new CardModel().resize(2);
        return {x: (this.gameRenderer.getWindowSize().width - cardModel.width)/2, y: (this.gameRenderer.getWindowSize().height-cardModel.height)/2, model: cardModel};
    }

    getAbilityButtonPosition() {
        const card = this.getCardPosition();
        return { x: card.x + card.model.width - card.model.actionButton.width - 10, y: card.y + card.model.height - card.model.actionButton.height - 10, width: card.model.actionButton.width, height: card.model.actionButton.height };
    }
    
    private renderCard(card: Card) {
        const cardPosition = this.getCardPosition();
        this.gameRenderer.cardRenderer.render(card, { x: cardPosition.x, y: cardPosition.y, model: cardPosition.model });
    }

    private renderExitButton() {
        const button = this.getExitButtonPosition();
        this.gameRenderer.getContext().fillStyle = "rgba(200, 200, 200, 0.8)";
        this.gameRenderer.getContext().fillRect(button.x, button.y, button.width, button.height);
        this.gameRenderer.getContext().strokeStyle = "black";
        this.gameRenderer.getContext().lineWidth = 2;
        this.gameRenderer.getContext().strokeRect(button.x, button.y, button.width, button.height);
        this.gameRenderer.getContext().fillStyle = "black";
        this.gameRenderer.getContext().font = `${button.height / 2}px Arial`;
        this.gameRenderer.getContext().textAlign = "center";
        this.gameRenderer.getContext().textBaseline = "middle";
        this.gameRenderer.getContext().fillText("Close", button.x + button.width / 2, button.y + button.height / 2);

    }

    

}