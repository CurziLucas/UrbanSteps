let fs = require("fs")

function leerProductos(archivo){
    let productos = fs.readFileSync(archivo, "utf-8")
    return JSON.parse(productos)
}

function buscarProducto(idProducto, productos){
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id == idProducto) {
            return productos[i]
        }
    }
}

function buscarPosicion(idProducto, productos){
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id == idProducto) {
            return i
        }
    }
}

async function editarProducto(archivo, idProducto, productoEditado){
    let productos = leerProductos(archivo)
    productos[buscarPosicion(idProducto, productos)] = productoEditado
    escribirProductos(archivo, productos)
}

async function agregarProducto(archivo, nuevoProducto) {
    let productos = leerProductos(archivo)
    let nuevoId = productos.length > 0 ? productos[productos.length - 1].id +1 : 1;
    let nuevoProductoId = {id:nuevoId, ...nuevoProducto}
    productos.push(nuevoProductoId)
    fs.writeFileSync(archivo, JSON.stringify(productos, null, 2))
}

async function eliminarProducto(archivo, idProducto) {
    let productos = leerProductos(archivo)
    let pos = buscarPosicion(idProducto, productos)
    productos.splice(pos, 1)
    escribirProductos(archivo, productos)
}

function escribirProductos(archivo, productos) {
    fs.writeFileSync(archivo, JSON.stringify(productos, null, 2))
}
    

module.exports = {
    leerProductos, 
    buscarProducto,
    agregarProducto,
    eliminarProducto,
    editarProducto
}