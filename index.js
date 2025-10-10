const express = require('express');
const session = require('express-session');
const fs = require("fs");
const funciones = require('./Classes/FuncionesGenericas'); 
const db = require('./Classes/DB');
const persona = require('./Classes/Persona');
const path = require('path');
const app = express();
const port = 3000;

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

app.get('/ScanerCredencial',async function (reques,response) {
    response.sendFile(path.join(__dirname,"html/Formulario.html"));
});

app.get('/login',async function (reques,response) {
     if(reques.session && reques.session.boleta){
        response.redirect('/dashboard');
    }else{
        response.sendFile(path.join(__dirname,"html/Login.html"));
    }
})

app.get('/registro',async function (reques,response) {
    response.sendFile(path.join(__dirname,"html/Registrar.html"));
})

app.post('/QR',async function (reques,response) {
    let {url} = reques.body;
    data = await funciones.ExtraerInformacion(url);
    response.json(data);
})

app.post('/altaAlumno',async function (reques,response) {
    data = await persona.Ingresar(reques.body);
    response.json(data);
})

app.get('/dashboard',async function (reques,response) {
    if(reques.session && reques.session.boleta){
        try{
            let data = await persona.Info(reques.session.boleta);
            let ruta = path.join(__dirname,"html","Dashboard.html");

            let html = await fs.readFileSync(ruta, "utf8");

            html = html.replace("{{Carrera}}",data.carrera);
            html = html.replace("{{Nombre}}",data.nombre);
            html = html.replace("{{Letra}}",data.nombre[0]);

            response.send(html);
            
            
        }catch(e){
            response.json({
                message:e.message
            });
        }
    }else{
        response.redirect('/login');
    }
   
})

app.get('/contenido',async function(reques,response) {

    let contenido = reques.query.contenido;

    try{
        let ruta = path.join(__dirname,"html",`${contenido}.html`);
        let html = await fs.readFileSync(ruta, "utf8");

        response.type("html").send(html);
    }catch(e){
        response.json(funciones.MensajeError(`Error: ${e}`));
    }
    
});

app.post('/login',async function (reques,response) {

    let {boleta,password} = reques.body;

    try{
        alumno = await persona.Info(boleta);

        if(alumno){
            if(alumno.verificacion(password)){
                reques.session.regenerate((err) => {
                    if (err) return next(err);
                    reques.session.boleta = boleta;
                    reques.session.save(err => {
                        if (err) return next(err);
                        response.json({
                                message:"Validacion correcta"
                            });
                        });
                });
                
            }else{
                response.json(funciones.MensajeError("Contraseña incorrecta"));
            }
        }else{
            response.json(funciones.MensajeError("Usuario no encontrado"));
        }

    }catch(e){
        console.error(e);
        response.json(funciones.MensajeError(e));
    }
});

app.get('/alumno',async function (reques,response) {
        if(reques.session && reques.session.boleta){
            let boleta = reques.query.boleta;
            let data = await persona.Info(boleta);

            if(data){
                if(!data.tesis){
                    response.json(data);
                }else{
                    response.json(funciones.MensajeError("Usuario ya cuenta con tesis"));
                }
                
            }else{
                response.json(funciones.MensajeError("Usuario no existe"));
            }

        }else{
            response.redirect('/login'); 
        }
});

app.get("/asesor", async function (reques,response){
    if(reques.session && reques.session.boleta){

        let nombre = reques.query.nombre;
        let data = await persona.Asesores(nombre);

        if(data){
            response.json(data); 
        }else{
            response.json(funciones.MensajeError("Asesor no existe"));
        }

    }else{
        response.redirect('/login'); 
    }
})

app.post("/Tesis",async function (reques,response) {
    let datos = reques.body;
    console.log(datos);
     if(reques.session && reques.session.boleta){
        
        if(datos["nombreTesis"] != null && datos["asesores"].length > 0 ){
            let respuesta = persona.registrarTesis(datos,reques.session.boleta);

            if(respuesta){
                response.send({
                    "message":"Registro exitoso"
                });
            }else{
                response.send(funciones.MensajeError("No se puedo guardar cambios"));
            }
        }else{
            response.send(funciones.MensajeError("falta informacion en la petición"));
        }
     }else{
        response.redirect('/login');
     }
    
});

app.listen(port,()=>{
    console.log(`Servicio en alta escuchando en el puerto : ${port}`);
    db.CrearConexion();
});