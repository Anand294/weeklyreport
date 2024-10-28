import pool from '../db.js';
import * as query from './queries.js';

export const getAllMisc = (req, res) => {
    pool.query(query.getAllMisc, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

export const getDataByMiscId = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(query.getDataByMisc, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

export const addUpdateMiscReport = (req, res) => {
    const miscData = req.body;
    console.log(miscData.input_value);

    // If misc_id is 0, add new item, then update misc data
    if (miscData.misc_id === 0) {
        pool.query(query.addNewMisItem, [miscData.input_value], (error, results) => {
            if (error) {
                console.error('Error while adding new misc item:', error);
                return res.status(500).json({ error: 'Failed to add new misc item' });
            }

            // Assuming the new misc_id is returned from the query result
            miscData.misc_id = results.rows[0].misc_id;

            // Always execute the add/update misc data query after misc_id is set
            pool.query(query.addUpdateMiscData(miscData), (error, results) => {
                if (error) {
                    console.error('Error while updating misc data:', error);
                    return res.status(500).json({ error: 'Failed to update misc data' });
                }
                res.status(200).json(results.rows);
            });
        });
    } else {
        // If misc_id is not 0, directly update misc data
        pool.query(query.addUpdateMiscData(miscData), (error, results) => {
            if (error) {
                console.error('Error while updating misc data:', error);
                return res.status(500).json({ error: 'Failed to update misc data' });
            }
            res.status(200).json(results.rows);
        });
    }
};

 export const getAllMiscReportData = (req, res) => {
    pool.query(query.getAllMiscData, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};
