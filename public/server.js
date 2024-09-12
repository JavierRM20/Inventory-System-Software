const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Configuración de middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Configuración de la base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory_db'
});

// Ruta para el registro de usuarios
app.post('/registrar', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        pool.query('INSERT INTO users (nombreUsuario, email, passwordHash) VALUES (?, ?, ?)', [username, email, hashedPassword], (error) => {
            if (error) return res.status(500).json({ error: error.message });
            res.status(201).json({ message: 'Usuario Registrado' });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para el inicio de sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.length === 0) return res.status(401).json({ message: 'Su Usuario no esta registrado' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.passwordHash);  
        if (!isMatch) return res.status(401).json({ message: 'Contraseña Incorrecta' });

        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    });
});

// Middleware para verificar JWT
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token requerido' });

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.userId = decoded.id;
        next();
    });
};

// Ruta protegida para la página de inventario (requiere autenticación)
app.get('/inventory', authenticate, (req, res) => {
    res.json({ message: 'Bienvenido a la página de inventario' });
});

// Ruta para obtener los productos
app.get('/productos', (req, res) => {
    pool.query('SELECT * FROM products', (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(results);
    });
});

// Ruta para agregar productos
app.post('/productos', (req, res) => {
    const { name, quantity } = req.body;
    pool.query('INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity], (error) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(201).json({ message: 'Producto Agregado' });
    });
});

// Ruta para despachar productos
app.post('/despacho', (req, res) => {
    const { productId, quantity } = req.body;
    pool.query('UPDATE products SET quantity = quantity - ? WHERE id = ?', [quantity, productId], (error) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json({ message: 'Producto Despachado' });
    });
});

// Ruta para recibir productos
app.post('/recibido', (req, res) => {
    const { productId, quantity } = req.body;
    pool.query('UPDATE products SET quantity = quantity + ? WHERE id = ?', [quantity, productId], (error) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json({ message: 'Producto Recibido' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto: http://localhost:${port}`);
});
