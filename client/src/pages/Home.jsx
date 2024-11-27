import React, { useState, useRef } from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

const Home = () => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [orderBy, setOrderBy] = useState('DESC');
  const refetchPosts = useRef(null);

  const handleAddPostClick = () => {
    setShowPostForm(!showPostForm);
  };

  const handleOrderChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handlePostAdded = () => {
    setShowPostForm(false);
    if (refetchPosts.current) {
      refetchPosts.current();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Mon Blog</h1>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleAddPostClick}
      >
        {showPostForm ? 'Annuler' : 'Ajouter un post'}
      </button>

      {showPostForm && <PostForm onPostAdded={handlePostAdded} />}

      <div className="mb-4">
        <label className="mr-2">Trier par :</label>
        <select 
          value={orderBy} 
          onChange={handleOrderChange} 
          className="border p-2"
        >
          <option value="DESC">Plus récents</option>
          <option value="ASC">Plus anciens</option>
        </select>
      </div>

      <PostList 
        orderBy={orderBy} 
        setRefetch={(refetch) => (refetchPosts.current = refetch)} 
      />
    </div>
  );
};

export default Home;