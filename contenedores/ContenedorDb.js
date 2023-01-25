import {options} from "../options/mysqlDB.js";
import knex from "knex";

const knexConnection = knex(options);

class Contenedor {
    constructor(nombreTabla) {
        this.nombreTabla = nombreTabla
    }

    mostrarProductos = async () => {
        try {
            const result = await knexConnection(this.nombreTabla).select('*')
            return result
        } catch (error) {
            console.log(error)
        } finally {
            // knexConnection.destroy()
        }
    }

    agregarProducto = async (productos) => {
        try {
            await knexConnection('cars').insert(productos)
            .then(() => console.log('datos cargados'))
            .catch((err) => {console.log(err); throw err})
            .finally(() => {
                console.log('operacion finalizada')
            })
        } catch (error) {
            console.log(error)
        } finally {
            
        }
    }
}

export default Contenedor