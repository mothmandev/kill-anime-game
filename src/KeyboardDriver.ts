
export class KeyboardDriver {

  private keys: {[key: string]: boolean} = {};

  public constructor() {
    window.addEventListener('keydown', (e) => this.keys[e.key] = true);
    window.addEventListener('keyup', (e) => this.keys[e.key] = false);
  }

  public pressed(key: string): boolean {
    return key in this.keys && this.keys[key];
  }

  public xor(
    key1: string,
    key2: string,
    action1: () => any,
    action2: () => any,
    finalAction?: () => any
  ): void {
    const key1down = this.pressed(key1);
    const key2down = this.pressed(key2);
    if (key1down && !key2down)
      return action1();
    else if (!key1down && key2down)
      return action2();
    else if (finalAction)
      return finalAction();
  }

}
