const gql = require("graphql-tag");

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    date: String!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    content: String!
    author: String!
    date: String!
    postId: ID!
  }

  type Query {
    posts(orderBy: String): [Post!]!
    post(id: ID!): Post
    comments(postId: ID!): [Comment!]!
  }

  type Mutation {
    addPost(title: String!, content: String!, author: String!): Post!
    addComment(postId: ID!, content: String!, author: String!): Comment!
    deletePost(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
