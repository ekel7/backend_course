const socketClient = io();
//PENDIENTE 2: ENTENDER ESTOTRO

//escuchando al evento
//recivo un cb donde llamo al segundo evento/msj
socketClient.on('saludoDesdeBack', (msg)=>{
    console.log(msg);

    socketClient.emit('respuestaDesdeFront', 'Muchas gracias')

})


const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputPrice = document.getElementById('price');
const inputThumbnail = document.getElementById('thumbnail');
const inputCode = document.getElementById('code');
const inputStock = document.getElementById('stock');
const products = document.getElementById('products');

socketClient.on('server:initialProducts', (initialProducts) => {
    let infoProducts = '';
    console.log(initialProducts);
    initialProducts.forEach( p => {
        infoProducts += `${p.title} - $${p.price}- </br> <hr>`
    })
    //esto es para que se muestre en html
    products.innerHTML = infoProducts
})


//cuando se ejecute el submit se va a fabricar el objeto y sera enviado al servidor
//el evento que emito lo escucho siempre con el mismo nombre
form.onsubmit = (e) => {
    e.preventDefault();
    const title = inputTitle.value;
    const description = inputDescription.value;
    const price = inputPrice.value;
    const thumbnail = inputThumbnail.value;
    const code = inputCode.value;
    const stock = inputStock.value;

    const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        console.log({product});
    socketClient.emit('client:newProduct', product);
    //esto es para reseatear esa parte de name y price una vez que el producto fue agregado
    inputTitle.value = ''
    inputDescription.value = ''
    inputPrice.value = ''
    inputThumbnail.value = ''
    inputCode.value = ''
    inputStock.value = ''

};

//el evento de products de server es recibido aca
//recibo el array, lo guardo en una variable y 
//voy obteniendo el nombre y precio de cada producto
//y luego voy mostrando el nombre y precio guardados en la variable infoProducts
socketClient.on('server:newArrayProducts', (productsArray) => {
    let infoProducts = '';
    productsArray.forEach( p => {
        infoProducts += `${p.title} - $${p.price}- </br> <hr>`
    })
    //esto es para que se muestre en html
    products.innerHTML = infoProducts
})
//conexion desde socket http parte 2
//aca es donde queda capturado el msg enviado de server
socketClient.on('message', (msg) => {
    console.log(msg);
})