export class StateChangeTrigger {
    public type: STATE_CHANGE_TYPE;
    public data: any;

    constructor(type: STATE_CHANGE_TYPE, data: any) {
        this.type = type;
        this.data = data;
    }

}

export enum STATE_CHANGE_TYPE {
    ABILITY,
    DISPLAY_CARD
}