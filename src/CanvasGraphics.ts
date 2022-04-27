import { Graphics } from "./Graphics";
import { Opt } from "./Opt";
import { Vec2d } from "./Vec2d";

export class CanvasGraphics implements Graphics {

  private ctx: CanvasRenderingContext2D;

  public constructor (
    private canvas: HTMLCanvasElement,
  ) {
    this.ctx = canvas.getContext('2d')!;
  }

  public clear(): void {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public drawImage(
    image: HTMLImageElement,
    pos: Vec2d<number>,
    size: Opt<Vec2d<Opt<number>>>,
  ): void {
    if (size !== null) {
      if (size.y !== null)
        this.ctx.drawImage(image, pos.x, pos.y, size.x ?? image.width / image.height * size.y, size.y);
      else if (size.x !== null)
        this.ctx.drawImage(image, pos.x, pos.y, size.x, size.y ?? image.height / image.width * size.x);
      else
        throw new Error('cannot resize image to (null, null)')
    } else {
      this.ctx.drawImage(image, pos.x, pos.y);
    }
  }


}
