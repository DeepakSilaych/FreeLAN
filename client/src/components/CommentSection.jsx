import React, { useState } from 'react';

function CommentSection({ projectId, comments, addComment }) {
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addComment(commentText);
    setCommentText('');
  };

  return (
    <div className="block p-4 w-max rounded-lg shadow-lg border border-white">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Comments</h3>
      <div className="mt-4 space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex items-start gap-2.5">
              <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                <div className="flex row items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{comment.user}</span>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{comment.created_at}</span>
                </div>
                <p className="text-sm font-normal py-2 text-gray-900 dark:text-white"> {comment.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <textarea
          className="w-full max-w-full px-3 py-2 border-t border-gray-white focus:outline-none  dark:text-white dark:bg-transparent dark:border-gray-600vresize-none"
          rows="3"
          placeholder="Write your comment..."
          value={commentText}
          maxLength={200} // Limit maximum length to 200 characters
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500">{commentText.length}/200 characters</span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentSection;


