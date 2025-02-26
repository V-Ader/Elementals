import { Card } from "../Card.js";
import { Game } from "../Game.js";
import { GameRenderer } from "../renderer/GameRenderer.js";

export class InputController {
    public mousePosition = {
        x: 0,
        y: 0    
    };

    constructor(private canvas: HTMLCanvasElement, private game: Game, private renderer: GameRenderer) {
        this.initControls();
    }

    public updatePosition(x: number, y: number) {
        this.mousePosition.x = x;
        this.mousePosition.y = y;
    }

    private initControls() {
        this.canvas.addEventListener("mousedown", (event) => this.handleMouseDown(event));
        this.canvas.addEventListener("mousemove", (event) => this.handleMouseMove(event));
        this.canvas.addEventListener("mouseup", (event) => this.handleMouseUp(event));
    }

    public handleMouseInput(event: MouseEvent) {
        switch (event.type) {
            case "mousedown":
                this.handleMouseDown(event);   
                break;
            case "mousemove":
                this.handleMouseMove(event);
                break;
            case "mouseup":
                this.handleMouseUp(event);
                break;
            default:
                break;
        }
    }

    private handleMouseDown(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        this.updatePosition(event.clientX - rect.left, event.clientY - rect.top);
        console.log("Mouse down at", this.mousePosition);

        // Check if a card in hand is clicked
        for (const card of this.game.player1.cardsInPlay) {
            const cardPosition = this.renderer.getCardPosition(card);
            if (this.isInsideCard(this.mousePosition.x, this.mousePosition.y, cardPosition.x, cardPosition.y, cardPosition.width, cardPosition.height)) {
                this.game.userPointer.card = card;
                break;
            }
        }
    }

    private handleMouseMove(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        this.updatePosition(event.clientX - rect.left, event.clientY - rect.top);
        console.log("Mouse move at", this.mousePosition);

        if (this.game.userPointer.card !== Card.getEmpty()) {
            // this.renderer.updateCardPosition(this.game.userPointer.card, this.mousePosition.x, this.mousePosition.y);
        }
    }

    private handleMouseUp(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        this.updatePosition(event.clientX - rect.left, event.clientY - rect.top);
        console.log("Mouse up at", this.mousePosition);
        this.game.userPointer.card = Card.getEmpty();
    }

    private isInsideCard(x: number, y: number, cardX: number, cardY: number, cardWidth: number, cardHeight: number): boolean {
        return x >= cardX && x <= cardX + cardWidth && y >= cardY && y <= cardY + cardHeight;
    }
}