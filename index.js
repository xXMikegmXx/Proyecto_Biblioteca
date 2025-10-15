const express = require('express');
const session = require('express-session');
const funciones = require('./Classes/FuncionesGenericas'); 
const db = require('./Classes/DB');
const persona = require('./Classes/Persona');
const path = require('path');
const app = express();
const port = 3000;
const Validacion = require('./Classes/Validacion');

require('dotenv').config({ path: path.resolve(__dirname, '/acces.env') });

app.use(session({
  secret: process.env.SECRET, 
  resave: false,                    
  saveUninitialized: false,          
  cookie: {
    httpOnly: true,
    maxAge: 2000 * 60 * 60
  }
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'Publico')));

app.get('/ScanerCredencial', async function (request, response) {
  response.sendFile(path.join(__dirname, "html/Formulario.html"));
});

app.get('/login', async function (request, response) {
  if (request.session && request.session.boleta) {
    response.redirect('/dashboard');
  } else {
    response.sendFile(path.join(__dirname, "html/Login.html"));
  }
});

app.get('/registro', async function (request, response) {
  response.sendFile(path.join(__dirname, "html/Registrar.html"));
});

app.post('/QR', async function (request, response) {
  let { url } = request.body;
  const data = await funciones.ExtraerInformacion(url);
  response.json(data);
});

app.post('/altaAlumno', async function (request, response) {
  try {
    const { boleta, correo, nombre, carrera, password, sexo, estatus } = request.body;

    // 1️⃣ Verificar campos requeridos
    if (!boleta || !correo || !nombre || !carrera || !password || !sexo) {
      return response.json(funciones.MensajeError("Faltan campos obligatorios"));
    }

    // 2️⃣ Validar formato de boleta
    if (!Validacion.EsBoleta(boleta)) {
      return response.json(funciones.MensajeError("La boleta no tiene un formato válido"));
    }

    // 3️⃣ Validar formato de correo
    if (!Validacion.EsCorreo(correo)) {
      return response.json(funciones.MensajeError("El correo electrónico no es válido o no pertenece a un dominio permitido"));
    }

    // 4️⃣ Si todo es válido, continuar con el registro
    const data = await persona.Ingresar(request.body);
    response.json(data);

  } catch (error) {
    console.error("Error en altaAlumno:", error);
    response.json(funciones.MensajeError("Error al registrar el alumno"));
  }
});


app.get('/dashboard', async function (request, response) {
  if (request.session && request.session.boleta) {
    try {
      const data = await persona.Info("2019640034");
      response.sendFile(path.join(__dirname, "html/Dashboard.html"));
    } catch (e) {
      response.json({ message: e.message });
    }
  } else {
    response.redirect('/login');
  }
});

app.post('/login', async function (request, response, next) {
  let { boleta, password } = request.body;

  try {
    const alumno = await persona.Info(boleta);

    if (alumno) {
      if (alumno.verificacion(password)) {
        request.session.regenerate((err) => {
          if (err) return next(err);
          request.session.boleta = boleta;
          request.session.save(err => {
            if (err) return next(err);
            response.json({ message: "Validación correcta" });
          });
        });
      } else {
        response.json(funciones.MensajeError("Contraseña incorrecta"));
      }
    } else {
      response.json(funciones.MensajeError("Usuario no encontrado"));
    }

  } catch (e) {
    console.error(e);
    response.json(funciones.MensajeError(e.message));
  }
});

app.listen(port, () => {
  console.log(`Servicio en alta escuchando en el puerto : ${port}`);
  db.CrearConexion();
});
