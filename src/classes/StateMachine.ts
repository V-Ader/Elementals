export interface State {
    enter(): void;
    update(deltaTime: number): void;
    handleInput(event: MouseEvent | KeyboardEvent): void;
    render(deltaTime: number): void;
    exit(): void;
}

export class StateMachine {
    private currentState: State | null = null;

    changeState(newState: State | undefined) {
        if (!newState) return;
        this.currentState?.exit();
        this.currentState = newState;
        this.currentState.enter();
    }

    update(deltaTime: number) {
        this.currentState?.update(deltaTime);
    }

    render(deltaTime: number) {
        this.currentState?.render(deltaTime);
    }

    handleInput(event: MouseEvent | KeyboardEvent) {
        this.currentState?.handleInput(event);
    }
}
