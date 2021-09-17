import jwt from 'jwt-simple';
import moment from 'moment';
const secret = 'clave_cecreta_analisis2_red_social';

export function createToken(user) {
    const payload = { //payload genera un token ==> info comprimida string grande ==> jwt encode para generar token 
        sub: user._id, //en "jwt" se identifica como el identificador de documentos
        nombre: user.nombre,
        apellido: user.apellido,
        nick: user.nick,
        email: user.email,
        password: user.password,
        roles: user.roles,
        imagenes: user.imagenes,
        iat: moment().unix(),//Fecha de creacion del token 
        exp: moment().add(30, 'days').unix() //Fecha de expiracion del token
    };
    
    return jwt.encode(payload, secret);//encode genera un hash 
    
};

