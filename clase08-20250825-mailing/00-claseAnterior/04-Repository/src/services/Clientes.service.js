import { ClientesRepository } from "../repository/ClientesRepository.js";
import { ProductosRepository } from "../repository/ProductosRepository.js";
import { TicketRepository } from "../repository/TicketsRepository.js";

export class ClientesService{
    static #clientes=ClientesRepository
    static #productos=ProductosRepository
    static #tickets=TicketRepository

    static async createTicket(idCliente, productos=[]){
        if(productos.length==0){
            throw new Error(`No hay productos para la venta`)
        }

        let clientes=await this.#clientes.getClientes()
        let cliente=clientes.find(c=>c.id==idCliente)
        if(!cliente){
            throw new Error(`No existen clientes con id ${idCliente}`)
        }

        // [{id:1, cantidad:3}, {id:3, cantidad1}]   productos=[]

        let errores=[]
        let total=0

        let maestroProductos=await this.#productos.getProducts()
        for(let i=0; i<productos.length; i++){
            let producto=maestroProductos.find(p=>p.id==productos[i].id)
            if(!producto){
                errores.push(`El producto con id ${productos[i].id} no existe en DB`)
            }else{
                if(producto.stock<productos[i].cantidad){
                    errores.push(`No hay stock suficiente para el producto ${producto.descrip} (id ${productos[i].id})`)
                }else{
                    productos[i].descrip=producto.descrip
                    productos[i].precio=producto.price
                    productos[i].subtotal=producto.price*productos[i].cantidad
                    productos[i].stock=producto.stock
                    total+=producto.price*productos[i].cantidad
                }
            }
        }

        if(errores.length>0){
            throw new Error(`Error en operacion de compra: ${JSON.stringify(errores)}`)
        }

        let ticket=await this.#tickets.createTicket({
            nroComp: Date.now(),
            fecha: new Date().toISOString(),
            detalle: productos,
            total
        })

        cliente.saldoCC+=total
        await this.#clientes.updateCliente(idCliente, cliente)

        return ticket
    }
}