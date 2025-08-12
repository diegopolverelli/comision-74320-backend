import { productos } from "../data/products.js";

export class ProductsDAO{
    static async get(){
        return productos
    }

    // getBy, update, delete

    static async create(product){
        let id=1
        if(productos.length>0){
            id=Math.max(...productos.map(d=>d.id))+1
        }

        let nuevo={
            id, 
            ...product  // ... son spread aquí
        }

        productos.push(nuevo)
        return nuevo
    }
}