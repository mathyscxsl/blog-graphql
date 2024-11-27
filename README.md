# Blog GraphQL

Projet contenant un client (utilisation de React) et un serveur (express), ApolloServer & ApolloClient pour la prise en charge de GraphQL.

## Structure

- `client/` : Front-end en React.js.
- `server/` : Back-end en Node.js avec GraphQL.

## Commands

```bash
cd server
npm i
npm run serve

cd client
npm i
npm run dev
```

Il faut renseigner VITE_GRAPHQL_URL dans un fichier.env pour le client et DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT et PORT (4000 par défaut) dans un fichier.env pour le serveur.
