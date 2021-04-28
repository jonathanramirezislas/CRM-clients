const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema')
const resolvers = require('./resolvers')


//server
const server = new ApolloServer({
    typeDefs,
    resolvers

});


server.listen().then( ({url}) => {
    console.log(`Server is running on url ${url}`)
})