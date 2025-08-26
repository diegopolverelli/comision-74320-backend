import { MemoryTicketsDAO } from "../dao/MemoryTicketsDAO.js";

export class TicketRepository{
    static #ticketsDAO=new MemoryTicketsDAO()

    static async createTicket(ticket){
        return await this.#ticketsDAO.save(ticket)
    }
}