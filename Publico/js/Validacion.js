class Validacion{

    static EsBoleta (Boleta){
        const expresionNumerico = /^[0-9]+$/;

        if(expresionNumerico.test(Boleta) == true && Boleta.length == 10){
            return true;
        }else{
            return false;
        }
    }

    static EsCorreo(correo) {
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
    
}