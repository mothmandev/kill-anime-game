import { GameObject } from "./GameObject";
import { Graphics } from "./Graphics";

export class ObjectHandler {
  
  private objects: (GameObject | null)[] = [];

  public add(v: GameObject) {
    this.objects.push(v);
  }

  public remove(v: GameObject) {
    for (const i in this.objects)
      if (this.objects[i] === v)
        this.objects[i] = null;
  }

  public tick(delta: number) {
    (this.objects.filter(o =>
      o !== null) as GameObject[])
        .forEach(o =>
          o.tick(delta));
  }

  public render(g: Graphics) {
    (this.objects.filter(o =>
      o !== null) as GameObject[])
        .forEach(o =>
            o.render(g));
  }

}
