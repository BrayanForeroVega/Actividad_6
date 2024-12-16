const express = require('express');  
const bodyParser = require('body-parser');  
const cors = require('cors');   
const path = require('path');

let inventario = [  
    { id: 1, nombre: 'Laptop', marca: 'Dell', cantidad: 10 },  
    { id: 2, nombre: 'Telefono', marca: 'Apple', cantidad: 5 },  
    { id: 3, nombre: 'Tablet', marca: 'Samsung', cantidad: 7 },  
];  

const app = express(); 
const port = 3000; 

app.use(cors());  
app.use(bodyParser.json()); 

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  
});

// Obtener todos los productos del inventario  
app.get('/api/inventario', (req, res) => {  
    res.json(inventario);  
});  

// Obtener un producto específico  
app.get('/api/inventario/:id', (req, res) => {  
    const producto = inventario.find(p => p.id === parseInt(req.params.id));  
    if (!producto) return res.status(404).send('Producto no encontrado');  
    res.json(producto);  
});  

// Agregar un nuevo producto  
app.post('/api/inventario', (req, res) => {  
    const nuevoProducto = {  
        id: inventario.length + 1,  
        nombre: req.body.nombre,  
        marca: req.body.marca,  
        cantidad: req.body.cantidad  
    };  
    inventario.push(nuevoProducto);  
    res.status(201).json(nuevoProducto);  
});  

// Actualizar un producto  
app.put('/api/inventario/:id', (req, res) => {  
    const producto = inventario.find(p => p.id === parseInt(req.params.id));  
    if (!producto) return res.status(404).send('Producto no encontrado');  

    producto.nombre = req.body.nombre;  
    producto.marca = req.body.marca;  
    producto.cantidad = req.body.cantidad;  
    res.json(producto);  
});  

// Eliminar un producto  
app.delete('/api/inventario/:id', (req, res) => {  
    const index = inventario.findIndex(p => p.id === parseInt(req.params.id));  
    if (index === -1) return res.status(404).send('Producto no encontrado');  

    inventario.splice(index, 1);  
    res.status(204).send();  
});  

// Iniciar el servidor  
app.listen(port, () => {  
    console.log(`Servidor corriendo en http://localhost:3000`);  
});