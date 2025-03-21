import { Game } from "../../game/Game.js";

export class Ability {
    name: string = 'undefined name'; 
    description: string = 'undefined description';
    corelated_card_id: string = '0';
    isActive: boolean = false;

    execute(game: Game){};

    corelateWithCardById(id: string){
        this.corelated_card_id = id;
    };

    isCardPlayers(game: Game): boolean {
        return game.players.player_1.cards.find(card => card.id === this.corelated_card_id) !== undefined;
    }

    isCardOpponents(game: Game): boolean {
            return game.players.player_2.cards.find(card => card.id === this.corelated_card_id) !== undefined;
    }

    isEmpty(): boolean {
        return this.name === 'undefined name';
    }
}