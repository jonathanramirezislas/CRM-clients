
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
query obtenerUsuario($input: String){
    obtenerUsuario(token: $token) {
        id
    }
}

--query vairables

{
    "token":"dkdhfkkdsflds....."
}