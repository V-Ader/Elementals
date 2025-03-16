import { StateMachine } from "./classes/StateMachine.js";
import { MainMenuState } from "./states/MainMenuState.js";
import { PlayState } from "./states/PlayState.js";
import { Game } from "./classes/game/Game.js";
import { PLAYER_ID } from "./classes/player/Player.js";
import { HumanPlayer } from "./classes/player/HumanPlayer.js";
import { BotPlayer } from "./classes/player/BotPlayer.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

function resizeCanvas() {
    const aspectRatio = 16 / 9;
    const windowAspectRatio = window.innerWidth / window.innerHeight;

    if (windowAspectRatio > aspectRatio) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerHeight * aspectRatio;
    } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth / aspectRatio;
    }

    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
}

// Initial resize
resizeCanvas();

// Resize canvas on window resize
window.addEventListener("resize", resizeCanvas);

const player1 = new HumanPlayer("Player 1", PLAYER_ID.PLAYER_1);
const player2 = new BotPlayer("Player 2", PLAYER_ID.PLAYER_2);
const game = new Game(player1, player2);

const stateMachine = new StateMachine();

// Start game in Main Menu state
stateMachine.changeState(
    new MainMenuState(ctx, () => {
        stateMachine.changeState(new PlayState(ctx, canvas, game));
    })
);

// Main loop
let lastTime = 0;

function mainLoop(timestamp: number) {
    const deltaTime = (timestamp - lastTime) / 1000;
    if (deltaTime < 1 / 60) {
        requestAnimationFrame(mainLoop);
        return;
    }
    lastTime = timestamp;
    stateMachine.update(deltaTime);

    stateMachine.render();

    requestAnimationFrame(mainLoop);
}

mainLoop(0);

// Handle input
canvas.addEventListener("mousedown", (event) => stateMachine.handleInput(event));
canvas.addEventListener("mousemove", (event) => stateMachine.handleInput(event));
canvas.addEventListener("mouseup", (event) => stateMachine.handleInput(event));
window.addEventListener("keydown", (event) => stateMachine.handleInput(event));
window.addEventListener("keyup", (event) => stateMachine.handleInput(event));
