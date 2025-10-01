const DB = require('./DB');
const validar = require('./Validacion');
const genericas = require('./FuncionesGenericas');

class persona{

    constructor(informacion){
        this.boleta=informacion.boleta;
        this.nombre=informacion.Nombre;

        let apellidos = informacion.Nombre.split(" ");

        this.apellidoP=apellidos[apellidos.length-2];
        this.apellidoM=apellidos[apellidos.length-1];
        this.carrera=informacion.Carrera;
        this.tesis=informacion.Tesis_ID_Tesis;

        if(this.tesis == null){
            this.asesores=[];
        }
        
        this.tipo = informacion.Estatus_Alumno;
    }

    static async Ingresar(form){
        console.log(form);
        const query = "INSERT INTO Alumno (Boleta,Estatus_Alumno,Password,Carrera,Derechos_tesis,Nombre,Sexo) VALUES (?,?,?,?,FALSE,?,?);";
        try{
            let db = new DB();

            if(!validar.EsBoleta(form.boleta)){
                return genericas.MensajeError("Boleta invalida");
            }

            const params = [
                parseInt(form.boleta),
                form.estatus,
                form.password,
                form.carrera,
                form.nombre,
                form.sexo
                ];

            const respuesta = await db.pool.query(query,params);
            return {
                "mensaje":"Se guardo correctamente el usuario"
            };
        }catch(e){
            console.error("Ya registrado usuario -> "+e.code);
            if(e.code == 'ER_DUP_ENTRY'){
                return genericas.MensajeError("Usuario ya registrado");
            }
            
        }
    }

    static async Info(boleta){
        try{
            let db = new DB();
            let script = "SELECT * FROM Alumno WHERE Boleta= ? LIMIT 1";

            const params = [boleta];
            const respuesta = await db.pool.query(script,params);

            if(respuesta[0].length == 1){
                let alumno = new persona(respuesta[0][0]);
                return alumno;
            }else{
                throw new Error("Usuario no encontrado");
            }

        }catch(e){
            throw e;
        }
        
    }

}

module.exports = persona