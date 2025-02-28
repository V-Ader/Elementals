import { Card } from "../Card.js";
import { Game } from "../Game.js";
import { PLAYER_TYPE } from "../Player.js";
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
        // const rect = this.canvas.getBoundingClientRect();
        // this.updatePosition(event.clientX - rect.left, event.clientY - rect.top);
        // console.log("Mouse down at", this.mousePosition);

        for(let i = 0; i < this.game.player1.cardsInPlay.length; i++) {
            const cardPosition = this.renderer.getPlayerHandCardPosition(i);
            if(this.isInsideCard(this.mousePosition.x, this.mousePosition.y, cardPosition.x, cardPosition.y, cardPosition.width, cardPosition.height)) {
                this.game.userPointer.card = this.game.player1.cardsInPlay[i];
                this.game.userPointer.last_take_position = i;
                break;
            }
        }
        // for(let i = 0; i < this.game.player_cards.length; i++) {
        //     const cardPosition = this.renderer.getPlayerCardPosition(i);
        //     if(this.isInsideCard(this.mousePosition.x, this.mousePosition.y, cardPosition.x, cardPosition.y, cardPosition.width, cardPosition.height)) {
        //         this.game.userPointer.card = this.game.player_cards[i];
        //         break;
        //     }
        // }
        // for(let i = 0; i < this.game.enemy_cards.length; i++) {
        //     const cardPosition = this.renderer.getOpponentCardPosition(i);
        //     if(this.isInsideCard(this.mousePosition.x, this.mousePosition.y, cardPosition.x, cardPosition.y, cardPosition.width, cardPosition.height)) {
        //         this.game.userPointer.card = this.game.enemy_cards[i];
        //         break;
        //     }
        // }
    }

    private handleMouseMove(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        this.updatePosition(event.clientX - rect.left, event.clientY - rect.top);
        // console.log("Mouse move at", this.mousePosition);
    }

    private handleMouseUp(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        this.updatePosition(event.clientX - rect.left, event.clientY - rect.top);
        // console.log("Mouse up at", this.mousePosition);;
        let table_position = undefined;
        let card_position = this.game.userPointer.last_take_position;

        // get dropping position
        for(let i = 0; i < this.game.player_cards.length; i++) {
            const cardPosition = this.renderer.getPlayerCardPosition(i);
            if(this.isInsideCard(this.mousePosition.x, this.mousePosition.y, cardPosition.x, cardPosition.y, cardPosition.width, cardPosition.height)) {
                table_position = i;
                break;
            }
        }

        console.log("get from hand", card_position, "drop on table", table_position);

        if (table_position !== undefined) this.game.playCard(card_position, table_position, PLAYER_TYPE.PLAYER_2);
       

        this.game.userPointer.card = Card.getEmpty();
    }

    private isInsideCard(x: number, y: number, cardX: number, cardY: number, cardWidth: number, cardHeight: number): boolean {
        return x >= cardX && x <= cardX + cardWidth && y >= cardY && y <= cardY + cardHeight;
    }
}