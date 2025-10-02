function IniciarSesion(){
   let form = document.getElementById("login");

   let datos = new FormData(form);
    
   datosEnviar = {
        "boleta":datos.get("boleta"),
        "password":datos.get("password")
   }

   fetch("/login",{
        method:"POST",
        headers:{
            'content-type': "application/json"
        },
        body:JSON.stringify(datosEnviar)
   }).then(data=>data.json())
   .then(respuesta => {
        if('error' in Object.keys(respuesta)){
            console.log(respuesta);
        }else{
            window.location.replace("/dashboard");
        }
   });
}