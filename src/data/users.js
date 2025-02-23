let fs = require("fs");

function leerUsuarios(archivo){
    let usuarios = fs.readFileSync(archivo, "utf-8");
    return JSON.parse(usuarios);
}

function buscarUsuario(emailUsuario, usuarios){
    emailUsuario = emailUsuario.toLowerCase()
    for (let i = 0; i < usuarios.length; i++) {
        if(usuarios[i].email === emailUsuario){
            return usuarios[i]
        }
    }
}

async function agregarUsuario(archivo, nuevoUsuario) {
    let usuarios = leerUsuarios(archivo);
    try {
        console.log(buscarUsuario(nuevoUsuario.email, usuarios))
        if (buscarUsuario(nuevoUsuario.email, usuarios)) throw new Error('se encontro un usuario con ese mail')
        let nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id +1 : 1;
        let nuevoUsuarioId = {id:nuevoId, ...nuevoUsuario}
        usuarios.push(nuevoUsuarioId)
        fs.writeFileSync(archivo, JSON.stringify(usuarios, null, 2))
    } catch (error) {
        console.log('error: ', error.message)
    }
}

function buscarPosicion(idUsuario, usuarios){
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id == idUsuario) {
            return i
        }
    }
}

function escribirUsuarios(archivo, usuarios) {
    fs.writeFileSync(archivo, JSON.stringify(usuarios, null, 2))
}

async function editarUsuario(archivo, idUsuario, usuarioEditado){
    let usuarios = leerUsuarios(archivo)
    usuarios[buscarPosicion(idUsuario, usuarios)] = usuarioEditado
    escribirUsuarios(archivo, usuarios)
}

module.exports = {
    leerUsuarios, 
    buscarUsuario,
    agregarUsuario,
    editarUsuario
}