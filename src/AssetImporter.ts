import { PlayerImporter } from "./Player";
import player1Sprite from "/assets/player1.png";
import player2Sprite from "/assets/player2.png";
import player1flippedSprite from "/assets/player1flipped.png";
import player2flippedSprite from "/assets/player2flipped.png";
import enemySprite from "/assets/enemy.png";
import enemyflippedSprite from "/assets/enemyflipped.png";
import { EnemyImporter } from "./Enemy";
// import bossSprite from "/assets/boss.png";

export class AssetImporter implements PlayerImporter, EnemyImporter {
  public player1Sprite(): HTMLImageElement {
    return this.makeImage(player1Sprite);
  }

  public player2Sprite(): HTMLImageElement {
    return this.makeImage(player2Sprite);
  }

  public player1flippedSprite(): HTMLImageElement {
    return this.makeImage(player1flippedSprite);
  }

  public player2flippedSprite(): HTMLImageElement {
    return this.makeImage(player2flippedSprite);
  }

  public enemySprite(): HTMLImageElement {
    return this.makeImage(enemySprite);
  }

  public enemyflippedSprite(): HTMLImageElement {
    return this.makeImage(enemyflippedSprite);
  }


  private makeImage(src: string) {
    const image = document.createElement('img');
    image.src = src;
    return image;
  }
}
