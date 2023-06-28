import express from "express";
import { Engine } from 'json-rules-engine';
import { sendInternalError, sendSuccess } from '../response/response';
import { responseBuilder, olderThan, readRule } from './ functions';


export const router = express.Router()

router.post('/rule/payment', async function (req, res) {
    try{
        let result: any[] = []
        const ruleString = readRule(res, req.query.ruleName?.toString() ?? '' )
        const rule = JSON.parse(ruleString)

        const engine = new Engine()

        // add customer operator
        engine.addOperator('olderThan', olderThan)
        
        
        rule.decisions.forEach((rule: any) => {
            engine.addRule(rule)
        });

        // Register event handlers for success and failure events
        engine.on('success', (event, almanac, ruleResult) => {
            console.log('success event: ', event);     
            result.push(responseBuilder('success', ruleResult))
        });
        
        engine.on('failure', (event, almanac, ruleResult) => {
            console.log('failure event: ', event);
            result.push(responseBuilder('failure', ruleResult))
        });

       const input = req.body
       await engine.run(input)

       sendSuccess(res, result);
 
    }catch (error){
        console.log('Internal Server Error ', error)
        sendInternalError(res, new Error('Can not execute the payment s rule'))
    }
})