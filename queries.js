
//Mutaitons
mutaton nuevoUsuario($input : UsuarioInput){
    nuevoUsuario(input: $input){
        id 
        nombre
        apellido
        email
    }
}
---query vairables
{
    "input": {
        "nombre": "Jonathan",
        "apellido": "Ramirez",
        "email": "jona@gmail.com",
        "password": "123456"
    }
}

//auenticacion 
mutation autenticarUsuario($input: AutenticarInput){
    autenticarUsuario(input: $input){
        token
    }
}

--query vairables
{
    "input": {
        "email": "jona@gmail.com",
        "password": "123456"
    }
}


//obtnerUsuario
query obtenerUsuario($input: String!){
    obtenerUsuario(token: $token) {
        id
    }
}
--query vairables
{
    "token":"dkdhfkkdsflds....."
}

//agregar producto
mutation nuevoProducto($input: ProductoInput!){
    nuevoProducto(input: $input){
        id
        nombre
        existencia
        precio 
        creado
    }
}
--query vairables
{
    "input": {
        "nombre": "Monitor 45 pulgadas"
        "precio ": 10000,
        "existencia": 30
    }
}


//obtener productos
query obtenerProductos {
    obtenerProductos{
        id
        nombre
        precio
        existencia
        creado
    }
}
//obtener producto
query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id){
        id
        nombre
        precio
        existencia
    }
}
--query vairables
{
    "id": "ddd554ds4f54d5dff"
}


//actualizar producto
mutation actualizarProducto($id: ID!, $input: ProductoInput){
    actualizarProducto(id:$id, input:$input){
        id
        nombre
        existencia
        precio
    }
}
--query variables
{
    "id": "ddd554ds4f54d5dff"
    "input": {
        "nombre": "Monitor 45 pulgadas"
        "precio ": 15000, //before 10 000
        "existencia": 20 //before 30
    }
}


//eliminar producto
mutation eliminarProducto($id: ID!){
    eliminarProducto(id:$id){
    
    }
}
--query variables
{
    "id": "ddd554ds4f54d5dff"
    
}

//nUEVO Cliente
mutation nuevoCliente($input: ClienteInput){
    nuevoCliente(input:$input){
        nombre
        apellido
    }
}
--query variables
{
    "input": {
        "nombre": "Jonathan",
        "apellido": "Ramirez",
        "empresa": "jonascompany",
        "email": "jona@gmail.com",
        "telefono":"54d5fd5s"
    }
    
}
--http Headers
{
    "authorization":"fjksdjkdkftoken...."
}
//obtener clientes

query obtenerClientes {
    obtenerClientes{
        nombre
        empresa
        email
    }
}

//obtener clientes de un usuario en especifico
query obtenerClientesVendedor($input: ClienteInput){
    obtenerClientesVendedor(input:$input){
        nombre
        apellido
        empresaemail
    }
}

//obtener cliente
query obtenerCliente($id: ID!){
    obtenerCliente(id:$id){
        nombre
        email

    }
}
--query variables
{
    "id": "sdfsdafasdf_idcliente"
    
}
--http Headers
{
    "authorization":"fjksdjkdkftoken...."
}

//actualizar cliente
mutation actualizarCliente($id: ID!, $input: ClienteInput){
    actualizarCliente(id:$id, input:$input){
        nombre
        apellido
        empresa
        email
        telefono
    }
}
--query variables
{
    "id": "ddd554ds4f54d5dff_cliente_a_actualizar"
    "input": {
        "nombre": "NuevoNombre",
        "apellido": "Ramirez",
        "empresa": "jonascompany",
        "email": "jona@gmail.com",
        "telefono":"54d5fd5s"
    }
}
--http Headers
{
    "authorization":"fjksdjkdkftoken...."
}

//Eliminar Cliente

mutation eliminarCliente($id: ID!){
    eliminarCliente(id:$id){

    }
}
--query variables
{
    "id": "ddd554ds4f54d5dff_cliente_a_eliminar"
    
}
--http Headers
{
    "authorization":"fjksdjkdkftoken...."
}

//NuevoPedido 

mutation nuevoPedido($input: PedidoInput){
    nuevoPedido(input:$input){
        id
        cliente 
        vendedor 
        pedido {
            id
            cantidad
        }
        total 
        estado 
         
    }
}
--query variables
{
    "input": {
        "pedido":[
            {
                "id" : "edmflmdsklf_id_producto",
                "cantidad": 20
            }
        ],
        "total":300,
        "cliente": "sdfnslkdnflknsldklkf_id cliente",
        "estado": "PENDIENTE"
    }
    
}
--http Headers
{
    "authorization":"fjksdjkdkftoken...."
}

//obtener Pedidos
query obtenerPedidos{
    obtenerPedidos{
        id 
        pedido{
            id
            cantidad
        }
        cliente 
        vendedor 
        total 
        estado 
    }
}

//obtener Pedidos por Vendedor el cual esta autenticado
query obtenerPedidosVendedor{
    obtenerPedidosVendedor{
        id 
        pedido{
            id
            cantidad
        }
        cliente 
        vendedor 
        total 
        estado 
    }
}

//obtener Pedidos por Vendedor el cual esta autenticado
obtenerPedido{
    obtenerPedido{
        id 
        pedido{
            id
            cantidad
        }
        cliente 
        vendedor 
        total 
        estado 
    }
}

--query variables
{
    "id": "lskdngmlkfdlkg_ id pedido"
    
}
--http Headers
{
    "authorization":"fjksdjkdkftoken...."
}


//actulizar pedido
mutation actualizarPedido($input: PedidoInput){
    actualizarPedido(input:$input){
        id
       
        estado 
         
    }
}
--query variables
{
    "id": "sdkfnlksndnflsdlk id_pedido"
    "input": {
        "estado": "COMPLETADO",
        "cleinte":"ksdnflkndskflk_ id del cliente",
        "pedido":[
            {
                "id" : "edmflmdsklf_id_producto",
                "cantidad": 20
            }
        ],

    }
    
}
--http Headers
{
    "authorization":"fjksdjkdkftoken...."
}


///eliminar pedido
mutation eliminarPedido($id: ID!){
    eliminarPedido(id: $id){

    }
}
--query variables
{
    "id": "sdkfnlksndnflsdlk id_pedido"
   
    
}
--http Headers
{
    "authorization":"fjksdjkdkftoken...."
}


//obtener pedidos estado
query obtenerPedidosEstado($estado: String!){
    obtenerPedidosEstado(estado:$estado){
        id
        estado
        cliente
    }
}

--query variables
{
    "estado": "PENDIENTE"
   
    
}
--http Headers
{
    "authorization":"fjksdjkdkftoken...."
}