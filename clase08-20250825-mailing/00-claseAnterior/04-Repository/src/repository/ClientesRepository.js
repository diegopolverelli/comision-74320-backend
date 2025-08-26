import { MemoryClientesDAO } from "../dao/MemoryClientesDAO.js";

export class ClientesRepository{
    static #ClientesDAO=new MemoryClientesDAO()

    static async getClientes(){
        return await this.#ClientesDAO.get()
    }

    static async updateCliente(idCliente, cliente){
        return await this.#ClientesDAO.update(idCliente, cliente)
    }
}