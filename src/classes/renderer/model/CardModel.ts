import { Model } from "./Models.js";

export class CardModel implements Model {
    width: number;
    height: number;
    cornerRadius: number;
    maring: number;
    fontSize: number;
    icon: {size: number, padding: number};
    elementIndicator: {circleRadius: number, padding: number};
    actionButton: {width: number, height: number, cornerRadius: number, fontSize: number};

    constructor(
        width: number = 180,
        height: number = 270,
        cornerRadius: number = 20,
        maring: number = 20,
        fontSize: number = 16,
        icon: { size: number, padding: number } = { size: 40, padding: 10 },
        elementIndicator: { circleRadius: number, padding: number } = { circleRadius: 30, padding: 10 },
        actionButton: { width: number, height: number, cornerRadius: number, fontSize: number } = { width: 180, height: 40, cornerRadius: 20, fontSize: 16 }) {
            this.width = width;
            this.height = height;
            this.cornerRadius = cornerRadius;
            this.maring = maring;
            this.fontSize = fontSize;
            this.icon = icon;
            this.elementIndicator = elementIndicator;
            this.actionButton = actionButton;
        }
};
