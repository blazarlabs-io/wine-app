export interface AvailableLevels {
  name: string;
  price: number;
  euLabels: number;
}

export interface LevelsInterface {
  bronze: AvailableLevels | null;
  silver: AvailableLevels | null;
  gold: AvailableLevels | null;
  diamond: AvailableLevels | null;
}

export interface SingleLevelInterface {
  euLabels: number;
  price: number;
}
