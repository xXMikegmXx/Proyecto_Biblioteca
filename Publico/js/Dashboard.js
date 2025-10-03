async function contenidoTesis(){
    const contenido = await fetch("/contenido?contenido=Tesis");
    let tipo = contenido.headers.get("content-type");
    console.log(tipo);
    if (tipo.includes("application/json")) {

      const datos = await contenido.json();
      console.log(datos);
      
    } else if (tipo.includes("text/html")) {
    
      const html = await contenido.text();
      let cuerpo = document.getElementById("cuerpo");
      cuerpo.innerHTML="";
      cuerpo.innerHTML = html;
    } else {
      console.log("ninguno");
    }
}

function agregarNombreTesis (){
    document.getElementById("formTesisNombre").style.display="none";
    document.getElementById("editar").style.display="block";
    document.getElementById("nombreTesis").textContent = document.getElementById("nombreTesisInput").value;
}

function editarNombreTesis (){
    document.getElementById("formTesisNombre").style.display="block";
    document.getElementById("editar").style.display="none";
    document.getElementById("nombreTesis").textContent = "";
}

function agregarAlumno(){
    
}