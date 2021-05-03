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

    type TopVendedor {
        total: Float
        vendedor: [Usuario]
    }

    type Cliente {
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        telefono: String
        vendedor: ID
    }

    type TopCliente {
         total: Float
         cliente: [Cliente]
    }

    type Producto {
        id: ID
        nombre: String
        existencia: Int
        precio: Float
        creado: String
    }

    type Pedido {
        id: ID
        pedido: [PedidoGrupo]
        total: Float
        cliente: ID
        vendedor: ID
        fecha: String
        estado: EstadoPedido
    }

    type PedidoGrupo{
        id:ID
        cantidad:Int
    }


    type Token {
        token: String 
    }

    ####### INPUTS

    input AutenticarInput{
        email:String! 
        password: String!
    }

    input ProductoInput{
        nombre: String!
        existencia: Int
        precio: Float!
    }

    input PedidoProductoInput{
        id:ID
        cantidad: Int
    }

    input PedidoInput{
        pedido: [PedidoProductoInput]
        total:Float
        cliente: ID
        estado: EstadoPedido
       
    }

    enum EstadoPedido {
        PENDIENTE
        COMPLETADO
        CANCELADO
    }


    input UsuarioInput {
        nombre: String!
        apellido: String!
        email: String!
        password:String!
    }

    
    input ClienteInput {
        nombre: String!
        apellido: String!
        empresa: String!
        email: String!
        telefono: String
    }

   ########## QUERY
    type Query {
        # Usuarios
        obtenerUsuario(token: String!) : Usuario
        
        # Productos
        obtenerProductos(): [Producto]

        #clientes
        obtenerCliente(id: ID!): Cliente
        obtenerClientes: [Cliente]
        obtenerClientesVendedor: [Cliente]
        actualizarCliente(id: ID!, ClienteInput): Cliente

        # Pedidos
        obtenerPedidos: [Pedido]
        obtenerPedidosVendedor: [Pedido]
        obtenerPedido(id: ID!): Pedido
        obtenerPedidosEstado(estado: String!): [Pedido]

        # Busquedas Avanzadas
        mejoresClientes: [TopCliente]
        mejoresVendedores: [TopVendedor]
    }

    ######### MUTATION    
    type Mutation {
        # Usuarios
        nuevoUsuario(input: UsuarioInput! ): Usuario
        autenticarUsuario(input: AutenticarInput!): Token
        
        # Productos
        nuevoProducto(input: ProductoInput)
        actualizarProducto(id:ID!, input: ProductoInput!) : Producto
        eliminarProducto(id: ID!): String 

        #Clientes
        nuevoCliente(input: ClienteInput!): Cliente
        eliminarCliente(id: ID!): String

        # Pedidos
        nuevoPedido(input:PedidoInput): Pedido
        actualizarPedido(id:ID! input:PedidoInput): Pedido
        eliminarPedido(id: ID!): String

    }
`;

module.exports = typeDefs;