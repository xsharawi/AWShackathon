import { DataSource } from "typeorm";
import { Data } from "./entities/Data.js";

let db = new DataSource({
    type:"mysql",
    host: "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_DBUSER || "xsharawi",
    password: process.env.DB_DBPASS || "",
    database: process.env.DB_DBNAME || "hackathon",
    entities: [Data],
    synchronize: true,
    logger:"file"
})

let init = () => db.initialize().then(()=>{console.log("db connected")}).catch(err=>console.error(err))

export default {db,init}