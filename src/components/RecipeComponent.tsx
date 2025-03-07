import React, { useState , useEffect} from "react";
import Recipe from '../types/Recipe.ts';
import axios from "axios";
import Comment from "../types/Comments.ts";


const RecipeApp: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [newRecipe, setNewRecipe] = useState<Omit<Recipe, "id" | "image">>({
      title: "",
      ingredients: "",
      steps: "",
      rating: 0
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [editMode, setEditMode] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");
  
  
  
    const [errors, setErrors] = useState<{ title?: string; ingredients?: string; steps?: string }>({});

      const validateFields = () => {
          let newErrors: { title?: string; ingredients?: string; steps?: string } = {};

          if (!newRecipe.title.trim()) newErrors.title = "Title is required.";
          if (!newRecipe.ingredients.trim()) newErrors.ingredients = "Ingredients are required.";
          if (!newRecipe.steps.trim()) newErrors.steps = "Steps are required.";

          setErrors(newErrors);

          return Object.keys(newErrors).length === 0;
      };

    const addRecipe = async () => {

      if (!validateFields()) {
         return;
      }
      
      const formData = new FormData();
      formData.append("title", newRecipe.title);
      formData.append("ingredients", newRecipe.ingredients);
      formData.append("steps", newRecipe.steps);
      if (imageFile) {
        formData.append("image", imageFile);
      }
  
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/recipes", formData, {
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        });
        setRecipes([...recipes, response.data]);
        setNewRecipe({ title: "", ingredients: "", steps: "", rating: 0 });
        setImageFile(null);
        setErrors({}); 
      } catch (error) {
        console.error("Error uploading recipe:", error);
      }
    };

    const updateRecipe = async () => {
      if (!selectedRecipe) return;

      try {
      const response = await axios.put(`http://127.0.0.1:8000/api/recipes/${selectedRecipe.id}`, {
          title: newRecipe.title,
          ingredients: newRecipe.ingredients,
          steps: newRecipe.steps,
      });

      setRecipes(recipes.map((r) => (r.id === selectedRecipe.id ? response.data : r)));
      setSelectedRecipe(null);
      setEditMode(false);
      setErrors({}); 
      } catch (error) {
      console.error("Error updating recipe:", error);
      }
  };

  const deleteRecipe = async (id: number) => {
      try {
      await axios.delete(`http://127.0.0.1:8000/api/recipes/${id}`);
      setRecipes(recipes.filter((r) => r.id !== id));
      } catch (error) {
      console.error("Error deleting recipe:", error);
      }
  };
    

    const rateRecipe = async (id: number, newRating: number) => {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/recipes/${id}/rate`, { rating: newRating });
        setRecipes(recipes.map((r) => (r.id === id ? response.data : r)));
      } catch (error) {
        console.error("Error rating recipe:", error);
      }
    };

    const fetchComments = async (recipeId: number) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/recipes/${recipeId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
  
    const addComment = async () => {
      if (!selectedRecipe || newComment.trim() === "") return;
  
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/recipes/${selectedRecipe.id}/comments`, {
          comment: newComment,
        });
  
        setComments([...comments, response.data]); // Update comments list
        setNewComment(""); // Reset input
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    };

  
    return (
      <div className="p-4 max-w-2xl mx-auto">
        Search: <input
                className="border p-2 w-full mb-2"
                type="text"
                placeholder="Search by Ingredients"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
        />
        <h1 className="text-2xl font-bold mb-4">Recipe Management</h1>
        
        {token && (
          <>
            <div className="mb-4">
            
              <div style={{ display: "flex" }}> <p className="text-danger">*</p> &nbsp;
                <input
                className="border p-2 w-full mb-2 form-control"
                type="text"
                placeholder="Title"
                value={newRecipe.title}
                onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
                />
              </div>
              {errors.title && <small className="text-danger fst-italic">{errors.title}</small>}
              
              <div style={{ display: "flex" }}><p className="text-danger">*</p> &nbsp;
              <textarea
                className="border p-2 w-full mb-2 form-control"
                placeholder="Ingredients"
                value={newRecipe.ingredients}
                onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
              />
              </div>
              {errors.ingredients && <small className="text-danger fst-italic">{errors.ingredients}</small>}

              <div style={{ display: "flex" }}> <p className="text-danger">*</p> &nbsp;
              <textarea
                className="border p-2 w-full mb-2 form-control"
                placeholder="Steps"
                value={newRecipe.steps}
                onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })}
              /></div>
              {errors.steps && <small className="text-danger fst-italic">{errors.steps}</small>}
              <div style={{ display: "flex" }}>
                <input
                  className="border p-2 w-full mb-2 form-control"
                  type="file"
                  onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                />
              </div>
             
              <small className="text-danger fst-italic text-small">* required fields</small>
              <div style={{ display: "flex" }}>
                <button className="btn btn-primary px-4 py-2" onClick={editMode ? updateRecipe : addRecipe}>
                  {editMode ? "Update Recipe" : "Add Recipe"}
                </button> &nbsp;&nbsp;
                <button className="btn btn-primary px-4 py-2" onClick={() => window.location.reload()}>
                    Close
                  </button>
              </div>
            </div>
  
            <h2 className="text-xl font-semibold mb-2">Recipes</h2>
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe.id} className="border p-2 cursor-pointer mb-2">
                <div onClick={() => {setSelectedRecipe(recipe); fetchComments(recipe.id);}} >
                  <h3>{recipe.title} (⭐ {recipe.rating})</h3>
                  <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover mt-2" />
                 <div>
                  Give Rating: <select className="border p-1 mt-1" value={recipe.rating} onChange={(e) => rateRecipe(recipe.id, Number(e.target.value))}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                 </div>
                  
                </div>
                <button className="btn btn-secondary px-2 py-1 m-1" onClick={() => {
                  setSelectedRecipe(recipe);
                  setEditMode(true);
                  setNewRecipe({ title: recipe.title, ingredients: recipe.ingredients, steps: recipe.steps,  rating: recipe.rating || 0, });
                }}>
                  Edit
                </button>
                <button className="btn btn-danger px-2 py-1 m-1" onClick={() => deleteRecipe(recipe.id)}>
                  Delete
                </button>
              </li>
              ))}
            </ul>
  
            {selectedRecipe && !editMode && (
              <div className="mt-4 p-4 border">
                <h2 className="text-xl font-bold">{selectedRecipe.title}</h2>
                <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-40 object-cover mt-2" />
                <h3 className="text-lg font-semibold mt-2">Ingredients:</h3>
                <p>{selectedRecipe.ingredients}</p>
                <h3 className="text-lg font-semibold mt-2">Steps:</h3>
                <p>{selectedRecipe.steps}</p>
                {/* Comment Section */}
                  <h3 className="text-lg font-semibold mt-4">Comments</h3>
                  <ul className="border p-2 mt-2">
                    {comments.map((comment) => (
                      <li key={comment.id} className="border-b p-2">
                        {comment.comment} 
                        <small className="text-muted">({new Date(comment.created_at).toLocaleString()})</small>
                      </li>
                    ))}
                  </ul>

                  {/* Add New Comment */}
                  <div className="mt-2">  
                    <input
                      type="text"
                      className="border p-2 w-full"
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button className="btn btn-primary px-4 py-2 mt-2" onClick={addComment}>
                      Add Comment
                    </button>
                  </div>
                <button className="btn btn-primary px-4 py-2 mt-2" onClick={() => setSelectedRecipe(null)}>
                  Close
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  
  export default RecipeApp;