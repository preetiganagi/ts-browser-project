
export default interface Recipe {
  id?: number;
  title: string;
  ingredients: string;
  steps: string;
  image?: string;
  rating?: number;
  user_id: number;
  time: number

}