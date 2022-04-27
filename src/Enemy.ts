import { GameObject } from "./GameObject";
import { Graphics } from "./Graphics";
import { Player } from "./Player";
import { Vec2d } from "./Vec2d";

export interface EnemyImporter {
  enemySprite(): HTMLImageElement;
  enemyflippedSprite(): HTMLImageElement;
}

export class Enemy implements GameObject {

  private readonly enemySprite: HTMLImageElement;
  private readonly enemyflippedSprite: HTMLImageElement;

  private pos = new Vec2d(1000, 475);
  private speed = 0.1;
  private movementStateX: 'left' | 'right' = 'left';
  private movementStateY: 'up' | 'down' | 'still' = 'still';
  private activeSprite: HTMLImageElement;

  public constructor (
    private player: Player,
    importer: EnemyImporter,
  ) {
    this.enemySprite = importer.enemySprite();
    this.enemyflippedSprite = importer.enemyflippedSprite();
    this.activeSprite = this.enemyflippedSprite;
  }

  public tick(delta: number): void {
    switch (this.movementStateX) {
      case 'left':
        this.pos.x -= this.speed * delta;
        break;
      case 'right':
        this.pos.x += this.speed * delta;
        break;
    }
    
    switch (this.movementStateY) {
      case 'up':
        this.pos.y -= this.speed * delta;
        break;
      case 'down':
        this.pos.y += this.speed * delta;
        break;
    }

    const bottomMostPoint = new Vec2d(this.pos.x, this.pos.y + 200);

    this.movementStateX = this.player.pointOnRight(bottomMostPoint)
      ? 'left' : this.player.pointOnLeft(bottomMostPoint)
        ? 'right' : this.movementStateX;

    this.movementStateY = this.player.pointAbove(bottomMostPoint)
      ? 'down' : this.player.pointBelow(bottomMostPoint)
        ? 'up' : 'still';
  }

  public render(g: Graphics): void {
    this.activeSprite = this.movementStateX === 'left' ? this.enemyflippedSprite : this.enemySprite;

    g.drawImage(
      this.activeSprite,
      new Vec2d(this.pos.x, this.pos.y),
      new Vec2d(null, 250),
    );
  }

}
