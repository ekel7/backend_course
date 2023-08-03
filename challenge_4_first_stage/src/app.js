import express from 'express';
import { ProductManager } from './desafio_1_y_2.js';
import ProductsRouter from './routes/products.routes.js';


const server = express();
server.use(express.json());
const PMInstance = new ProductManager;
server.use('/products', ProductsRouter);

server.get('/saludo', (req, res) => {
    res.send("Hola, soy un server xdxd");
    //res.send sirve para contestar a una peticion
})

server.get('/bienvenida', (req, res) => {
    res.send(`<?html><p color="blue">Hola, bienvenido a mi pagina xd</p>`);
})





server.listen(8080, () => console.log('Server levantado en el puerto 8080'));