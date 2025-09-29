
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
    console.log(Text);
}


