const Usuario = require('./models/Usuarios');
const bcryptjs = require('bcryptjs');
const jwt =  require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const crearToken = (usuario, secreta, expiresIn) =>{
    console.log(usuario)
    const {id, email, nombre, apellido } = usuario;

    return jwt.sign({ id, email, nombre, apellido  }, secreta , { expiresIn})
}

//Resolvers
const resolvers = {
    Query:{
        obtenerUsuario: async (_,{ token }) => {
            const usuarioId = await jwt.verify(token, process.env.SECRETA)

            return usuarioId;
        }
    },
    Mutation: {
        nuevoUsuario: async (_,{ input }) => {
            const {email, password} = input;

            const existeUsuario = await Usuario.findOne({email});
            if (existeUsuario){
                throw new Error('Ya existe un usuario con este email ',email)
            }

            const salt = await bcryptjs.getSalt(10);
            input.password = await bcryptjs.hash(password, salt);

            try {
                const usuario = new Usuario(input);
                usuario.save();
                return usuario;
            } catch (error) {
                console.log(error)
            }

        },
        autenticarUsuario: async (_, { input } ) =>{
            const { email, password } = input;

            const existeUsuario = await Usuario.findOne({ email });
            if(!existeUsuario){
                throw new Error('El usuario no existe');
            }
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            
            if(!passwordCorrecto){
                throw new Error('Password or email incorrectos');
            }

            return {
                token: crearToken(existeUsuario, process.env.SECRETA, '24h' )
            }

        }
    }

}
module.exports= resolvers;