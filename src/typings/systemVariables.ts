export interface AvailableLevels {
  name: string;
  price: number;
  qrCodes: number;
}

export interface LevelsInterface {
  bronze: AvailableLevels | null;
  silver: AvailableLevels | null;
  gold: AvailableLevels | null;
  diamond: AvailableLevels | null;
}

export interface SingleLevelInterface {
  qrCodes: number;
  price: number;
}
