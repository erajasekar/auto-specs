export interface CarSpec {
  make: string;
  model: string;
  year: number;
  engineType: string;
  horsepower: number;
  zeroToSixty: string;
  fuelType: string;
  imageUrl: string;
  mpg?: string;
  transmission?: string;
  drivetrain?: string;
}

export interface CarSearchResult {
  success: boolean;
  data?: CarSpec;
  error?: string;
}
