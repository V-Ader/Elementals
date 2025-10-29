import { State, StateMachine } from "./classes/StateMachine.js";
import { MainMenuState } from "./states/MainMenuState.js";
import { PlayState } from "./states/PlayState.js";
import { Game } from "./classes/game/Game.js";
import { PLAYER_ID } from "./classes/player/Player.js";
import { HumanPlayer } from "./classes/player/HumanPlayer.js";
import { BotPlayer } from "./classes/player/BotPlayer.js";
import { ResourceManager } from "./classes/renderer/ResourceManager.js";
import { RendererScreenHelper } from "./classes/renderer/RendererScreenHelper.js";


const rendererHelper = new RendererScreenHelper(
    (document.getElementById("backgroundCanvas") as HTMLCanvasElement).getContext("2d")!,
    (document.getElementById("gameCanvas") as HTMLCanvasElement).getContext("2d")!,
)

function resizeCanvas() {
    const aspectRatio = 16 / 9;
    const windowAspectRatio = window.innerWidth / window.innerHeight;

    // Game canvas (maintains 16:9 aspect ratio)
    if (windowAspectRatio > aspectRatio) {
        rendererHelper.gameCtx.canvas.height = window.innerHeight;
        rendererHelper.gameCtx.canvas.width = window.innerHeight * aspectRatio;
    } else {
        rendererHelper.gameCtx.canvas.width = window.innerWidth;
        rendererHelper.gameCtx.canvas.height = window.innerWidth / aspectRatio;
    }

    rendererHelper.gameCtx.canvas.style.width = `${rendererHelper.gameCtx.canvas.width}px`;
    rendererHelper.gameCtx.canvas.style.height = `${rendererHelper.gameCtx.canvas.height}px`;

    // Background canvas (covers entire window while maintaining aspect ratio)
    rendererHelper.backgroundCtx.canvas.width = window.innerWidth;
    rendererHelper.backgroundCtx.canvas.height = window.innerHeight;

    // Calculate background dimensions to maintain aspect ratio while covering the window
    const bgAspectRatio = 16 / 9;
    const bgWindowRatio = window.innerWidth / window.innerHeight;
    
    if (bgWindowRatio > bgAspectRatio) {
        // Window is wider than aspect ratio - scale based on width
        const scale = window.innerWidth / rendererHelper.backgroundCtx.canvas.width;
        rendererHelper.backgroundCtx.canvas.width = window.innerWidth;
        rendererHelper.backgroundCtx.canvas.height = (window.innerWidth / bgAspectRatio);
        // Center vertically
        rendererHelper.backgroundCtx.canvas.style.top = `${-(rendererHelper.backgroundCtx.canvas.height - window.innerHeight) / 2}px`;
        rendererHelper.backgroundCtx.canvas.style.left = "0";
    } else {
        // Window is taller than aspect ratio - scale based on height
        const scale = window.innerHeight / rendererHelper.backgroundCtx.canvas.height;
        rendererHelper.backgroundCtx.canvas.height = window.innerHeight;
        rendererHelper.backgroundCtx.canvas.width = (window.innerHeight * bgAspectRatio);
        // Center horizontally
        rendererHelper.backgroundCtx.canvas.style.left = `${-(rendererHelper.backgroundCtx.canvas.width - window.innerWidth) / 2}px`;
        rendererHelper.backgroundCtx.canvas.style.top = "0";
    }

    rendererHelper.backgroundCtx.canvas.style.position = "fixed";
    rendererHelper.backgroundCtx.canvas.style.zIndex = "-1";
}

// Initial resize
resizeCanvas();

// Resize canvas on window resize
window.addEventListener("resize", resizeCanvas);

const stateMachine = new StateMachine();

const resourceManager = new ResourceManager();

// Start game in Main Menu state
stateMachine.changeState(
    new MainMenuState(
        stateMachine,
        rendererHelper,
        (newState: State) => {
            stateMachine.changeState(newState);
        },
        resourceManager
    )
);

// Main loop
let lastTime = 0;

function mainLoop(timestamp: number) {
    const deltaTime = (timestamp - lastTime) / 1000;
    if (deltaTime < 1 / 30) {
        requestAnimationFrame(mainLoop);
        return;
    }
    lastTime = timestamp;
    stateMachine.update(deltaTime);

    stateMachine.render(deltaTime);

    requestAnimationFrame(mainLoop);
}

mainLoop(0);

// Handle input
rendererHelper.gameCtx.canvas.addEventListener("mousedown", (event) => stateMachine.handleInput(event));
rendererHelper.gameCtx.canvas.addEventListener("mousemove", (event) => stateMachine.handleInput(event));
rendererHelper.gameCtx.canvas.addEventListener("mouseup", (event) => stateMachine.handleInput(event));
window.addEventListener("keydown", (event) => stateMachine.handleInput(event));
window.addEventListener("keyup", (event) => stateMachine.handleInput(event));
