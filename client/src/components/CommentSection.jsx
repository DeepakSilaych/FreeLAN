import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentSection({ projectID }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/project/${projectID}/comments`);
      setComments(response.data); 
      console.log('Comments fetched:', response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const addComment = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/project/${projectID}/comments`, { comment: newComment });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.user}</strong>: {comment.comment}
          </li>
        ))}
      </ul>
      <div>
        <textarea 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
          placeholder="Write your comment..."
        />
        <button onClick={addComment}>Add Comment</button>
      </div>
    </div>
  );
}
export default CommentSection;
