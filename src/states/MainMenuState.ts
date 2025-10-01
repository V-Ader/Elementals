import { State } from "./../classes/StateMachine.js";
import { ResourceManager } from "../classes/renderer/ResourceManager.js";

export class MainMenuState implements State {
    private menuOptions = ["Start", "Options", "Exit"];
    private selectedIndex = 0;

    constructor(
        private ctx: CanvasRenderingContext2D,
        private onStart: () => void,
        private resourceManager: ResourceManager
    ) {}

    enter() {
        console.log("Entering Main Menu");
    }

    update(deltaTime: number) {}

    render(deltaTime: number): void {
        this.renderBackground();
        this.renderMenuPanel();
        this.renderMenuOptions();
    }

    // 🖼️ Tło
    private renderBackground() {
        const background = this.resourceManager.getBackgroundImage("background1");
        if (background) {
            this.ctx.drawImage(background, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        } else {
            this.ctx.fillStyle = "#222";
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        }
    }

    // 🧱 Panel menu
    private renderMenuPanel() {
        const panelWidth = this.ctx.canvas.width * 0.3;
        const panelHeight = this.ctx.canvas.height;
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.fillRect(0, 0, panelWidth, panelHeight);

        // Nagłówek
        this.ctx.fillStyle = "#fff";
        this.ctx.font = "bold 36px Arial";
        this.ctx.textAlign = "left";
        this.ctx.fillText("MAIN MENU", 40, 80);
    }

    // 📐 Nowa funkcja — wylicza pozycję i rozmiar przycisku
    private getMenuButtonBounds(index: number): { x: number; y: number; w: number; h: number } {
        const paddingLeft = 30;
        const startY = 160;
        const buttonWidth = 200;
        const buttonHeight = 40;
        const lineHeight = 50;

        const y = startY + index * lineHeight - 30;

        return {
            x: paddingLeft,
            y,
            w: buttonWidth,
            h: buttonHeight,
        };
    }

    // 🧾 Rysowanie opcji menu
    private renderMenuOptions() {
        this.ctx.font = "28px Arial";
        this.ctx.textAlign = "left";

        this.menuOptions.forEach((option, index) => {
            const { x, y, w, h } = this.getMenuButtonBounds(index);

            // Zaznacz aktualną opcję
            if (index === this.selectedIndex) {
                this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                this.ctx.fillRect(x, y, w, h);
                this.ctx.fillStyle = "#000";
            } else {
                this.ctx.fillStyle = "#fff";
            }

            this.ctx.fillText(option, x + 20, y + 30);
        });
    }

    // 🖱️ Obsługa wejścia
    handleInput(event: MouseEvent | KeyboardEvent) {
        if (event instanceof MouseEvent && event.type === "mousedown") {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            // Sprawdź, w który przycisk kliknięto
            for (let i = 0; i < this.menuOptions.length; i++) {
                const { x, y, w, h } = this.getMenuButtonBounds(i);
                if (
                    mouseX >= x &&
                    mouseX <= x + w &&
                    mouseY >= y &&
                    mouseY <= y + h
                ) {
                    this.selectedIndex = i;
                    const selectedOption = this.menuOptions[i];
                    console.log(`Clicked: ${selectedOption}`);

                    if (selectedOption === "Start") {
                        this.onStart();
                    } else if (selectedOption === "Exit") {
                        console.log("Exiting game...");
                    }
                    return; // zakończ po pierwszym trafieniu
                }
            }
        } else if (event instanceof KeyboardEvent) {
            if (event.key === "ArrowDown") {
                this.selectedIndex = (this.selectedIndex + 1) % this.menuOptions.length;
            } else if (event.key === "ArrowUp") {
                this.selectedIndex =
                    (this.selectedIndex - 1 + this.menuOptions.length) % this.menuOptions.length;
            } else if (event.key === "Enter") {
                const selectedOption = this.menuOptions[this.selectedIndex];
                console.log(`Selected: ${selectedOption}`);
                if (selectedOption === "Start") this.onStart();
            }
        }
    }

    exit() {
        console.log("Exiting Main Menu");
    }
}
