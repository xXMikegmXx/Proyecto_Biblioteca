
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../acces.env') });
const mysql = require('mysql2/promise');

class DB {
    static pool;

    constructor(){
        if (!pool){
            pool=CrearConexion();
        }
    }

    static async CrearConexion() {
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            waitForConnections: true,
            connectionLimit: 20,
            queueLimit: 0
        });

        let conexion;

        try {
            conexion = await pool.getConnection();
            await conexion.ping();
            console.log("Conexión exitosa con la base de datos");
            return pool;
        } catch (e) {
            console.error("Error de conexión con la base de datos:", e);
            return false;
        } finally {
            if (conexion) conexion.release(); 
        }
    }
}

module.exports = DB;