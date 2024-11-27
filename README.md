# Blog GraphQL

Projet de blog sans session permettant l'ajout la suppression d'articles et un espace commentaires sur les articles !

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
