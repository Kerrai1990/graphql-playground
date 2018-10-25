//APOLLO GRAPHQL v.1.0

const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # The "Query" type is the root of all GraphQL queries.
  # This "Book" type can be used in other type declarations.

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

// Assign a resolver to retrieve the books, that are setup in he typeDefs 
// The data is setup in the resolver, which assigns books to books
const server = new ApolloServer({ typeDefs, resolvers });

// run server endpoint
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});