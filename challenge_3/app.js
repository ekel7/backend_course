import express from 'express';
import { ProductManager } from './desafio_1_y_2.js';


const server = express();
const PMInstance = new ProductManager;

server.get('/saludo', (req, res) => {
    res.send("Hola, soy un server xdxd");
    //res.send sirve para contestar a una peticion
})

server.get('/bienvenida', (req, res) => {
    res.send(`<?html><p color="blue">Hola, bienvenido a mi pagina xd</p>`);
})

server.get('/usuario', (req, res) => {
    res.json({
        nombre: 'rosa', 
        apellido: 'guadalupe', 
        edad: 20, 
        correo: 'ahre@gmail.com'
    })
});

server.get('/products/:limit?', async (req, res) => {
    res.json(await PMInstance.getProducts(req.params.limit))
});

server.get('/products/:pid', async (req, res) => {
    res.json(await PMInstance.getProductById(req.params.pid))
})

server.post

server.listen(8080, () => console.log('Server levantado en el puerto 8080'));