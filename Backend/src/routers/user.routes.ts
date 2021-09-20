import express, { Router } from 'express';
//const router = express.Router();

import { getHome, postSignUp, postSingIn, getUser}  from '../controllers/userController';
const md_aut = require('../middleware/autenticacion');

class userRouter{
    public router: express.Router = express.Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', md_aut.ensureAuth, getHome);
        this.router.post('/singup', postSignUp);
        this.router.post('/singin', postSingIn);
        this.router.get('/getUser/:id', md_aut.ensureAuth, getUser);

    }
}

const userRout = new userRouter();
export default userRout.router;
