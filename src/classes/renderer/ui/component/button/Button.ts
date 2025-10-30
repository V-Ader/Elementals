import { RendererScreenHelper } from "../../../RendererScreenHelper.js";


export class Button {
    private isHoveredState: boolean = false;
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public text: string
    ){}

    isHovered(mouseX: number, mouseY: number): boolean {
        this.isHoveredState =  mouseX >= this.x && mouseX <= this.x + this.width &&
               mouseY >= this.y && mouseY <= this.y + this.height;
        return this.isHoveredState;
    }

    render(rendererHelper: RendererScreenHelper) {
        rendererHelper.gameCtx.fillStyle = this.isHoveredState? '#57575746' : '#777777ff';

        rendererHelper.gameCtx.fillRect(this.x, this.y, this.width, this.height);
        rendererHelper.gameCtx.fillStyle = 'white';
        rendererHelper.gameCtx.font = '16px Arial';
        rendererHelper.gameCtx.textAlign = 'center';
        rendererHelper.gameCtx.textBaseline = 'middle';
        rendererHelper.gameCtx.fillStyle = '#d7d7d7ff';

        rendererHelper.gameCtx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
}