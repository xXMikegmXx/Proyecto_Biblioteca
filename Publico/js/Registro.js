function RegistrarAlumno(){
    const datoshtml =document.getElementById("form");

    const datos = new FormData(datoshtml);

     const nombre = datos.get("nombre")?.trim();
     const apellidoP = datos.get("apellidoP")?.trim();
     const apellidoM = datos.get("apellidoM")?.trim();
     const boleta = datos.get("boleta")?.trim();
     const correo = datos.get("correo")?.trim();
     const carrera = datos.get("carrera");
     const password = datos.get("password")?.trim();
     const repetir = document.getElementById("repetir").value?.trim();
     const sexo = datos.get("sexo");
 
    
     const regexBoleta = /^[0-9]{10}$/;
     const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     const dominiosPermitidos = [
         "gmail.com",
         "yahoo.com",
         "outlook.com",
         "hotmail.com",
         "ipn.mx",
         "alumno.ipn.mx"
     ];
    
    if (!nombre || !apellidoP || !apellidoM || !boleta || !correo || !password || !repetir) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    if (!regexBoleta.test(boleta)) {
        alert("La boleta debe contener exactamente 10 dígitos numéricos.");
        return;
    }

    if (!regexCorreo.test(correo)) {
        alert("Ingresa un correo electrónico válido.");
        return;
    }

    const dominio = correo.split("@")[1]?.toLowerCase();
    if (!dominiosPermitidos.includes(dominio)) {
        alert("Solo se permiten correos de dominios: gmail, yahoo, outlook, hotmail, ipn.mx o alumno.ipn.mx");
        return;
    }

    if (password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return;
    }

    if (password !== repetir) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    let datosenviar = {
        "nombre":datos.get("apellidoP")+" "+datos.get("apellidoM")+" "+datos.get("nombre"),
        "boleta":datos.get("boleta"),
        "carrera":datos.get("carrera"),
        "correo":datos.get("correo"),
        "password":datos.get("password"),
        "sexo":datos.get("sexo"),
        "estatus": document.getElementById("check") ? "AV" : "ANV"
    };

    console.log(datosenviar);

    fetch('/altaAlumno',{
        method:"POST",
        headers:{
            'content-type':'application/json'
            },
        body:JSON.stringify(datosenviar)
    }).then(data => data.json())
    .then(respuesta => {
        if(respuesta.error){
            alert("X ERROR AL REGISTRAR: " + respuesta.error);
            console.log(respuesta);
        }else{
            alert("REGISTRO EXITOSO!. Redirigiendo al login...");
            window.location.replace("/login");
        }
    })
    .catch(err => {
        console.error("Error de conexión:", err);
        alert("NO SE PUDO CONECTAR AL SERVIDOR.");
    });

}