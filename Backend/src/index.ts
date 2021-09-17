import express, { Application } from 'express';
import morgan from 'morgan';
import './database/database';

//Rutas peticiones http
import userRouter from './routers/user.routes';

class Server {
    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.midelware();
        this.routers();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
    }

    midelware(): void {
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(express.json());
    }

    routers(): void {
        this.app.use('/api/user', userRouter);
    }

    start(): void {
        this.app.listen(this.app.get('port'), ()=> {
            console.log(`server on port ${this.app.get('port')}`);
        })
    }
}

const server = new Server();
server.start();