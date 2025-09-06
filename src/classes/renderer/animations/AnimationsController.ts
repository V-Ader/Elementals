import { Animation } from "./Animation.js";

export class AnimationsController {
    private animationPool: Animation[] = [];

    update(deltaTime: number) {
        this.animationPool = this.animationPool.filter(animation => !animation.isFinished);
        this.animationPool.forEach(animation => animation.update(deltaTime));
    }

    render(ctx: CanvasRenderingContext2D) {
        this.animationPool.forEach(animation => animation.render(ctx));
    }

    add(animation: Animation) {
        this.animationPool.push(animation);
    }
}