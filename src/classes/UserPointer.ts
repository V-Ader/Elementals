import { Card } from "./Card.js";

export class UserPointer {
    constructor(public card: Card = Card.getEmpty()) {}
}
