import { Card } from "../../../card/Card";
import { CardModel } from "../../model/CardModel.js";
import { Effect } from "../Effect.js";

export class ZoomInEffect extends Effect<CardModel> {
    private readonly zoomInDuration: number = 0.5; // Time to zoom in
    private readonly holdDuration: number = 1.5;   // Time to hold the zoom
    private readonly totalDuration: number = 2.0;  // Total effect duration
    private elapsed: number = 0;

    constructor(private zoomFactor: number) { // 1.1
        super();
    }

    // Returns true if the effect is still active, false if it has completed
    update(deltaTime: number): boolean {
        this.elapsed += deltaTime;
        return this.elapsed < this.totalDuration;
    }

    apply(card: CardModel): CardModel {
        // Calculate zoom factor based on current time
        let factor: number;
        if (this.elapsed < this.zoomInDuration) {
            // During zoom-in phase (0 to 0.5s)
            factor = (this.elapsed / this.zoomInDuration) * (this.zoomFactor - 1) + 1;
        } else {
            // Hold phase (0.5s to 2.0s)
            factor = this.zoomFactor;
        }

        // Apply transformations
        card.trnasformations = card.trnasformations || {};
        card.trnasformations.transition = {
            x: -(card.width * (factor - 1)) / 2,
            y: -(card.height * (factor - 1)) / 2,
        };
        
        card = card.resize(factor);
        return card;
    }
}