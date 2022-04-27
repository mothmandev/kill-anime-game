import { AssetImporter } from "./AssetImporter";
import { Enemy } from "./Enemy";
import { Graphics } from "./Graphics";
import { KeyboardDriver } from "./KeyboardDriver";
import { ObjectHandler } from "./ObjectHandler";
import { Player } from "./Player";

export class Game {

  private running: boolean = false;
  private objectHandler: ObjectHandler = new ObjectHandler();

  public constructor (
    private graphics: Graphics,
    keyboardDriver: KeyboardDriver,
  ) {
    const assetImporter = new AssetImporter();
    const player = new Player(keyboardDriver, assetImporter);
    const enemy = new Enemy(player, assetImporter);
    this.objectHandler.add(enemy);
    this.objectHandler.add(player);
  }

  public start() {
    const loop = (before: number, now: number) => {
      if (!this.running)
        return;
      this.objectHandler.tick(now - before);
      this.graphics.clear();
      this.objectHandler.render(this.graphics);
      window.requestAnimationFrame((timestamp) => loop(now, timestamp));
    }
    this.running = true;
    loop(0, 0);
  }

  public stop() {
    this.running = false;
  }

}
