const axios = require("axios");
const cheerio = require("cheerio");

async function ExtraerInformacion(url){
    console.log(url)
    url=url.replace("www","servicios");
    
    const { data: html } = await axios.get(url, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36" }
    });

    const respuesta = cheerio.load(html);

    const boleta = respuesta(".boleta").text().trim();
    const nombre = respuesta(".nombre").text().trim();
    const carrera = respuesta(".carrera").text().trim();
    const escuela = respuesta(".escuela").text().trim();

    if(boleta.length>0 && nombre.length>0 && carrera.length>0 && escuela.length>0  ){
        
        if(escuela != "UNIDAD PROFESIONAL INTERDISCIPLINARIA EN INGENIERÍA Y TECNOLOGÍAS AVANZADAS (UPIITA)" && escuela != "UPIITA" ){
            return JSON.stringify({
                error: true,
                message: "Alumno no correspondiente a UPIITA"
            });
        }
        
        partes = nombre.split(" ");

        ApellidoPaterno = partes[partes.length - 2];
        ApellidoMaterno = partes[partes.length - 1];

        Nombre = nombre.replace(ApellidoPaterno,"");
        Nombre = Nombre.replace(ApellidoMaterno,"");

        return JSON.stringify({
                boleta:boleta,
                nombre:Nombre,
                apellidoPaterno:ApellidoPaterno,
                apellidoMaterno:ApellidoMaterno,
                carrera:carrera
            });

    }else{
        return JSON.stringify({
                error: true,
                message: "QR invalido"
            });
    }

}

module.exports = {
  ExtraerInformacion
};