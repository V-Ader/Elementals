
export class Animation {
    public isFinished: boolean = false;

    update(deltaTime: number): boolean {
        this.isFinished = true;
        return true; // Return true if the animation is complete
    }

    render(ctx: CanvasRenderingContext2D): void {
        // Default render does nothing
    }
}