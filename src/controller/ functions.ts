import { RuleResult } from 'json-rules-engine';
import { sendBadRequest, sendInternalError} from './../response/response';
import { Response } from "express"
import fs from 'fs'


export const readRule = (res: Response, ruleName: string) => {
    if (!ruleName) sendBadRequest(res, 'RuleName is required')

   return  fs.readFileSync(`src/rules/${ruleName}.json`, 'utf8')
}

export const responseBuilder = ( status: string, ruleResult: RuleResult) => {
    return {
        status: status,
        type: ruleResult.event?.type,
        params: ruleResult.event?.params
    }
}


export const olderThan = (factValue: string, jsonValue: number) => {
    if (!factValue.length) return false
    
    var dateParts = factValue.split("/");
    var firstDay = new Date(dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0]); 

    const today = new Date()
    const diff_in_time = today.getTime() - firstDay.getTime()
    const diff_in_day = diff_in_time / (1000 * 3600 * 24)

    return diff_in_day > jsonValue
}

