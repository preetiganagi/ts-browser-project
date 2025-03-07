import React, { useEffect, useState } from "react";
import Recipe from "../types/Recipe";
import http from "../http-common";
import { useUser } from "./UserContextComponent";


const AddRecipeComponent: React.FC<{token: string | null}> = ({ token }) => {
    const { user } = useUser();
  const [newRecipe, setNewRecipe] = useState<Recipe>({ title: "", ingredients: "", steps: "", rating: 0 , user_id:1, time:0});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ title?: string; ingredients?: string; steps?: string; time?: string }>({});
  const [editMode, setEditMode] = useState<boolean>(false);

  const validateFields = (): boolean => {
    let tempErrors: any = {};
    if (!newRecipe.title) tempErrors.title = "Title is required";
    if (!newRecipe.ingredients) tempErrors.ingredients = "Ingredients are required";
    if (!newRecipe.steps) tempErrors.steps = "Steps are required";
    if (!newRecipe.time) tempErrors.time = "Please enter prepare time";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const addRecipe = async () => {
    if (!validateFields()) {
      return;
    }
    console.log(user);
    
    const formData = new FormData();
    formData.append("title", newRecipe.title);
    formData.append("ingredients", newRecipe.ingredients);
    formData.append("steps", newRecipe.steps);
    formData.append("user_id", user.id)
    formData.append("time", newRecipe.time)
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
        await http.post("/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
     
      setNewRecipe({ title: "", ingredients: "", steps: "", rating: 0, user_id:1 , time: 0});
      setImageFile(null);
      setErrors({});
    } catch (error) {
      console.error("Error uploading recipe:", error);
    }
  };

  return (
    <div className="container mt-4 card">
        <h2 className="mb-3 text-center">Add New Recipe</h2>

        <div className="mb-3">
            <label className="form-label fw-bold">Title <span className="text-danger">*</span></label>
            <input
            className="form-control"
            type="text"
            placeholder="Enter recipe title"
            value={newRecipe.title}
            onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
            />
            {errors.title && <small className="text-danger fst-italic">{errors.title}</small>}
        </div>

        <div className="mb-3">
            <label className="form-label fw-bold">Ingredients <span className="text-danger">*</span></label>
            <textarea
            className="form-control"
            placeholder="List ingredients here..."
            rows={4}
            value={newRecipe.ingredients}
            onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
            />
            {errors.ingredients && <small className="text-danger fst-italic">{errors.ingredients}</small>}
        </div>

        <div className="mb-3">
            <label className="form-label fw-bold">Steps <span className="text-danger">*</span></label>
            <textarea
            className="form-control"
            placeholder="Describe the cooking steps..."
            rows={10}
            value={newRecipe.steps}
            onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })}
            />
            {errors.steps && <small className="text-danger fst-italic">{errors.steps}</small>}
        </div>
        <div className="mb-3">
                {/* Title */}
                <label className="form-label fw-bold">Prepare Time <small className="text-muted">(in mins) </small><span className="text-danger">*</span></label>
                <input
                className="form-control"
                type="number"
                value={newRecipe.time}
                min={1}
                pattern="[0-9]*"
                onChange={(e) => setNewRecipe({ ...newRecipe, time: e.target.value.replace(/\D/, "")  })}
                />
                {errors.time && <small className="text-danger">{errors.time}</small>}
            </div>

        <div className="mb-3">
            <label className="form-label fw-bold">Upload Image</label>
            <input
            className="form-control"
            type="file"
            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            />
        </div>

        <small className="text-danger fst-italic">* Required fields</small>

        <div className="d-flex justify-content-center mt-4 mb-2">
            <button className="btn btn-primary me-2 px-4 py-2" onClick={addRecipe}>
            {editMode ? "Update Recipe" : "Add Recipe"}
            </button>
            <button className="btn btn-secondary px-4 py-2" onClick={() => (window.location.href = "/")}>
            Close
            </button>
        </div>
    </div>

  );
};

export default AddRecipeComponent;
