import express from 'express'
//import authMiddleware from '../src/app/middlewares/auth'
import routes  from './routes.js'
import './database/index.js'

class App{
    constructor(){
        this.server = express()
        this.middlewares()
        this.routes()
    }

    //Camada entre o express e a aplicação - realiza uma interceptação
    middlewares(){
        //Permite a utilização de json na aplicação
        this.server.use(express.json())
        //this.server.use(authMiddleware)
    }

    routes(){
        this.server.use(routes)
    }

}

export default new App().server