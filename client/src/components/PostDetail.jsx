import React from 'react';

const PostDetail = ({ post }) => {
  return (
    <div className="mt-4 p-4 border-t">
      <h3 className="text-lg font-semibold">Détails :</h3>
      <p className="mt-2">{post.content}</p>
      <h4 className="text-md font-semibold mt-4">Commentaires :</h4>
      <div className="space-y-2">
        {post.comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-2 rounded">
            <p className="font-semibold">{comment.author}</p>
            <p>{comment.content}</p>
          </div>
        ))}
        {post.comments.length === 0 && (
          <p className="text-gray-500">Aucun commentaire pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;