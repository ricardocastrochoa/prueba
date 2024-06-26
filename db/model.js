import {connPool} from "../db/connect.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function executeQuery (pool, query) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [results, ] = await connection.execute(query);
        console.log(results);
    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        await sleep(2000);
        if (connection) connection.release();
    }
}

const queries = [
    `CREATE TABLE IF NOT EXISTS document_type (
        documentTypeId INT(11) AUTO_INCREMENT PRIMARY KEY, 
        documentTypeName VARCHAR(20) NOT NULL UNIQUE
    );`,
    `CREATE TABLE IF NOT EXISTS person_status (
        statusId INT(11) AUTO_INCREMENT PRIMARY KEY, 
        status VARCHAR(50) NOT NULL, 
        description VARCHAR(50) NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS person (
        personId INT(11) AUTO_INCREMENT PRIMARY KEY,
        personName VARCHAR(20) NOT NULL,
        personLast_name VARCHAR(20) NOT NULL,
        personNumber VARCHAR(10) NOT NULL,
        documentTypeFk INT(11) NOT NULL,
        statusId INT(11) NOT NULL,
        FOREIGN KEY (documentTypeFk) REFERENCES document_type(documentTypeId),
        FOREIGN KEY (statusId) REFERENCES person_status(statusId)
    );`
];
(async () => {
for  (let query of queries) {
   await executeQuery(connPool, query);
}
})();

