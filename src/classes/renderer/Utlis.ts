export function getScale(): number {
    const aspectRatio = 16 / 9;
    const windowAspectRatio = window.innerWidth / window.innerHeight;
    return windowAspectRatio > aspectRatio ? window.innerHeight / 1080 : window.innerWidth / 1920;
}