import { makeExecutableSchema } from 'graphql-tools';
import R from 'ramda';

const typeDefs = `
    type Author {
      id: Int!
      firstName: String
      lastName: String
      """
      the list of Posts by this author
      """
      posts: [Post]
    }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`;

// example data
const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];
const posts = [
  {
    id: 1,
    authorId: 1,
    title: 'Introduction to GraphQL',
    votes: 2,
  },
  {
    id: 2,
    authorId: 2,
    title: 'Welcome to Meteor',
    votes: 3,
  },
  {
    id: 3,
    authorId: 2,
    title: 'Advanced GraphQL',
    votes: 1,
  },
  {
    id: 4,
    authorId: 3,
    title: 'Launchpad is Cool',
    votes: 7,
  },
];

const resolvers = {
  Query: {
    posts: () => posts,
    author: (_, { id }) => R.find(R.propEq('id', id))(authors),
  },
  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = R.find(R.propEq('id', postId))(posts);
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
  Author: {
    posts: author => R.filter(post => post.authorId === author.id)(posts),
  },
  Post: {
    author: post => R.find(R.propEq('id', post.authorId)(authors)),
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
