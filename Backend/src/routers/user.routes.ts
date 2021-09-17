import express, { Router } from 'express';
//const router = express.Router();

import { getHome, postSignUp, postSingIn}  from '../controllers/userController';

class userRouter{
    public router: express.Router = express.Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', getHome);
        this.router.post('/singup', postSignUp);
        this.router.post('/singin', postSingIn);

    }
}

const userRout = new userRouter();
export default userRout.router;
