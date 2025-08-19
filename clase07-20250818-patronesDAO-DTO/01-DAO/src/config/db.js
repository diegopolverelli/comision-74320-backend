import mongoose from "mongoose"

export class Singleton{
    static #conexion=null

    constructor(url, db){
        mongoose.connect(url, {dbName: db})
    }

    static conectarDB(url, db){
        if(this.#conexion){
            console.log(`Conexión previamente establecida...!!!`)
            return this.#conexion
        }

        this.#conexion=new Singleton(url, db)
        console.log(`DB online!`)
        return this.#conexion
    }
}