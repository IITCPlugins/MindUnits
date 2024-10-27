export interface LatLng { lat: number; lng: number };
export type Face = 0 | 1 | 2 | 3 | 4 | 5;
export type XYZ = [number, number, number];
export type UV = [number, number];
export type IJ = [number, number];
export type Level = number;

export * from "./Math";
export * from "./Cell";
export * from "./Region";
export * from "./Triangle";
export * from "./Polyline";
export * from "./RegionCover";
