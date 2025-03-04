import { Card } from "./card/Card.js";

export class UserPointer {
    public last_take_position = 0;
    constructor(public card: Card = Card.getEmpty()) {
        console.log("UserPointer created");
    }
}
