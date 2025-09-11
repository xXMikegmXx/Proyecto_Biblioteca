
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/ScanerCredencial',async function (reques,response) {
    response.sendFile(path.join(__dirname,"html/Formulario.html"));
});

app.get('/',async function (reques,response) {
    response.sendFile(path.join(__dirname,"html/Login.html"));
})

app.listen(port,()=>{
    console.log(`Servicio en alta escuchando en el puerto : ${port}`);
});