import express from 'express';
//import { ProductManager } from '../services/ProductManagerService';

//import * as productos from '../productos.json' assert { type: "json" };
//const productManagerInstance = new ProductManager;
const router = express.Router();


router.get('/', (req,res) => {
    res.render('home', {
        
//        productList
    })
})

router.get('/realtimeproducts', (req,res) => {

    res.render('realTimeProducts')

});


export default router;