import  { useState } from "react";
import http from "../http-common";
import { useUser } from "./UserContextComponent";

const StarRating = ({ recipeId}) => {
  const { user } = useUser();

  const [rating, setRating] = useState<number>(0); // Local state for the selected rating
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  const handleRating = async (selectedRating: number) => {
    setRating(selectedRating); // Update UI immediately

    try {
      await http.post(`/recipes/${recipeId}/comments`, { recipe_id: recipeId, rating: selectedRating , user_id: user?.id});
      window.location.reload();
    } catch (error) {
      alert("Please login to rate or comment")
      setRating(0)
    }
  };
  const addComment = async () => {
    if (!newComment.trim()){
      setWarning("Please add comment")
      return;
    } 
    try {
      const response = await http.post(`/recipes/${recipeId}/comments`, {
        comment: newComment,
        recipe_id: recipeId,
        user_id: user?.id,
        rating: rating 
      });
      setComments([...comments, response.data]);
      setNewComment("");
      setRating(0)
      window.location.reload()
    } catch (error) {
      alert("Please login to rate or comment")
      setNewComment("");
    }
  };


  return (
    <div>

    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ fontSize: "24px", cursor: "pointer", color: star <= rating ? "gold" : "gray" }}
          onClick={() =>  setRating(star)}
        >
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
      {/* Add New Comment */}
      <div className="mt-2">
          <input
            type="text"
            className="border p-2 w-full mr-4"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button className="btn btn-primary ml-4"  onClick={addComment} style={{margin:"4px"}}>
            Add Comment
          </button>
        </div>
        <small className="text-danger fst-italic">{warning}</small>
    </div>

  );
};

export default StarRating;
