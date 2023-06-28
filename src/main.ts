import express from 'express'
import { servicePort } from './variable/env';
import {router} from './controller/router'
import bodyParser from 'body-parser'


const app = express()
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());
app.use('/', router);


app.listen(servicePort, () => {
    console.log(`Server is running from port: ${servicePort}`);
});