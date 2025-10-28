// src/components/CommentList.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CommentList.css";

const CommentList = () => {
  const navigate = useNavigate();

  const comments = [
    { id: 1, text: "This policy is great for startups!" },
    { id: 2, text: "Needs more clarity on section 4B." },
    { id: 3, text: "Overall positive but implementation matters." },
  ];

  return (
    <div className="commentlist-container">
      <h2>Stakeholder Comments</h2>
      <ul>
        {comments.map((c) => (
          <li key={c.id} onClick={() => navigate(`/comments/${c.id}`)}>
            {c.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
