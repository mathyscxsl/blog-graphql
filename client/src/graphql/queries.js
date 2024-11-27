import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($orderBy: String!) {
    posts(orderBy: $orderBy) {
      id
      title
      content
      author
      date
      comments {
        id
        content
        author
        date
      }
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($postId: ID!) {
    comments(postId: $postId) {
      id
      content
      author
      date
      postId
    }
  }
`;