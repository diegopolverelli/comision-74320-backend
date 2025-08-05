import { Router } from 'express';
export const router=Router()

// router.get()

router.get('/',(req,res)=>{

    

    res.setHeader('Content-Type','application/json')
    res.status(200).json({payload:"PRUEBA...!!!"})
})