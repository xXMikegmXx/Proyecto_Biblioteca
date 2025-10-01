
const express = require('express');
const funciones = require('./Classes/FuncionesGenericas'); 
const db = require('./Classes/DB');
const persona = require('./Classes/Persona');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'Publico')));

app.get('/ScanerCredencial',async function (reques,response) {
    response.sendFile(path.join(__dirname,"html/Formulario.html"));
});

app.get('/login',async function (reques,response) {
    response.sendFile(path.join(__dirname,"html/Login.html"));
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
    try{
        data = await persona.Info("2019640034");
        response.json(data);
    }catch(e){
        response.json({
            message:e.message
        });
    }
    
    
})

app.listen(port,()=>{
    console.log(`Servicio en alta escuchando en el puerto : ${port}`);
    db.CrearConexion();
});