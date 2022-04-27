import { Graphics } from "./Graphics";

export interface GameObject {
  tick(delta: number): void;
  render(g: Graphics): void;
}
