const { gql } = require('apollo-server');

const typeDefs = gql`

    ######### TYPES

    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        creado: String
    }

    type Token {
        token: String 
    }

    ####### INPUTS

    input AutenticarInput{
        email:String! 
        password: String!
    }

    input PorductoInput{
        nombre: String!
        existencia: Int
        precio: Float!
    }

    input Usuarioinput {
        nombre: String!
        apellido: String!
        email: String!
        password:String!
    }

   ########## QUERY
    type Query {
        obtenerUsuario(token: String!) : Usuario
    }

    ######### MUTATION    
    type Mutation {
        # Usuarios
        nuevoUsuario(input: Usuarioinput! ): Usuario
        autenticarUsuario(input: AutenticarInput!): Token
        
        # Productos
        nuevoProducto(input: ProductoInput)
    }
`;

module.exports = typeDefs;