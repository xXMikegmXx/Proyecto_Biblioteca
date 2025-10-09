const DB = require('./DB');
const validar = require('./Validacion');
const genericas = require('./FuncionesGenericas');

class persona{

    #password;

    constructor(informacion){
        
        this.boleta=informacion.Boleta;
        this.nombre=informacion.Nombre;
        this.#password=informacion.Password;
        let apellidos = informacion.Nombre.split(" ");

        this.apellidoP=apellidos[apellidos.length-2];
        this.apellidoM=apellidos[apellidos.length-1];
        this.carrera=informacion.Carrera;
        this.tesis=informacion.Tesis_ID_Tesis;

        if(this.tesis == null){
            this.asesores=[];
            this.alumnos=[];
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

    static async Asesores(nombre){
        try{

            if(!nombre){
                return false;
            }

            let db = new DB();
            let script = "SELECT * FROM Asesores WHERE nombre COLLATE utf8_general_ci LIKE CONCAT('%', ? , '%');";
            const params = [nombre];
            const respuesta = await db.pool.query(script,params);

            if(respuesta[0].length > 0){
                return respuesta[0];
            }else{
                return false;
            }

        }catch(e){
            return false
        }
        
    }

    static async registrarTesis(data,boleta){
        
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
                return false;
            }
        }catch(e){
            throw e;
        }
        
    }

    verificacion(password){
        if(password== this.#password){
            return true;
        }else{
            return false;
        }
    }

    informacionTesis(boleta){
        
    }
}

module.exports = persona