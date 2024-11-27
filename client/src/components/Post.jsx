import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../graphql/mutations';
import { GET_POSTS } from '../graphql/queries';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const Post = ({ post, refetchPosts }) => {
  const [showDetail, setShowDetail] = useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    variables: { id: post.id },
    onCompleted: () => {
      refetchPosts();
      setShowDetail(false);
    },
    onError: (err) => {
      console.error('Erreur lors de la suppression :', err);
    },
  });

  const handleDelete = () => {
    deletePost();
  };

  const handleToggleDetails = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div className="border p-4 mb-4 rounded">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-sm text-gray-600">
        Par {post.author} le {new Date(post.date).toLocaleDateString()} à {new Date(post.date).toLocaleTimeString()}
      </p>
      <div className="mt-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
          onClick={handleToggleDetails}
        >
          {showDetail ? 'Masquer le post' : 'Voir le post'}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          onClick={handleDelete}
        >
          Supprimer
        </button>
      </div>

      {showDetail && (
        <div className="mt-4">
          <div className="bg-gray-200 p-4 rounded">
            <p>{post.content}</p>
          </div>

          <CommentList postId={post.id} />
          <CommentForm postId={post.id} />
        </div>
      )}
    </div>
  );
};

export default Post;