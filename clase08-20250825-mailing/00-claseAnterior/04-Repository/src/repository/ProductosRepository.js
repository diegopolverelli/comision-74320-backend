import { MemoryProductosDAO } from "../dao/MemoryProductosDAO.js";

export class ProductosRepository{
    static #productosDAO=new MemoryProductosDAO()

    static async getProducts(){
        return await this.#productosDAO.get()
    }
}