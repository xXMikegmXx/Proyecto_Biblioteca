
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
          agregarAlumno(e.target.getAttribute("boleta"),e.target.getAttribute("nombre"),"alumnoRegistrado");
        });

        let th = document.createElement("th");
        th.appendChild(button);
        tr.appendChild(th);
        tbody.appendChild(tr);
      }
    });
}

function agregarAlumno(boleta,nombre,tabla){
  let lista =document.getElementById(tabla);

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
  button.setAttribute("tabla",tabla);
  button.addEventListener("click",(e)=>{
          eliminarAlumno(e.target.getAttribute("boleta"),e.target.getAttribute("tabla"));
        });

  th3.appendChild(button);
  tr.appendChild(th3);

  lista.appendChild(tr);
}

function eliminarAlumno(boleta,tabla){
  let lista =document.getElementById(tabla);

  for(let row of lista.rows){
    for (let celda of row.cells) {
      if(celda.textContent==boleta){
        row.remove();
        return 0;
      }
    }
  }

}

function buscarAsesor(){
  const head = ["ID_Asesores","Nombre","Especialidad","Area"];
  const nombre = document.getElementById("buscarAsesor");

  fetch(`/asesor?nombre=${nombre.value}`)
  .then(respuesta => respuesta.json())
  .then(dato =>{
    let asesores = document.getElementById("asesores");
    asesores.innerHTML="";

    if("error" in dato){

    }else{
      dato.forEach(element => {
        let tr= document.createElement("tr");

        head.forEach(title=>{
          let th = document.createElement("th");
          th.innerText=element[title];
          tr.appendChild(th);
        });
        
        th = document.createElement("th");
        let img = document.createElement("img");
        img.src="/recursos/plus.png";
        img.className="botonAgregar";
        img.setAttribute("Id",element["ID_Asesores"]);
        img.setAttribute("nombre",element["Nombre"]);
        img.addEventListener("click",(e)=>{
          agregarAlumno(e.target.getAttribute("Id"),e.target.getAttribute("nombre"),"asesoresRegistrados");
        });

        th.appendChild(img);
        tr.appendChild(th);

        asesores.appendChild(tr);
      });
    };
  })
}

async function registarTesis(){

  const alumno = document.getElementById("alumnoRegistrado");
  const asesores = document.getElementById("asesoresRegistrados");
  const descripcion= document.getElementById("description");
  const nombre = document.getElementById("nombreTesis").innerText;
  const pdf = document.getElementById("pdf");

  const file = pdf.files[0];
  const arrayBuffer = await file.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

  let data={
    "nombreTesis": nombre,
    "Descripcion": descripcion,
    "asesores":[],
    "alumnos":[],
    "pdf64":base64
  }

  for(let row of alumno.rows){
    data.alumnos.push(row.cells[0].textContent);
  }

  for(let row of asesores.rows){
    data.asesores.push(row.cells[0].textContent);
  }
  console.log(data);
  fetch("/Tesis",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  .then(response=>response.json()).then(res=>{
    console.log(res);
  }
  );
}