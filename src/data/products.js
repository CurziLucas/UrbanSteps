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

async function agregarProducto(archivo, nuevoProducto) {
    let productos = leerProductos(archivo);
    let nuevoId = productos.length > 0 ? productos[productos.length - 1].id +1 : 1;
    let nuevoProductoId = {id:nuevoId, ...nuevoProducto}
    productos.push(nuevoProductoId)
    fs.writeFileSync(archivo, JSON.stringify(productos, null, 2))
}

module.exports = {
    leerProductos, 
    buscarProducto,
    agregarProducto
}