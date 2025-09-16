import { State } from "./../classes/StateMachine.js";

export class MainMenuState implements State {
    constructor(private ctx: CanvasRenderingContext2D, private onStart: () => void) {}

    enter() {
        console.log("Entering Main Menu");
    }

    update(deltaTime: number) {
    }

    render(deltaTime: number): void {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.ctx.fillStyle = "#000";
        this.ctx.font = "36px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("MENU", window.innerWidth / 2, 100);
        this.ctx.fillText("Click to Start", window.innerWidth / 2, 200);
    }

    handleInput(event: MouseEvent | KeyboardEvent) {
        if (event instanceof MouseEvent && event.type === "mousedown") {
            console.log("Clicked in main menu");
            this.onStart();
        } else if (event instanceof KeyboardEvent) {
            console.log("Pressed key in main menu");
        }
    }

    exit() {
        console.log("Exiting Main Menu");
    }
}
