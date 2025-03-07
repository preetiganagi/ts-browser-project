import http from "../http-common";
import Recipe from "../types/Recipe";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContextComponent";

const RecipeGrid = ({ recipes }: { recipes: Recipe[] }) => {
  const navigate = useNavigate();
  const { user } = useUser(); // Get logged-in user


  const deleteRecipe = async (id: number) => {
    try {
    await http.delete(`/recipes/${id}`);
      window.location.reload();
    } catch (error) {
    console.error("Error deleting recipe:", error);
    }
};

  return (
    
    <div className="container mt-3">
     
      <h2>Recipes</h2>
      <div className="row">
        {recipes.map((recipe) => (
           
          <div key={recipe.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              />

              <div className="card-body text-center">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="text-muted">⭐ {recipe.rating || 0}</p>
               
                <div className="d-flex justify-content-center">
                {user && user.id === recipe.user_id && (
                  <button
                    className="btn btn-primary btn-sm mx-2"
                    onClick={() => navigate(`/edit/${recipe.id}`)}
                  >
                    Edit
                  </button>)}

                  {user && ( user.roles.some(role => role.name === "admin") || user.id === recipe.user_id) && (
                    <button className="btn btn-danger btn-sm" onClick={() => deleteRecipe(recipe.id)} >Delete</button>
                  )}
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default RecipeGrid;
