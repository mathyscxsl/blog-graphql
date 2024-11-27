const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { sequelize } = require('./utils/sequelize');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

dotenv.config();

const app = express();

// Configuration CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  app.use('/graphql', expressMiddleware(server));

  sequelize.sync({ force: false })
    .then(() => console.log('Database synchronized'))
    .catch((error) => console.error('Error synchronizing database:', error));



  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is working on ${PORT}`);
  });
}

startServer();