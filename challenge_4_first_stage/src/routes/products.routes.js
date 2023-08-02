import {Router} from 'express';
import { ProductManager } from '../desafio_1_y_2.js';

const PMInstance = new ProductManager;

const ProductsRouter = Router();

ProductsRouter.get('/:limit?', async (req, res) => {
    res.json(await PMInstance.getProducts(req.params.limit))
});

ProductsRouter.get('/:pid', async (req, res) => {
    res.json(await PMInstance.getProductById(req.params.pid))
});

ProductsRouter.post


export default ProductsRouter;