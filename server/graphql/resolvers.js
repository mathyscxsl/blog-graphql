const Post = require('../models/Post');
const Comment = require('../models/Comment');

const resolvers = {
  Query: {
    posts: async (_, { orderBy }) => {
      try {
        const order = orderBy === 'ASC' ? ['date', 'ASC'] : ['date', 'DESC'];

        const posts = await Post.findAll({
          include: {
            model: Comment,
            as: 'comments',
          },
          order: [order],
        });

        return posts;
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to fetch posts");
      }
    },

    comments: async (_, { postId }) => {
      try {
        const comments = await Comment.findAll({
          where: { postId },
          order: [['date', 'ASC']],
        });

        return comments;
      } catch (error) {
        console.error("Error fetching comments:", error);
        throw new Error("Failed to fetch comments");
      }
    },
  },

  Mutation: {
    addPost: async (_, { title, content, author }) => {
      try {
        const newPost = await Post.create({ title, content, author });
        return newPost;
      } catch (error) {
        console.error('Error creating post:', error);
        throw new Error('Failed to add post');
      }
    },

    addComment: async (_, { postId, content, author }) => {
      try {
        const newComment = await Comment.create({ postId, content, author });
        return newComment;
      } catch (error) {
        console.error('Error adding comment:', error);
        throw new Error('Failed to add comment');
      }
    },

    deletePost: async (_, { id }) => {
      try {
        const post = await Post.findByPk(id);
        if (post) {
          await post.destroy();
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error deleting post:', error);
        throw new Error('Failed to delete post');
      }
    },
  },

  Post: {
    comments: async (parent) => {
      try {
        return await Comment.findAll({ where: { postId: parent.id } });
      } catch (error) {
        console.error('Error fetching comments:', error);
        throw new Error('Failed to fetch comments');
      }
    },
  },
};

module.exports = resolvers;