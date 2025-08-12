// import { ProductsDAO } from "../dao/ProductsDAO.js"

import { productsService } from "../services/Products.service.js"

export class ProductsController{
    static getProducts=async(req,res)=>{

        try {
            // procesamiento, validaciones, etc
    
            // let productos="productos"
            // let productos=await ProductsDAO.get()
            let productos=await productsService.getProducts()
        
            res.setHeader('Content-Type','application/json')
            res.status(200).json({productos})
        } catch (error) {
            console.log(error)
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`internal server error`})
        }
    }

    static createProduct=async(req,res)=>{

        // procesamiento, validaciones, etc
        let {title, price}=req.body
        if(!title || !price){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`title y price son requeridos`})
        }

        try {
            let existe=await productsService.getProductByTitle(title)
            if(existe){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Ya existe otro ${title} en DB`})
            }
            // let producto="nuevo producto"
            // let producto=await ProductsDAO.create({title, price})
            let producto=await productsService.createProduct({title, price})
        
            res.setHeader('Content-Type','application/json')
            res.status(200).json({producto})
        } catch (error) {
            console.log(error)
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`internal server error`})
        }
    }
}