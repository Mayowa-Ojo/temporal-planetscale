import { createConnection } from "mysql2";
import * as dotenv from "dotenv";

dotenv.config();
const connection = createConnection(process.env.DATABASE_URL!);

export default connection;
