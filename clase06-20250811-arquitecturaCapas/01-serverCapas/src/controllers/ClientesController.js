export const getClientes=async(req, res)=>{

    let clientes="listado clientes"

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({clientes});
}

export const createCliente=async(req, res)=>{

    let cliente="nuevo cliente generado"

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({cliente});
}