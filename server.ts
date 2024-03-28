import express, { Request, Response } from 'express';
import session from 'express-session';

// Sobrescribir el tipo express.Session para incluir la propiedad 'user'
declare module 'express-session' {
  interface SessionData {
    user?: {
      username: string;
    };
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar el middleware de sesiones
app.use(session({
  secret: 'tu-secreto-aqui',
  resave: false,
  saveUninitialized: false
}));

// Lista de usuarios (solo para ejemplo)
const users = [
  { username: 'user1', password: '1234' },
  { username: 'user2', password: '1234' },
  // Otros usuarios...
];

// Ruta para iniciar sesión
app.post('/api/login', (req: Request<{}, {}, { username: string; password: string }>, res: Response) => {
  const { username, password } = req.body;

  // Verificar las credenciales
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // Iniciar sesión
    req.session.user = { username }; // Guardar el usuario en la sesión
    res.json({ success: true, user: req.session.user });
  } else {
    res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }
});

// Ruta protegida que requiere autenticación
app.get('/api/ruta-protegida', (req: Request<{}, {}, {}>, res: Response) => {
  // Verificar si el usuario ha iniciado sesión
  if (req.session && req.session.user) {
    // El usuario ha iniciado sesión, responder con la página protegida
    res.send('Página protegida');
  } else {
    // El usuario no ha iniciado sesión, responder con un error de acceso no autorizado
    res.status(401).send('Acceso no autorizado');
  }
});

// Escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});

