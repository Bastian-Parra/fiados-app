import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config() // cargar variables de entorno

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
    }
)

const connectDB = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        console.log('Conexión a la base de datos correcta')
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error)
    }
}

export { sequelize, connectDB }