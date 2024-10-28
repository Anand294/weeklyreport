import pool from '../db.js';
import * as query from './queries.js';

export const getAllFunctions = (req, res) => {
    console.log("Api");
    pool.query(query.getAllFunctions, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        console.log(results.rows);
    });
};

export const getDataByFunctionId = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(query.getDataByFunction, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

export const addUpdateFunctionReport = (req, res) => {
    pool.query(query.addUpdateFunctionData(req.body), (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

export const getAllFunctionReportData = (req, res) => {
    pool.query(query.getAllFunctionData, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};


