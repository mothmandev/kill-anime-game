import { CanvasGraphics } from './CanvasGraphics';
import { Game } from './Game';
import { KeyboardDriver } from './KeyboardDriver';
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

const canvas = document.createElement('canvas');
canvas.width = 1280;
canvas.height = 720;
app.appendChild(canvas);
const game = new Game(new CanvasGraphics(canvas), new KeyboardDriver());
game.start();
