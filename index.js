const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const conectarDB = require('./config/db')

//conectar a al base de datos
conectarDB();

//server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        const userId= 20 ;

        return {
            userId
        }
    }

});


server.listen().then( ({url}) => {
    console.log(`Server is running on url ${url}`)
})