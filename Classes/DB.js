const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../acces.env') });
const mysql = require('mysql2/promise');

class DB {
    static pool = null;

    constructor(){
        this.pool = DB.pool;
    }

    static async CrearConexion() {
        try {
            DB.pool = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT,
                waitForConnections: true,
                connectionLimit: 20,
                queueLimit: 0
            });
    
            // Probamos la conexión
            const conexion = await DB.pool.getConnection();
            await conexion.ping();
            conexion.release();
    
            console.log("Conexión exitosa con la base de datos");
            return DB.pool;
    
        } catch (e) {
            console.error("Error de conexión con la base de datos:", e);
            return false;
        }
    }
    

}

module.exports = DB;
