export default interface Comment {
    id: number;
    recipe_id: number;
    comment?: string;
    created_at: string;
    user_id: number;
    rating?:number;
  }
  