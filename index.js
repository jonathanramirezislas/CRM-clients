const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const conectarDB = require('./config/db')
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

//conectar a al base de datos
conectarDB();

//server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        
        const token = req.headers['authorization'] || '';

        if(token){
            try {
                const usuario = jwt.verify(token,process.env.SECRETA)
              //  console.log(usuario)
            } catch (error) {
                console.log("Hubo un error con el token",error);
            }

        }

    }

});


server.listen().then( ({url}) => {
    console.log(`Server is running on url ${url}`)
})