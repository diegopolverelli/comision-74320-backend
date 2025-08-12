import { Router } from 'express';
export const router = Router()

// router.get()

router.get(
    '/',
    (req, res, next) => {
        console.log(`middleware 2`)
        next()
    },
    (req, res) => {

        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({ payload: "PRUEBA...!!!" })
    }
)