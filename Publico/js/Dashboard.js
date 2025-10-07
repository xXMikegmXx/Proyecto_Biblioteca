
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

function buscarAlumno(){
    const boleta = document.getElementById("busquedaAlumno");
    console.log(boleta.value);
    fetch(`/alumno?boleta=${boleta.value}`)
    .then(respuesta => respuesta.json())
    .then(dato =>{
      console.log(dato);
      if("error" in dato){

      }else{
        let header=["boleta","nombre","carrera"];
        let tbody =document.getElementById("alumnos");
        tbody.innerHTML="";
        let tr = document.createElement("tr");

        for(let n=0; n<header.length;n++){
          let th = document.createElement("th");
          th.innerHTML = dato[header[n]];
          tr.appendChild(th);
        }

        let button = document.createElement("img");
        button.src="/recursos/plus.png";
        button.className="botonAgregar";
        button.setAttribute("boleta",dato["boleta"]);
        button.setAttribute("nombre",dato["nombre"]);

        button.addEventListener("click",(e)=>{
          agregarAlumno(e.target.getAttribute("boleta"),e.target.getAttribute("nombre"));
        });

        let th = document.createElement("th");
        th.appendChild(button);
        tr.appendChild(th);
        tbody.appendChild(tr);
      }
    });
}

function agregarAlumno(boleta,nombre){
  let lista =document.getElementById("alumnoRegistrado");

  for(let row of lista.rows){
    for (let celda of row.cells) {
      if(celda.textContent==boleta){
        return 0;
      }
    }
  }

  let tr = document.createElement("tr");
  let th = document.createElement("th");
  let th2 = document.createElement("th");
  let th3 = document.createElement("th");
  let button = document.createElement("img");

  th.innerHTML=boleta;
  tr.appendChild(th);
  th2.innerHTML=nombre;
  tr.appendChild(th2);
  
  button.src="/recursos/menos.png";
  button.className="botonAgregar";
  button.setAttribute("boleta",boleta);

  button.addEventListener("click",(e)=>{
          eliminarAlumno(e.target.getAttribute("boleta"));
        });

  th3.appendChild(button);
  tr.appendChild(th3);

  lista.appendChild(tr);
}

function eliminarAlumno(boleta){
  let lista =document.getElementById("alumnoRegistrado");

  for(let row of lista.rows){
    for (let celda of row.cells) {
      if(celda.textContent==boleta){
        row.remove();
        return 0;
      }
    }
  }

}

function agregarAsesor(){
  
}

