const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');


const PORT = 4000;

// GraphQL schema
const schema = buildSchema(`
    type Query {
        message: String
    }
`);

// Root resolver
const root = {
    message: () => 'Hello World!'
};
// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(PORT, () => console.log(`Express GraphQL Server Now Running On localhost:${PORT}/graphql`));