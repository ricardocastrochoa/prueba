import { createPool } from "mysql2/promise";

export const connPool = createPool({
    host: '127.0.0.1',
    user:'root',
    password:'',
    database:'prueba',
    port:'3306'
});