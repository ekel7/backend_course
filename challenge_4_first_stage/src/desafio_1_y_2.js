import fs from 'fs';
/* TAREA___________________________________________________ 

  - addProduct (hecho???)
  - getProducts (hecho)
  - getProductById(hecho);
  - updateProduct(hecho)
  - deleteProduct()


*/

export class ProductManager {
  constructor() {
    this.path = "./src/data/";
  }
  addProduct = async (newProduct) => {
    console.log("Hola, agregando el producto " + newProduct.title);
    // Agregando id
    let currentProductsList = await this.getProducts();
     
    let lastIDGenerated = currentProductsList[currentProductsList.length - 1].id;

    let productWithId = {
      ...newProduct,
      id: lastIDGenerated ? lastIDGenerated + 1 : 1,
    };
    

    //agregando status predeterminado

    if(!newProduct.status){
      productWithId.status = true;
    }

    //Validacion de campos obligatorios
    let poseeCamposObligatorios = this.validateObject(newProduct);

    if (poseeCamposObligatorios == false) {
      throw new Error("El producto no posee todos los campos obligatorios");
    }
    //Validación de propiedad code
    let sameCodeFound = currentProductsList.find(
      (element) => element.code === newProduct.code
    );
    console.log({
      message:
        "Este es el producto que encontre con el codigo " + newProduct.code,
      sameCodeFound,
    });
    if (sameCodeFound) {
      console.log(
        "Un producto con este codigo ya existe, producto no agregado"
      );
      return "Un producto con este codigo ya existe";
    } else {
      let existentProducts = await this.getProducts();
      console.log(existentProducts);
      existentProducts.push(productWithId);
      await fs.promises.writeFile(
        `${this.path}products.json`,
        JSON.stringify(existentProducts)
      );

      return `Producto ${productWithId.title} agregado exitosamente!`
    }
  };

  getProducts = async (limit) => {
    const ruta = `${this.path}products.json`
    fs.readdirSync(`${this.path}`).forEach(file => {
      console.log(file);
    });
    console.log(ruta);
    console.log(
      "hola, aca esta la lista completa de productos(esta vez leida del archivo productos.json):"
    );
    //Verificando que existe el archivo
    if (fs.existsSync(`${this.path}products.json`)) {
      //Leyendo el JSON en RAW string
      let rawContent = await fs.promises.readFile(`${this.path}products.json`, "utf8");
      //Convirtiendo el RAW en JavaScript con JSON.parse
      let parsedContent = JSON.parse(rawContent);

      if(limit === undefined) return parsedContent;

      let limitedArray = parsedContent.slice(0, (limit));
      return limitedArray;
    }
    return "El archivo no existe :<";
  };
  getProductById = async (id) => {
    console.log(
      "Hola, este es el 1mer producto que encontre con el id: " +
        id +
        "(esta vez leido del archivo productos.json)..."
    );
    let parsedContent;
    if (fs.existsSync(`${this.path}products.json`)) {
      let rawContent = await fs.promises.readFile(`${this.path}products.json`, "utf8");
      parsedContent = JSON.parse(rawContent);
    } else {
      return "El archivo no existe aún./This file does not exist yet.";
    }
  

    let foundProduct = parsedContent.find((product) => product.id === Number(id));

    if (foundProduct !== undefined) {
      return foundProduct;
    } else {
      return "Error, not found";
    }
  };
  validateObject(object) {
    //NOTA: AGREGAR FUNCION PARA QUE DEVUELVA QUE PROPIEDAD FALTA.
    if (
      object.hasOwnProperty("title") &&
      object.hasOwnProperty("description") &&
      object.hasOwnProperty("price") &&
      object.hasOwnProperty("code") &&
      object.hasOwnProperty("stock") &&
      object.hasOwnProperty("category")
    ) {
      return true;
    } else {
      return false;
    }
  }

  async updateProduct(id, updatedObject) {
    console.log(`Actualizando producto con el ID: ${id}...`);
    let foundProductFlag = false;
    let parsedContent;
    if (fs.existsSync(`${this.path}products.json`)) {
      let rawContent = fs.promises.readFile(`${this.path}products.json`, "utf8");
      parsedContent = JSON.parse(rawContent);
    } else {
      return "El archivo no existe aún./This file does not exist just yet.";
    }
    
    //Buscando el producto a actualizar con forEach, guardando el indice de cada producto recorrido
    parsedContent.forEach((product, index) => {
      if (product.id === id) {
        //Si se encuentra el producto, actualizar el producto en el indice correspondiente con la nueva data.
        let savedId = product.id;
        parsedContent[index] = updatedObject;
        parsedContent[index].id = savedId;
        //Cambiamos la flag a true para avisar que se encontro el producto y que escriba en el archivo.
        foundProductFlag = true;
      }
    });


    if (foundProductFlag) {
      await fs.promises.writeFile(
        `${this.path}products.json`,
        JSON.stringify(parsedContent)
      );

      return "El producto fue actualizado exitosamente.";
    }
    return "El producto con este ID no fue encontrado en la DB.";
  }

  deleteProduct(id){
    console.log(`Borrando producto con el ID: ${id}...`);
    let foundProductFlag = false;
    let parsedContent;
    let newArray;
    if (fs.existsSync(`${this.path}products.json`)) {
      let rawContent = fs.readFileSync(`${this.path}products.json`, "utf8");
      parsedContent = JSON.parse(rawContent);
    } else {
      return "El archivo no existe aún./This file does not exist just yet.";
    }


    parsedContent.forEach((product) => {
      if (product.id === id) {
        foundProductFlag = true;
      }
    });

    if(foundProductFlag){
      //Si el producto se encuentra, se borra con filter
      newArray = parsedContent.filter((item) => item.id != id)
      fs.writeFileSync(
        `${this.path}products.json`,
        JSON.stringify(newArray)
      );

      return "El producto fue borrado exitosamente.";
    }
    return 'No se encontro producto con este ID';
  }
}

/* let instanciaDos = new ProductManager();

let productoNuevo = {
  title: "Arroz",
  description: "largo fino",
  price: 400,
  thumbnail: "sin imagen",
  code: 1234,
  stock: 20,
};

instanciaDos.addProduct(productoNuevo);

instanciaDos.addProduct({
  title: "Fideos",
  description: "tirabuzon",
  price: 500,
  thumbnail: "sin imagen",
  code: 123648,
  stock: 10,
});

instanciaDos.addProduct({
  title: "Lentejas",
  description: "para guisos y ensaladas",
  price: 300,
  thumbnail: "sin imagen",
  code: 123456,
  stock: 15,
});

//console.log(instanciaDos.getProducts());

instanciaDos.updateProduct(1, {
  title: "Queso",
  description: "aguante el queso",
  price: 300,
  thumbnail: "sin imagen",
  code: 21111,
  stock: 10,
})


instanciaDos.deleteProduct(0);


console.log(instanciaDos.getProducts()); */


