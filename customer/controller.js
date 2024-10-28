import pool from '../db.js';
import * as query from './queries.js';

export const getAllCustomer = (req, res) => {
    pool.query(query.getAllCustomers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

export const getDataByCustomerId = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(query.getDataByCustomer, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

export const addUpdateCustomerReport = (req, res) => {
    pool.query(query.addUpdateCustomerData(req.body), (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

export const getAllCustomerReportData = (req, res) => {
    pool.query(query.getAllCustomerData, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};
