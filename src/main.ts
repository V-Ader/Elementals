import { StateMachine } from "./classes/StateMachine.js";
import { MainMenuState } from "./states/MainMenuState.js";
import { PlayState } from "./states/PlayState.js";
import { Game } from "./classes/Game.js";
import { Player } from "./classes/Player.js";
import { Renderer } from "./classes/renderer/Renderer.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player1 = new Player("Player 1");
const player2 = new Player("Player 2");
const game = new Game(player1, player2);
const renderer = new Renderer(ctx);



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
    lastTime = timestamp;
    stateMachine.update(deltaTime);

    stateMachine.render();

    requestAnimationFrame(mainLoop);
}

mainLoop(0);
