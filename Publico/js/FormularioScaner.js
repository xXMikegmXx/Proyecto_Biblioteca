
console.log("Cargado");

document.addEventListener("DOMContentLoaded",function(){
    ReadQR("view","");
});

function ReadQR (View,text){

    let view = document.getElementById(View);
    const percentage = .5;

    let widthQR = view.clientWidth*percentage;
    let heightQr = view.clientHeight*percentage;

    let QR = new Html5QrcodeScanner (View,{
        fps: 10,
        qrbox: { width: widthQR, height: heightQr},
        hideQRLogin: true
    });

    QR.render(ScanResult);    

};

 function ScanResult(Text){
    let stop = document.getElementById("html5-qrcode-button-camera-stop");
    stop.click();
    console.log(Text);
    let view = document.getElementById("view");
    view.remove();

    let dowload =document.createElement("img");
    dowload.src = "/recursos/dowload.gif";
    document.getElementById("Derecha").appendChild(dowload);

    fetch('/QR',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            url: Text
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data);
        data = JSON.parse(data);
        if(data.hasOwnProperty("error")){
            document.getElementById("Derecha").appendChild(view);
        }else{
            dowload.remove();
            let img = document.createElement("img");
            img.src = "/recursos/Check.png";
            img.className = "check";
            img.id = "check";
            document.getElementById("Derecha").appendChild(img);

            document.getElementById("nombre").value = data.nombre;
            document.getElementById("apellidoM").value = data.apellidoMaterno;
            document.getElementById("apellidoP").value = data.apellidoPaterno;
            document.getElementById("boleta").value = data.boleta;

            let select = document.getElementById("carrera");

            let option = select.querySelector(`option[value='${data.carrera}']`);
            option.selected = true;
        }
        
    });
}

