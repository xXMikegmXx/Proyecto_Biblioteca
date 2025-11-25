const DB = require('./DB');
const validar = require('./Validacion');
const genericas = require('./FuncionesGenericas');
const fs = require("fs");
const path = require("path");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

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

    async registrarTesis(data){
        try{

            if(this.guardarPDF(data.pdf64)){
                let db = new DB();
                let script = "INSERT INTO Tesis(Descripcion,Tema,Nombre,URL_PDF,ID_Tesis) VALUE(?,null,?,null,?)";
            }else{
                return false;
            }
            
        }catch(e){
            return false;
        }
        
    }

    async guardarPDF(pdf64){
        
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

    static async CrearFormatos(boleta) {
        try {
            const database = new DB();
    
            const [rows] = await database.pool.query(
                "SELECT * FROM alumno WHERE Boleta = ?",
                [boleta]
            );
    
            if (rows.length === 0) throw new Error("Alumno no encontrado");
    
            const alumno = rows[0];
    
            const pdfPath = path.join(__dirname, "../formatos/Formato de no adeudo.pdf");
            const pdfBytes = fs.readFileSync(pdfPath);
            const pdfDoc = await PDFDocument.load(pdfBytes);
    
            const page = pdfDoc.getPage(0);
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
            page.drawText(` ${alumno.Nombre}`, { x: 180, y: 498, size: 12, font});
            page.drawText(` ${alumno.Boleta}`, { x: 180, y: 408, size: 12, font});
            page.drawText(` ${alumno.Carrera}`, { x: 400, y: 408, size: 12, font});
    
            const outputPath = path.join(__dirname, `../formatos/formato_${boleta}.pdf`);
            const pdfFinal = await pdfDoc.save();
            fs.writeFileSync(outputPath, pdfFinal);
    
            console.log(`✅ Formato generado: ${outputPath}`);
            return { success: true, path: outputPath };
    
        } catch (error) {
            console.error("❌ Error al crear el formato:", error);
            return { success: false, error: error.message };
        }
    }
}
module.exports = persona;