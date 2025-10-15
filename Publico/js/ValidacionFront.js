//versión exportada de Validacion.js (solo funciones)
function EsBoleta(boleta) {
    const expresionNumerico = /^[0-9]+$/;
    return expresionNumerico.test(boleta) && boleta.length === 10;
}

function EsCorreo(correo) {
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!expresionCorreo.test(correo)) return false;

    const dominiosPermitidos = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "ipn.mx",
        "alumno.ipn.mx"
    ];

    const dominio = correo.split("@")[1].toLowerCase();
    return dominiosPermitidos.includes(dominio);
}
