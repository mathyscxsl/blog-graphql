import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries';
import Post from './Post';

const PostList = ({ orderBy, setRefetch }) => {
  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    variables: { orderBy },
  });

  useEffect(() => {
    if (setRefetch) {
      setRefetch(refetch);
    }
  }, [refetch, setRefetch]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts: {error.message}</p>;

  const posts = data?.posts || [];

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} refetchPosts={refetch} />
      ))}
    </div>
  );
};

export default PostList;