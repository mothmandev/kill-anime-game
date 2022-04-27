import { GameObject } from "./GameObject";
import { Graphics } from "./Graphics";
import { KeyboardDriver } from "./KeyboardDriver";
import { Trackable } from "./Trackable";
import { Vec2d } from "./Vec2d";

export interface PlayerImporter {
  player1Sprite(): HTMLImageElement;
  player2Sprite(): HTMLImageElement;
  player1flippedSprite(): HTMLImageElement;
  player2flippedSprite(): HTMLImageElement;
}

export class Player implements GameObject, Trackable {

  private readonly sprite1: HTMLImageElement;
  private readonly sprite2: HTMLImageElement;
  private readonly sprite1flipped: HTMLImageElement;
  private readonly sprite2flipped: HTMLImageElement;

  private pos = new Vec2d(0, 520);
  private speed = 1;
  private movementState: 'left' | 'right' | 'still' = 'still';
  private lastDirection: 'left' | 'right' = 'right';
  private activeSprite: HTMLImageElement;
  private attacking = false;
  private attackElapsed = 0;
  private attackDuration = 250;

  public constructor (
    private keyboardDriver: KeyboardDriver,
    importer: PlayerImporter,
  ) {
    this.sprite1 = importer.player1Sprite();
    this.sprite2 = importer.player2Sprite();
    this.sprite1flipped = importer.player1flippedSprite();
    this.sprite2flipped = importer.player2flippedSprite();
    this.activeSprite = this.sprite1;
  }
  
  public tick(delta: number): void {
    switch (this.movementState) {
      case 'left':
        this.pos.x -= this.speed * delta;
        break;
      case 'right':
        this.pos.x += this.speed * delta;
        break;
    }

    this.checkMovementKeyInput(delta);

    if (this.keyboardDriver.pressed('k') && !this.attacking) {
      this.attacking = true;
      this.attackElapsed = 0;
    } else if (this.attacking) {
      this.attackElapsed += delta;
      if (this.attackElapsed >= this.attackDuration)
        this.attacking = false;
    }

    if (this.movementState !== 'still')
      this.lastDirection = this.movementState;
  }

  private checkMovementKeyInput(delta: number) {
    this.keyboardDriver.xor(
      'a', 'd',
      () => this.movementState = 'left',
      () => this.movementState = 'right',
      () => this.movementState = 'still'
    );

    this.keyboardDriver.xor(
      'w', 's',
      () => this.pos.y -= this.speed * delta,
      () => this.pos.y += this.speed * delta
    );
  }

  public render(g: Graphics): void {
    type LazyImage = () => HTMLImageElement;
    
    const isHitting = (yes: LazyImage, no: LazyImage) =>
      this.attacking ? yes() : no();

    const leftOrRight = (left: LazyImage, right: LazyImage): HTMLImageElement => {
      switch (this.lastDirection) {
        case 'left':
          return left()
        case 'right':
          return right()
      }
    }

    this.activeSprite = isHitting(
      () => leftOrRight(
        () => this.sprite1flipped,
        () => this.sprite1,
      ),
      () => leftOrRight(
        () => this.sprite2flipped,
        () => this.sprite2,
      ),
    )
    
    const dirop = (x: number) => this.lastDirection === 'left' ? -x : x;
    const xOffset = (posX: number) => this.attacking ? posX + dirop(100) : posX;

    g.drawImage(
      this.activeSprite,
      new Vec2d(xOffset(this.pos.x), this.pos.y),
      new Vec2d(null, 200),
    );
  }

  public pointOnLeft(point: Vec2d<number>): boolean {
    return point.x < this.pos.x;
  }

  public pointOnRight(point: Vec2d<number>): boolean {
    return point.x > this.pos.x + 100;
  }

  public pointAbove(point: Vec2d<number>): boolean {
    return point.y < this.pos.y;
  }

  public pointBelow(point: Vec2d<number>): boolean {
    return point.y > this.pos.y + 100;
  }

  public pointColliding(point: Vec2d<number>): boolean {
    return !(this.pointOnLeft(point)
      || this.pointOnRight(point)
      || this.pointAbove(point)
      || this.pointBelow(point));
  }

}
