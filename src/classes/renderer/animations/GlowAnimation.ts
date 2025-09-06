import { Animation } from "./Animation.js";

export class GlowAnimation extends Animation {
    private initialDuration: number;
    private fadeInDuration: number;
    private fadeOutDuration: number;
    private phaseDuration: number;

    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public duration: number,
        public color: string
    ) {
        super();
        this.initialDuration = duration;
        this.phaseDuration = duration * 0.3; // 30% for each phase
        this.fadeInDuration = this.phaseDuration;
        this.fadeOutDuration = this.phaseDuration;
    }

    override update(deltaTime: number): boolean {
        this.duration -= deltaTime;
        if (this.duration <= 0) {
            this.isFinished = true;
        }
        return true;
    }

    override render(ctx: CanvasRenderingContext2D): void {
        let alpha: number;
        const timeElapsed = this.initialDuration - this.duration;

        // Calculate alpha based on the three phases of animation
        if (timeElapsed < this.fadeInDuration) {
            // Fade in phase
            alpha = timeElapsed / this.fadeInDuration;
        } else if (this.duration < this.fadeOutDuration) {
            // Fade out phase
            alpha = this.duration / this.fadeOutDuration;
        } else {
            // Full opacity phase
            alpha = 1;
        }

        // Draw the inner solid circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        // Draw the outer glow effect
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.globalAlpha = alpha * 0.5; // A little transparent to blend better
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.radius * 2;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}