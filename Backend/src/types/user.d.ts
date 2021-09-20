
declare namespace Express {
    export interface Request {
        user: {
            sub: String,
            nombre: String,
            apellido: String,
            nick: String,
            email: String,
            password: String,
            roles: String,
            imagenes: String
        };
    }
}