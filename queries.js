
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

