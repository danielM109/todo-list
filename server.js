"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_session_1 = require("express-session");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3001;
// Configurar el middleware de sesiones
app.use((0, express_session_1.default)({
    secret: 'tu-secreto-aqui',
    resave: false,
    saveUninitialized: false
}));
// Lista de usuarios (solo para ejemplo)
var users = [
    { username: 'user1', password: '1234' },
    { username: 'user2', password: '1234' },
    // Otros usuarios...
];
// Ruta para iniciar sesión
app.post('/login', function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    // Verificar las credenciales
    var user = users.find(function (user) { return user.username === username && user.password === password; });
    if (user) {
        // Iniciar sesión
        req.session.user = { username: username }; // Guardar el usuario en la sesión
        res.json({ success: true, user: req.session.user });
    }
    else {
        res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
});
// Ruta protegida que requiere autenticación
app.get('/ruta-protegida', function (req, res) {
    // Verificar si el usuario ha iniciado sesión
    if (req.session && req.session.user) {
        // El usuario ha iniciado sesión, responder con la página protegida
        res.send('Página protegida');
    }
    else {
        // El usuario no ha iniciado sesión, responder con un error de acceso no autorizado
        res.status(401).send('Acceso no autorizado');
    }
});
// Escuchar en el puerto especificado
app.listen(PORT, function () {
    console.log("Servidor Express corriendo en el puerto ".concat(PORT));
});
