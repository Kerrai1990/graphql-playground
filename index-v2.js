// Apollo Server 2.0 makes building the most powerful and production ready GraphQL 
// app easy. Apollo Server 1.x provided all of the tools necessary to make a great 
//APOLLO GRAPHQL v.1.0

// GraphQL backend, allowing the developer to pick and choose from a set of 
// unopinionated tools. Building on 1.x and fully backwards compatible, 2.0’s 
// defaults bake in the best practices and patterns gathered from two years of 
// community feedback and iteration. It is an opinionated, production focused, 
//GraphQL server that works with any backend.

const { ApolloServer, gql } = require('apollo-server');
const { MemcachedCache } = require('apollo-server-cache-memcached');

// Declare Schema
const typeDefs = gql `
  type Query {
    hello : String
    mockedString : String
  }
`;

// Map of functions that return data for schema above
const resolvers = {
  Query: {
    hello : () =>
      fetch('https://fourtonfish.com/hellosalut/?mode=auto')
        .then(res => res.json())
        .then(data => data.hello)
  },
};

// Setup server with schema, resolvers, mocks, and health check
const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks: true,
  onHealthCheck: () => fetch('https://fourtonfish.com/hellosalut/?mode=auto'),

  //A persisted query is an ID or hash that can be sent to the server in place of the 
  //GraphQL query string. This smaller signature reduces bandwidth utilization and speeds 
  //up client loading times. Apollo Server enables persisted queries without additional
  //server configuration, using an in-memory LRU cache to store the mapping between 
  //hash and query string. The persisted query cache can be configured as shown in the 
  //following code snippet. 
  persistedQueries: {
    cache : new MemcachedCache(
      [ 'memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
      { retries : 10, retry: 10000 },
    ),
  },
});

// Run express endpoint to access GUI
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

