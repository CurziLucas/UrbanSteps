let fs = require("fs");

function leerProductos(archivo){
    let productos = fs.readFileSync(archivo, "utf-8");
    return JSON.parse(productos);
}

function buscarProducto(idProducto, productos){
    return productos.filter(function(producto){
        if(producto.id === idProducto){
            return producto
        }
    })
}

module.exports = {
    leerProductos, 
    buscarProducto
}