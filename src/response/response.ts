import { Response } from "express";

export const sendSuccess = ( res: Response, docs: any, message?: string) => {
    res.status(200).send({
        data:  {
            status: 'success',
            docs: docs,
            message: message
        }
    })
}

export const sendInternalError = ( res: Response, error: Error) => {
    res.status(500).send({
        data: {
            status: 'error',
            message: error.message
        }
    })
}

export const sendBadRequest = ( res: Response, message: string) => {
    res.status(400).send({
        data: {
            status: 'Bad request',
            message: message
        }
    })
}

export const sendNotFound = ( res: Response, message: string) => {
    res.status(404).send({
        data: {
            status: 'Not found',
            message: message
        }
    })
}