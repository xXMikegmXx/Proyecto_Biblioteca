class Validacion{

    static EsBoleta (Boleta){
        const expresionNumerico = /^[0-9]+$/;

        if(expresionNumerico.test(Boleta) == true && Boleta.length== 10){
            return true;
        }else{
            return false;
        }
    }
}

module.exports = Validacion;