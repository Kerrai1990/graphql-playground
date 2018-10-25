//APOLLO GRAPHQL GOOGLE APP ENGINE EXAMPLE 

const { ApolloServer } = require('apollo-server');

const server = new ApolloSever({
  typeDefs,
  resolvers,
  engine: {
    apiKey: 'YOUR API KEY HERE',
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});