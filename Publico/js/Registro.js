function RegistrarAlumno(){
    const datoshtml =document.getElementById("form");

    const datos = new FormData(datoshtml);

    let datosenviar = {
        "nombre":datos.get("apellidoP")+" "+datos.get("apellidoM")+" "+datos.get("nombre"),
        "boleta":datos.get("boleta"),
        "carrera":datos.get("carrera"),
        "correo":datos.get("correo"),
        "password":datos.get("password"),
        "sexo":datos.get("sexo")
    }

    if(document.getElementById("check")){
        datosenviar["estatus"]="AV";
    }else{
        datosenviar["estatus"]="ANV";
    }

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
            console.log(respuesta);
        }else{
            window.location.replace("/login");
        }
    });

}