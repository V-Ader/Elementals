export class RendererScreenHelper {
    constructor(
        public backgroundCtx: CanvasRenderingContext2D,
        public gameCtx: CanvasRenderingContext2D
    ){}

    public getMousePositionInGame(event: MouseEvent): { mouseX: number; mouseY: number } {
        const rect = this.gameCtx.canvas.getBoundingClientRect();
        return {
            mouseX: event.clientX - rect.left,
            mouseY: event.clientY - rect.top
        };
    }
}