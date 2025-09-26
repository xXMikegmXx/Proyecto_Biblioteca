
const express = require('express');
const funciones = require('./Classes/FuncionesGenericas'); 
const db = require('./Classes/DB');
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

app.listen(port,()=>{
    console.log(`Servicio en alta escuchando en el puerto : ${port}`);
    db.CrearConexion();
});