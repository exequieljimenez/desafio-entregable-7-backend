import { options } from "../options/sqliteDB.js";
import knex from "knex";

const knexConnection = knex(options);

class ContenedorDB {
    constructor(nombreTabla) {
        this.nombreTabla = nombreTabla
    }

    crearTabla = async () => {
        try {
            await knexConnection.schema.dropTableIfExists(this.nombreTabla)
            await knexConnection.schema.createTable(this.nombreTabla, table => {
                table.string('email').notNullable();
                table.string('mensaje').notNullable();
            })
        } catch (error) {
            console.log(error)
        }
    }

    listarAll = async () => {
        try {
            const result = await knexConnection(this.nombreTabla).select('*')
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
        } finally {

        }
    }

    guardar = async (data) => {
        try {
            await knexConnection(this.nombreTabla).insert(data)
            .then(() => console.log('datos cargados'))
            .catch((err) => {console.log(err); throw err})
            .finally(() => {
                console.log('operacion finalizada')
            })
        } catch (error) {

        }
    }
}

export default ContenedorDB