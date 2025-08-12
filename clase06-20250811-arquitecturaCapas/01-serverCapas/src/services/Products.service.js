import { ProductsDAO } from "../dao/ProductsDAO.js"

class ProductsService{
    constructor(dao){
        this.productsDAO=dao
    }

    async getProducts(){
        return await this.productsDAO.get()
    }

    async getProductByTitle(title){
        let productos=await this.productsDAO.get()
        let producto=productos.find(p=>p.title==title)
        return producto
    }

    async getProductById(id){
        let productos=await this.productsDAO.get()
        let producto=productos.find(p=>p.id==+id)
        return producto
    }

    async createProduct(producto){
        return await this.productsDAO.create(producto)
    }
}



export const productsService=new ProductsService(ProductsDAO)