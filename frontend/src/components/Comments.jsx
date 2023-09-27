import React from "react";

const Comments = ({ comments }) => {
  function getTimeDifferenceString(timestamp) {
    const currentTime = new Date();
    const createdAt = new Date(timestamp);

    const timeDifference = currentTime - createdAt;
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} days ago`;
    }
  }
  return comments.map((comment) => {
    return (
      <div
        className="bg-slate-600 rounded-md p-4 mb-4"
        key={`comment-${comment._id}`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
              alt="user-pic"
              className="h-10 w-10 mr-2"
            />
            <span className="text-lg text-gray-400 font-semibold">
              {comment.user.name}
            </span>
          </div>

          <span className="text-sm text-gray-100">
            {getTimeDifferenceString(comment.createdAt)}
          </span>
        </div>

        <div className="mt-2 text-white">{comment.context}</div>
      </div>
    );
  });
};

export default Comments;
