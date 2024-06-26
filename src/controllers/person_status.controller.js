import { connPool } from "../../db/connect.js";

export const showPerson_status = async (req, res) => {
    const result = await connPool.query("SELECT * FROM person_status");
    res.json(result[0]);
};
export const showPerson_statusId = async (req, res) => {
    const result = await connPool.query("SELECT * FROM person_status WHERE person_statusId=?", [req.params.id]);
    if (result.length <= 0) return res.status(404).json ({
        message: 'data not fund'
    });
    res.json(result[0]);
};

export const createPerson_status = async (req, res) => {
    try {
    const { stausId, status,description } = req.body;
    console.log(req.body);
    let sqlQuery = "INSERT INTO person_status (stausId, status, description) VALUES (?, ?, ?)";
    const [result] = await connPool.query(sqlQuery, [stausId, status, description]);
    res.send({
        statusId: result.insertId,
        status: status,
        description: description

    });
} catch (error) {
    return res.status(500).json({
        message: 'Something went wrog in the consultation'
    });
  }
};

export const updatePerson_status = async (req, res) => {
    const { statusId, newStatus } = req.body;
    let sqlQuery = "UPDATE person_status SET status = ? WHERE statusId = ?";
    const [result] = await connPool.query(sqlQuery, [newStatus, statusId]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'data not found'});
    const [row] = await connPool.query("SELECT * FROM  person_status WHERE person_statusId", [req.params.id]);
    res.json(
        row[0]
    );
};


export const deletePerson_status = async (req, res) => {
    try {
        const [result] = await connPool.query("DELETE FROM person_status WHERE statusId = ?", [req.params.id]);
        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json({ message: 'Person_status deleted successfully' });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong in the deletion process',
            error: error.message
        });
    }
};
