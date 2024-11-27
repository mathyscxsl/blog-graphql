import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../graphql/mutations';
import { GET_COMMENTS } from '../graphql/queries';

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const [addComment] = useMutation(ADD_COMMENT, {
    variables: { postId, content, author },
    update(cache, { data: { addComment } }) {
      const { comments } = cache.readQuery({
        query: GET_COMMENTS,
        variables: { postId },
      });

      cache.writeQuery({
        query: GET_COMMENTS,
        variables: { postId },
        data: { comments: [...comments, addComment] },
      });
    },
    onCompleted: () => {
      setContent('');
      setAuthor('');
    },
    onError: (err) => {
      console.error("Erreur d'ajout de commentaire :", err);
    },
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (content && author) {
      addComment();
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Ajoutez un commentaire</h3>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <div className="mb-2">
          <label htmlFor="author" className="block text-sm font-bold mb-1">Votre nom</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="content" className="block text-sm font-bold mb-1">Commentaire</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Ajouter un commentaire
        </button>
      </form>
    </div>
  );
};

export default CommentForm;