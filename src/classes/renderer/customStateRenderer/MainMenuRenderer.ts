import { RendererScreenHelper } from "../RendererScreenHelper.js";
import { ResourceManager } from "../ResourceManager.js";

export class MainMenuRenderer {
    private selectedIndex = 0;


    constructor(private rendererHelper: RendererScreenHelper, private resourceManager: ResourceManager, private menuOptions: string[]) {
    }

    render() { 
        this.renderBackground();
        this.renderMenuPanel();
        this.renderMenuOptions();
    }

    // 🖼️ Tło
    private renderBackground() {
        const background = this.resourceManager.getBackgroundImage("background2");
        if (background) {
            this.rendererHelper.backgroundCtx.drawImage(background, 0, 0, this.rendererHelper.backgroundCtx.canvas.width, this.rendererHelper.backgroundCtx.canvas.height);
        } else {
            this.rendererHelper.backgroundCtx.fillStyle = "#222";
            this.rendererHelper.backgroundCtx.fillRect(0, 0, this.rendererHelper.gameCtx.canvas.width, this.rendererHelper.gameCtx.canvas.height);
        }
    }

    private renderMenuPanel() {
        // const panelWidth = this.rendererHelper.gameCtx.canvas.width * 0.3;
        // const panelHeight = this.rendererHelper.gameCtx.canvas.height;
        // this.rendererHelper.gameCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
        // this.rendererHelper.gameCtx.fillRect(0, 0, panelWidth, panelHeight);

        // Nagłówek
        this.rendererHelper.gameCtx.fillStyle = "#0a0606ff";
        this.rendererHelper.gameCtx.font = "bold 36px Arial";
        this.rendererHelper.gameCtx.textAlign = "left";
        this.rendererHelper.gameCtx.fillText("Main menu", 40, 80);
    }

    // 📐 Nowa funkcja — wylicza pozycję i rozmiar przycisku
    public getMenuButtonBounds(index: number): { x: number; y: number; w: number; h: number } {
        const paddingLeft = 30;
        const startY = this.rendererHelper.gameCtx.canvas.height / 4;
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
     this.rendererHelper.gameCtx.font = "28px Arial";
     this.rendererHelper.gameCtx.textAlign = "left";

        this.menuOptions.forEach((option, index) => {
            const { x, y, w, h } = this.getMenuButtonBounds(index);

            // Zaznacz aktualną opcję
            if (index === this.selectedIndex) {
             this.rendererHelper.gameCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
             this.rendererHelper.gameCtx.fillRect(x, y, w, h);
             this.rendererHelper.gameCtx.fillStyle = "#000";
            } else {
             this.rendererHelper.gameCtx.fillStyle = "#fff";
            }

         this.rendererHelper.gameCtx.fillText(option, x + 20, y + 30);
        });
    }

    // draw a circle at the cursor position
    public renderCursor(x: number, y: number) {


     this.rendererHelper.gameCtx.fillStyle = "red";
     this.rendererHelper.gameCtx.beginPath();
     this.rendererHelper.gameCtx.arc(x, y, 10, 0, Math.PI * 2);
     this.rendererHelper.gameCtx.closePath();
     this.rendererHelper.gameCtx.fill();
    }

    
}
