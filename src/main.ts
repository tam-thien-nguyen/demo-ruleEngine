import express from 'express'
import { servicePort } from './variable/env';
import {router} from './controller/router'

const app = express()

app.use('/', router);


app.listen(servicePort, () => {
    console.log(`Server is running from port: ${servicePort}`);
});