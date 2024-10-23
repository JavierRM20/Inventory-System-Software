const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory_db'
});

const jwtSecret = 'your_jwt_secret';

app.post('/registrar', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        pool.query('INSERT INTO users (nombreUsuario, email, passwordHash) VALUES (?, ?, ?)', [username, email, hashedPassword], (error) => {
            if (error) return res.status(500).json({ error: 'Error en el registro de usuario' });
            res.status(201).json({ message: 'Usuario registrado correctamente' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) return res.status(500).json({ error: 'Error en la base de datos' });
        if (results.length === 0) return res.status(401).json({ message: 'Usuario no registrado' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    });
});

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Token requerido' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token no válido o expirado' });
        req.userId = decoded.id;
        next();
    });
};

app.get('/inventario', authenticate, (req, res) => {
    pool.query('SELECT * FROM products', (error, results) => {
        if (error) {
            console.error('Error al obtener inventario:', error.message);
            return res.status(500).json({ error: 'No se pudo obtener el inventario' });
        }
        res.json(results);
    });
});

app.get('/productos', authenticate, (req, res) => {
    pool.query('SELECT * FROM products', (error, results) => {
        if (error) return res.status(500).json({ error: 'Error al obtener productos' });
        res.json(results);
    });
});

app.post('/productos', authenticate, (req, res) => {
    const { nombre, cantidad, proveedorId } = req.body;
    if (!nombre || !cantidad || !proveedorId) {
        return res.status(400).json({ message: 'Nombre, cantidad y proveedor son requeridos' });
    }
    pool.query('INSERT INTO products (nombre, cantidad, proveedor_id) VALUES (?, ?, ?)', [nombre, cantidad, proveedorId], (error) => {
        if (error) return res.status(500).json({ message: 'Error al agregar producto' });
        res.status(201).json({ message: 'Producto agregado correctamente' });
    });
});

app.get('/proveedores', authenticate, (req, res) => {
    pool.query('SELECT * FROM suppliers', (error, results) => {
        if (error) {
            console.error('Error al obtener proveedores:', error.message);
            return res.status(500).json({ error: 'No se pudo obtener proveedores' });
        }
        res.json(results);
    });
});

app.post('/despacho', authenticate, (req, res) => {
    const { productId, quantity } = req.body;
    pool.query('UPDATE products SET cantidad = cantidad - ? WHERE id = ?', [quantity, productId], (error) => {
        if (error) {
            console.error('Error al despachar producto:', error.message);
            return res.status(500).json({ error: 'Error al despachar producto' });
        }
        res.status(200).json({ message: 'Producto despachado' });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto: http://localhost:${port}`);
});
