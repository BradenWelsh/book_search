const express = require('express');
const path = require('path');
const {typeDefs, resolvers } = require('./schema')
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const { ApolloServer } = require('apollo-server-express')

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});
server.applyMiddleware({ app })
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
app.get('*', (res)=> {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`Use GraphQL at https://localhost:${PORT}${server.graphqlPath}`);
});
