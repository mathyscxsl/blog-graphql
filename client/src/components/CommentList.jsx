import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from '../graphql/queries';

const CommentList = ({ postId }) => {
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { postId },
  });

  if (loading) return <p>Chargement des commentaires...</p>;
  if (error) return <p>Erreur de chargement des commentaires : {error.message}</p>;

  return (
    <div className="space-y-4 mt-4">
      {data.comments.length === 0 ? (
        <p>Aucun commentaire pour ce post.</p>
      ) : (
        data.comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">{comment.author} <span className='text-xs text-gray-400'>le {new Date(comment.date).toLocaleDateString()} à {new Date(comment.date).toLocaleTimeString()}</span></p>
            <p className="mt-2">{comment.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;