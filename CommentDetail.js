// src/components/CommentDetail.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CommentDetail.css";

const CommentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="comment-detail-container">
      <h2>Comment Detail</h2>
      <p>Showing analysis for Comment ID: {id}</p>
      <div className="sentiment-box">
        <p><strong>Sentiment:</strong> Positive 😊</p>
        <p><strong>Summary:</strong> The user supports the amendment with minor suggestions.</p>
      </div>
      <button onClick={() => navigate("/comments")}>Back to Comments</button>
    </div>
  );
};

export default CommentDetail;
