import { Vec2d } from "./Vec2d";

export interface Trackable {
  pointOnLeft(point: Vec2d<number>): boolean;
  pointOnRight(point: Vec2d<number>): boolean;
  pointAbove(point: Vec2d<number>): boolean;
  pointBelow(point: Vec2d<number>): boolean;
};
