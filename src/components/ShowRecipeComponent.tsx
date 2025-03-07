import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Recipe from "../types/Recipe";
import Comment from "../types/Comments";
import StarRating from "./StarRatingComponent";
import http from "../http-common";
import { UserProvider } from "./UserContextComponent";


const ShowRecipeComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
   const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    http
      .get(`/recipes/${id}`)
      .then((response) => setRecipe(response.data))
      .catch((error) => console.error("Error fetching recipe:", error));

      http
      .get(`/recipes/${id}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [id]);

  
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="mt-4 p-4 border container">
      <h2 className="text-xl font-bold">{recipe.title}</h2>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover mt-2"
      />
      <h3 className="text-lg font-semibold mt-2">Ingredients:</h3>
      <p>{recipe.ingredients}</p>
      <h3 className="text-lg font-semibold mt-2">Steps:</h3>
      <p>{recipe.steps}</p>
      <p>Reviewers Rating:⭐ {recipe.rating}</p>
      {/* Comment Section */}
      <h3 className="text-lg font-semibold mt-4">Comments</h3>
      <ul className="border p-2 mt-2">
        {comments.map((comment) => (
          <li key={comment.id} className="border-b p-2">
            <p>{comment.comment}</p>
            <p>{comment.rating}★ <small className="text-muted"> ({new Date(comment.created_at).toLocaleDateString()})</small> </p>
          </li>
        ))}
      </ul>
      <UserProvider>
      <div>
      

        Give Rating: <StarRating recipeId={recipe.id}  />
        
      </div>
      </UserProvider>
    </div>
  );
};

export default ShowRecipeComponent;
