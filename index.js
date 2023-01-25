import express from 'express'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import Contenedor from './contenedores/ContenedorDb.js';
import ContenedorDB from './contenedores/ContenedorDbLite.js'

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const contenedor = new Contenedor('cars')
const contenedorDB = new ContenedorDB('mensajes')
contenedorDB.crearTabla()

io.on('connection', async socket => {
    const products = await contenedor.mostrarProductos()
    socket.emit('productos', products)

    socket.on('producto', datat => {
        contenedor.agregarProducto(datat)
        io.sockets.emit('productos', products)
    })

    socket.emit('mensajes', contenedorDB.listarAll())

    socket.on('message', data => {
        contenedorDB.guardar(data)

        io.sockets.emit('mensajes', contenedorDB.listarAll())
    })
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})

connectedServer.on('error', error => console.log(`Error en servidor ${error}`))