import { MemoryClientesDAO as DAO } from "../dao/MemoryClientesDAO.js"
import { ClientesService } from "../services/Clientes.service.js"

let clientesService=new DAO()

async function getClientes(req,res){

    let clientes=await clientesService.get()

    res.status(200).json({clientes})
}

async function venta(req, res){
    let {idCliente, productos}=req.body
    // validaciones... 
    if(!Array.isArray(productos) || productos.length==0){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`productos debe ser un array con objetos`})
    }

    try {
        let ticket=await ClientesService.createTicket(idCliente, productos)
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:`Ticket generado!`, ticket});
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Error`, detalle: error.message})
    }
}

export default {getClientes, venta}