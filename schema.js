const { gql } = require('apollo-server');

const typeDefs = gql`

    type Curso {
        titulo: String
        tecnologia: String
    }
    input CursoInput {
        tecnologia: String
    }
    type Query {
        obtenerCursos: [Curso]
        obtenerCursosPorTitulo(input: CursoInput!): [Curso]
    }

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

    input AutenticarInput{
        email:String! 
        password: String!
    }

    input Usuarioinput {
        nombre: String!
        apellido: String!
        email: String!
        password:String!
    }

    type Mutation {
        nuevoUsuario(input: Usuarioinput! ): Usuario
        autenticarUsuario(input: AutenticarInput!): Token
    }
`;

module.exports = typeDefs;