import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../http-common";
import Recipe from "../types/Recipe";
import { useUser } from "./UserContextComponent";

const EditRecipeComponent: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    ingredients: "",
    steps: "",
    rating: 0,
    user_id: 1,
    time: 0
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch recipe data when component mounts
  useEffect(() => {
    if (id) {
      http.get(`/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => console.error("Error fetching recipe:", error));
    }
    
  }, [id]);

  // Validate required fields
  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    if (!recipe.title) newErrors.title = "Title is required.";
    if (!recipe.ingredients) newErrors.ingredients = "Ingredients are required.";
    if (!recipe.steps) newErrors.steps = "Steps are required.";
    if (!recipe.time) newErrors.steps = "Please enter prepare time";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update Recipe
  const updateRecipe = async () => {
    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("ingredients", recipe.ingredients);
    formData.append("steps", recipe.steps);
    formData.append("user_id", user.id)
    formData.append("time", recipe.time)
    if (imageFile) {
      console.log("imagefile");
      
      formData.append("image", imageFile);
    }
    if (!validateFields()) return;
    if (recipe) {
      try {
       await  http.post(`/recipes/${id}`, formData, {
         headers: {
           "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       });
       window.location.href = "/"
     } catch (error) {
       console.error("Error updating recipe:", error);
     }
    }
   
  };

  return (
    <div className="container mt-4">
    <div className="card shadow p-4">
      <h2 className="mb-4 text-center">Edit Recipe</h2>
  
      <div className="mb-4">
        {/* Title */}
        <label className="form-label fw-bold">Title <span className="text-danger">*</span></label>
        <input
          className="form-control"
          type="text"
          value={recipe.title}
          onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
        />
        {errors.title && <small className="text-danger">{errors.title}</small>}
      </div>
  
      <div className="mb-4">
        {/* Ingredients */}
        <label className="form-label fw-bold">Ingredients <span className="text-danger">*</span></label>
        <textarea
          className="form-control"
          rows={4}
          value={recipe.ingredients}
          onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
        />
        {errors.ingredients && <small className="text-danger">{errors.ingredients}</small>}
      </div>
  
      <div className="mb-4">
        {/* Steps */}
        <label className="form-label fw-bold">Steps <span className="text-danger">*</span></label>
        <textarea
          className="form-control"
          style={{ height: "250px" }}
          value={recipe.steps}
          onChange={(e) => setRecipe({ ...recipe, steps: e.target.value })}
        />
        {errors.steps && <small className="text-danger">{errors.steps}</small>}
      </div>

      <div className="mb-4">
        {/* Title */}
        <label className="form-label fw-bold">Prepare Time <small className="text-muted">(in mins) </small><span className="text-danger">*</span></label>
        <input
          className="form-control"
          type="number"
          value={recipe.time}
          min={1}
          pattern="[0-9]*"
          onChange={(e) => setRecipe({ ...recipe, time: e.target.value.replace(/\D/, "")  })}
        />
         {errors.time && <small className="text-danger">{errors.time}</small>}
      </div>

      <div className="mb-4">
        {/* Image Upload */}
        <label className="form-label fw-bold">Image</label>
        <input
          className="form-control"
          type="file"
          onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
        />
      </div>
  
      {/* Buttons */}
      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-primary px-4 py-2" onClick={updateRecipe}>
          Update Recipe
        </button>
        <button className="btn btn-outline-secondary px-4 py-2" onClick={() => window.location.href = "/"}>
          Cancel
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default EditRecipeComponent;
