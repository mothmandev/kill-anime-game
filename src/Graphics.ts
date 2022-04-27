import { Opt } from "./Opt";
import { Vec2d } from "./Vec2d";

export interface Graphics {
  clear(): void;
  drawImage(image: HTMLImageElement, pos: Vec2d<number>, size: Opt<Vec2d<Opt<number>>>): void;
}
