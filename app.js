const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}));

mongoose.connect("mongodb+srv://graphql:0TFY9CQiO2CGJbKe@sandbox.he3hb.mongodb.net/event-react?retryWrites=true&w=majority")
    .then(() => {
        app.listen(5000);
    }).catch(err => {
        console.log(err);
    });

