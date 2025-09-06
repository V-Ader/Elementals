import { Card, Element } from "../card/Card.js";
import { Game } from "../game/Game.js";
import { PLAYER_ID } from "../player/Player.js";
import { GameRenderer } from "../renderer/GameRenderer.js";

export class InputController {
    public mousePosition = {
        x: 0,
        y: 0    
    };

    private isEndTurnButtonHovered = false;

    constructor(private canvas: HTMLCanvasElement, private game: Game, private renderer: GameRenderer) {
    }

    public updatePosition(x: number, y: number) {
        this.mousePosition.x = x;
        this.mousePosition.y = y;
    }

    private isPointInEndTurnButton(x: number, y: number): boolean {
        const button = this.renderer.getEndTurnButtonPosition();
        return x >= button.x && 
               x <= button.x + button.width &&
               y >= button.y && 
               y <= button.y + button.height;
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
        if (this.isPointInEndTurnButton(this.mousePosition.x, this.mousePosition.y)) {
            console.log("End Turn button clicked");
            if (this.game.cardPlayed || this.game.abilityPlayed) {
                this.game.cardPlayed = false;
                this.game.abilityPlayed = false;
                this.game.endTurn();
            }
            return;
        }

        // handle card from hand selection
        for(let i = 0; i <  this.game.players.get(PLAYER_ID.PLAYER_1).player.cardsInPlay.length; i++) {
            const cardPosition = this.renderer.getPlayerHandCardPosition(i);
            if(this.isInsideCard(this.mousePosition.x, this.mousePosition.y, cardPosition.x, cardPosition.y, cardPosition.width, cardPosition.height)) {
                this.game.userPointer.card =  this.game.players.get(PLAYER_ID.PLAYER_1).player.cardsInPlay[i];
                this.game.userPointer.last_take_position = i;
                break;
            }
        }

        // handle card from table selection
        for (let i = 0; i < this.game.players.get(PLAYER_ID.PLAYER_1)?.cards.length; i++) {
            if ( this.game.players.get(PLAYER_ID.PLAYER_1).cards[i].data.element == Element.UNDEFINED) continue;

            const cardPosition = this.renderer.getPlayerCardPosition(i);
            if (this.isInsideCard(this.mousePosition.x, this.mousePosition.y, cardPosition.x, cardPosition.y, cardPosition.width, cardPosition.height)) {
                console.log("table card clicked", i);

                // if ability clicked
                const button = this.renderer.cardRenderer.getAbilityButtonPosition(cardPosition);
                if ( this.game.players.get(PLAYER_ID.PLAYER_1).cards[i].data.ability) {
                    if (this.isInsideCard(this.mousePosition.x, this.mousePosition.y, button.x, button.y, button.width, button.height)) {
                        console.log("ability clicked");
                         this.game.players.get(PLAYER_ID.PLAYER_1).cards[i].data.ability?.execute(this.game);
                        break;
                    }
                }
            }
        }
    }

    private handleMouseMove(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        this.updatePosition(event.clientX - rect.left, event.clientY - rect.top);
    }

    private handleMouseUp(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        this.updatePosition(event.clientX - rect.left, event.clientY - rect.top);
        let table_position = undefined;
        let card_position = this.game.userPointer.last_take_position;

        // get dropping position
        for(let i = 0; i <  this.game.players.get(PLAYER_ID.PLAYER_1).cards.length; i++) {
            const cardPosition = this.renderer.getPlayerCardPosition(i);
            if(this.isInsideCard(this.mousePosition.x, this.mousePosition.y, cardPosition.x, cardPosition.y, cardPosition.width, cardPosition.height)) {
                table_position = i;
                break;
            }
        }

        console.log("get from hand", card_position, "drop on table", table_position);

        if (table_position !== undefined && !this.game.cardPlayed){
            this.game.playCard(card_position, table_position, PLAYER_ID.PLAYER_1);
            this.game.cardPlayed = true;
        }
       

        this.game.userPointer.card = Card.getEmpty();
    }

    private isInsideCard(x: number, y: number, cardX: number, cardY: number, cardWidth: number, cardHeight: number): boolean {
        return x >= cardX && x <= cardX + cardWidth && y >= cardY && y <= cardY + cardHeight;
    }
}