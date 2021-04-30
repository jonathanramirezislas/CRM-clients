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

    type Producto {
        id: ID
        nombre: String
        existencia: Int
        precio: Float
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
        # Usuarios
        obtenerUsuario(token: String!) : Usuario
        
        # Productos
        obtenerProductos(): [Producto]
    }

    ######### MUTATION    
    type Mutation {
        # Usuarios
        nuevoUsuario(input: Usuarioinput! ): Usuario
        autenticarUsuario(input: AutenticarInput!): Token
        
        # Productos
        nuevoProducto(input: ProductoInput)
        actualizarProducto(id:ID!, input: ProductoInput!) : Producto
        eliminarProducto(id: ID!): String 
    }
`;

module.exports = typeDefs;