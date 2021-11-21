import mysql from 'mysql';
import {promisify} from 'util';
import config from "./config";

const {database} = config;

const {NODE_ENV} = process.env;
const pool = NODE_ENV=== 'test' ? mysql.createPool(testingDatabase) : mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {//Cuando se pierde la conexion con la base de datos
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR') {//Cuando se excede el numero de conexiones
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED') {//Cuando se rechaza la conexion
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(connection) connection.release();
    console.log('DB is Connected');
    return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);//Convierte la funcion query de mysql a una promesa

module.exports = pool;