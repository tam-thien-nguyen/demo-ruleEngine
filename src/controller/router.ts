import { sendInternalError, sendSuccess } from '../response/response';
import express from "express";

export const router = express.Router()

router.get('/rule/payment', async function (req, res) {
    try{
        sendSuccess(res, 'Chay roi');
    }catch (error){
        console.log('Internal Server Error ', error)
        sendInternalError(res, new Error('Can not execute the payment s rule'))
    }
})