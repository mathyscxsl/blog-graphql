import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../graphql/mutations';

const PostForm = ({ onPostAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const [addPost, { loading, error }] = useMutation(ADD_POST, {
    onCompleted: () => {
      setTitle('');
      setAuthor('');
      setContent('');
      onPostAdded();
    },
    onError: (err) => {
      console.error('Erreur lors de la création du post:', err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !content) {
      alert('Tous les champs doivent être remplis.');
      return;
    }

    addPost({
      variables: { title, author, content },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded">
      <div className="mb-2">
        <label htmlFor="title" className="block text-sm font-bold mb-1">Titre</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="author" className="block text-sm font-bold mb-1">Auteur</label>
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
        <label htmlFor="content" className="block text-sm font-bold mb-1">Contenu</label>
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
        disabled={loading}
      >
        {loading ? 'Création en cours...' : 'Créer le post'}
      </button>

      {error && <p className="text-red-500 mt-2">Erreur : {error.message}</p>}
    </form>
  );
};

export default PostForm;