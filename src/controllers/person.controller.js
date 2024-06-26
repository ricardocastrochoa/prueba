import { connPool } from "../../db/connect.js";

export const showPerson = async (req, res) => {
    try {
        const [result] = await connPool.query("SELECT * FROM person");
        res.json(result);
    } catch (error) {
        console.error('Error fetching people:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const showPersonId = async (req, res) => {
    try {
        const [result] = await connPool.query("SELECT * FROM person WHERE personId=?", [req.params.id]);
        if (result.length <= 0) return res.status(404).json({ message: 'Data not found' });
        res.json(result[0]);
    } catch (error) {
        console.error('Error fetching person by ID:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const createPerson = async (req, res) => {
    try {
        const { name, lastName, number, documentType, statusId } = req.body;
        let sqlQuery = "INSERT INTO person (personName, personLast_name, personNumber, documentTypeFk, statusId) VALUES (?, ?, ?, ?, ?)";
        const [result] = await connPool.query(sqlQuery, [name, lastName, number, documentType, statusId]);
        res.send({
            id: result.insertId,
            name: name,
            lastName: lastName,
            number: number,
            documentType: documentType,
            statusId: statusId
        });
    } catch (error) {
        console.error('Error creating person:', error);
        res.status(500).json({ message: 'Something went wrong in the consultation' });
    }
};

export const updatePerson = async (req, res) => {
    try {
        const { personName, personLast_name, personNumber, documentTypeFk, statusId } = req.body;
        let sqlQuery = "UPDATE person SET personName = IFNULL(?, personName), personLast_name = IFNULL(?, personLast_name), personNumber = IFNULL(?, personNumber), documentTypeFk = IFNULL(?, documentTypeFk), statusId = IFNULL(?, statusId) WHERE personId = ?";
        const [result] = await connPool.query(sqlQuery, [personName, personLast_name, personNumber, documentTypeFk, statusId, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Data not found' });
        
        const [row] = await connPool.query("SELECT * FROM person WHERE personId = ?", [req.params.id]);
        res.json(row[0]);
    } catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ message: 'Something went wrong in the update process', error: error.message });
    }
};

export const deletePerson = async (req, res) => {
    try {
        const [result] = await connPool.query("DELETE FROM person WHERE personId=?", [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Data not found' });
        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (error) {
        console.error('Error deleting person:', error);
        res.status(500).json({ message: 'Something went wrong in the deletion process', error: error.message });
    }
};
