import { Sequelize, DataTypes, Model } from "sequelize";
import dbConnect from "../connect";

const user = process.env.PG_USER;
const password = process.env.PG_PASSWORD;
const database = process.env.PG_DATABASE;
const host = process.env.PG_HOST;
const sequelize = new Sequelize(`postgres://${user}:${password}@${host}:5432/${database}`)

class Task extends Model {
    declare id: String;
    declare title: string;
    declare completed: boolean;
}

export const Tasks = sequelize.define<Task>( 'Tasks',
    {
        id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)