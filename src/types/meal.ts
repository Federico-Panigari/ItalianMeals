export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDetail {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  [key: string]: string | undefined; // per strIngredient1, strMeasure1, ecc.
}

export type LoadStatus = "idle" | "loading" | "error" | "success" | "empty";

export interface MealsListState {
  status: LoadStatus;
  items: MealSummary[];
  message?: string;
}

export interface MealDetailState {
  status: LoadStatus;
  data: MealDetail | null;
  message?: string;
}